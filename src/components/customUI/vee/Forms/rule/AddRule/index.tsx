import { FC, useCallback } from "react";
import SubmitButton from "@/components/customUI/Button/SubmitButton"
import BaseForm from "../../BaseForm"
import { AddRule, ConditionType, RuleDetails, RuleRecord } from "@/store/vee/types/records/rule";
import SingleOptionSelect from "@/components/customUI/Select/SingleOptionSelect";
import RuleConditionForm from "./RuleConditionForm";
import useBaseForm from "@/hooks/vee/useBaseForm";
import useRuleCondition from "@/hooks/vee/useRuleCondition";
import { CustomAPIError } from "@/store/vee/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAddRuleMutation, useUpdateRuleDetailsMutation } from "@/store/vee/veeApi";
import { cn } from "@/lib/utils";
import { Option } from "@/store/vee/types/other"
import { getNewAddRuleState } from "@/lib/vee";

export interface AddRuleFormProps {
    rule?: RuleRecord;
    formCss?: string;
    onSubmitCb?: () => void;
}

const AddRuleForm: FC<AddRuleFormProps> = ({ rule, formCss, onSubmitCb }) => {

    const ogCondition = rule?.condition;

    const navigate = useNavigate();
    const { toast } = useToast();

    const [ addRule, { isLoading } ] = useAddRuleMutation();
    const [ updateRuleDetails, { isLoading: updateLoading } ] = useUpdateRuleDetailsMutation();

    const { baseState, setBaseState } = useBaseForm({ 
        name: rule?.name, description: rule?.description 
    });

    const { 
        typeData, typesLoading, typeFetching,
        conditionData, conditionLoading, conditionFetching,
        ruleCondition, setRuleCondition,
    } = useRuleCondition({ condition: rule?.condition });

    const resetRule = useCallback((selectedType: Option | null) => {
        setRuleCondition(getNewAddRuleState({ selectedType, ogCondition }));
    }, [ ogCondition, setRuleCondition ])

    const handleChangeType = useCallback((selected: Option | null) => {
        resetRule(selected);
    }, [resetRule]);

    const handleAddRule = useCallback( async(apiPayload: AddRule) => {
        try {
            await addRule(apiPayload);
            toast({
              variant: "default",
              description: "Rule added successfully",
            })
            if (onSubmitCb) return onSubmitCb();
            navigate(`/rules/`);
          } catch (error) {
            const errorMsg = error as CustomAPIError;
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: errorMsg?.description || "Failed to add rule",
            })
        }
    }, [ addRule, toast, onSubmitCb, navigate  ]);

    const handleEditRule = useCallback(async(apiPayload: RuleDetails) => {
        try {
            await updateRuleDetails(apiPayload);
            toast({ variant: "default", description: "Rule updated successfully" });
            if (onSubmitCb) return onSubmitCb();
            navigate(`/rules/`);
        } catch (error) {
            const errorMsg = error as CustomAPIError;
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMsg?.description || "Failed to update rule",
            })
        }
    }, [ updateRuleDetails, toast, onSubmitCb, navigate ])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { 
            field_name, condition_type, type, 
            first_value, second_value, other_params,
            method, pdp_count, max_spike_percentage
        } = ruleCondition;
        if(!field_name || !condition_type || !type) return;
        const otherParams = other_params.length > 0 ? other_params.map(item => item.value) : null;
        const conditionPayload: ConditionType = {
            field_name: field_name.value,
            condition_type: condition_type.value,
            first_value: Number(first_value) ? Number(first_value) : null,
            second_value: Number(second_value) ? Number(second_value): null,
            type: type.value,
            other_params: otherParams,
            method: method?.value || null,
            pdp_count: Number(pdp_count) ? Number(pdp_count) : null,
            max_spike_percentage: Number(max_spike_percentage) ? Number(max_spike_percentage) : null,
        }
        if(!rule){ 
            return handleAddRule({ ...baseState, condition: conditionPayload });
        }
        handleEditRule({ ...baseState, id: rule.id, condition: conditionPayload });
    }, [ rule, baseState, ruleCondition, handleAddRule, handleEditRule ]);

    return (
        <form className={cn("flex flex-col gap-4", formCss)}
            onSubmit={handleSubmit}
        >
            <BaseForm
                name="rule"
                baseState={baseState} 
                setBaseState={setBaseState}
            />

            <SingleOptionSelect
                handleChange={handleChangeType}
                value={ruleCondition.type}
                loading={typesLoading || typeFetching}
                placeholder={"rule type"}
                data={typeData}
            />

            <RuleConditionForm
                conditionData={conditionData}
                ruleCondition={ruleCondition}
                loading={conditionFetching || conditionLoading}
                setRuleCondition={setRuleCondition}
                formCss={formCss}
            />
            <SubmitButton 
                title={rule ? "Update Detail" : "Save Detail" }
                disabled={
                    isLoading || updateLoading || 
                    conditionLoading || conditionFetching
                } 
            />
        </form>
    )
}

export default AddRuleForm;
