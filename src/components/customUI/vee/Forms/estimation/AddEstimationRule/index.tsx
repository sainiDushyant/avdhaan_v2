import useBaseForm from "@/hooks/vee/useBaseForm";
import { cn } from "@/lib/utils";
import { FC, useCallback, useState } from "react";
import BaseForm from "../../BaseForm";
import SubmitButton from "@/components/customUI/Button/SubmitButton";
import { MeterTypeOption, LoadTypeOption, LOAD_TYPE, METER_TYPE, ESTIMATION_PROFILE } from "@/lib/vee";
import MTLTForm from "../../MTLTForm";
import { EstimationRuleMutation, EstimationRuleRecord } from "@/store/vee/types/records/estimation-rules";
import useEstimationRuleCondition from "@/hooks/vee/useEstimationRuleCondition";
import EstimationRuleConditionForm from "./EstimationRuleConditionForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAddEstimationRuleMutation, useUpdateEstimationRuleDetailsMutation } from "@/store/vee/veeApi";
import { CustomAPIError } from "@/store/vee/types";

export interface AddEstimationRuleFormProps {
    estimationRule?: EstimationRuleRecord;
    formCss?: string;
    onSubmitCb?: () => void;
}

const AddEstimationRuleForm: FC<AddEstimationRuleFormProps> = ({ estimationRule, formCss, onSubmitCb }) => {

    const navigate = useNavigate();
    const { toast } = useToast();

    const [ addEstimationRule, { isLoading } ] = useAddEstimationRuleMutation();
    const [ updateEstimationRuleDetails, { isLoading: updateLoading } ] = useUpdateEstimationRuleDetailsMutation();

    const selectedMeterType = METER_TYPE.filter(item => item.value === estimationRule?.meter_type);
    const selectedLoadType = LOAD_TYPE.filter(item => item.value === estimationRule?.load_type);

    const { baseState, setBaseState } = useBaseForm({
        name: estimationRule?.name, description: estimationRule?.description
    });

    const [meterType, setMeterType] = useState<MeterTypeOption | null>(
        selectedMeterType.length > 0 ? selectedMeterType[0] : null
    );

    const [loadType, setLoadType] = useState<LoadTypeOption | null>(
        selectedLoadType.length > 0 ? selectedLoadType[0] : null
    );

    const {
        conditionData,
        conditionLoading,
        conditionFetching,
        ruleCondition,
        setRuleCondition,
    } = useEstimationRuleCondition({ meterType, loadType, estimationRule });

    const handleChangeMeterType = useCallback((selected: MeterTypeOption | null) => {
        setMeterType(selected);
    }, []);

    const handleChangeLoadType = useCallback((selected: LoadTypeOption | null) => {
        setLoadType(selected);
    }, []);

    const handleAddEstimationRule = useCallback( async(apiPayload: EstimationRuleMutation) => {
        try {
            await addEstimationRule(apiPayload);
            toast({
              variant: "default",
              description: "Estimation Rule added successfully",
            })
            if (onSubmitCb) return onSubmitCb();
            navigate(`/estimation-rules/`);
          } catch (error) {
            const errorMsg = error as CustomAPIError;
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: errorMsg?.description || "Failed to add estimation rule",
            })
        }
    }, [ addEstimationRule, toast, onSubmitCb, navigate ]);

    const handleEditEstimationRule = useCallback(async(ruleId: string, apiPayload: EstimationRuleMutation) => {
        try {
            await updateEstimationRuleDetails({ ruleId, data: apiPayload });
            toast({ variant: "default", description: "Estimation Rule updated successfully" });
            if (onSubmitCb) return onSubmitCb();
            navigate(`/estimation-rules/`);
        } catch (error) {
            const errorMsg = error as CustomAPIError;
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMsg?.description || "Failed to update estimation rule",
            })
        }
    }, [ updateEstimationRuleDetails, toast, onSubmitCb, navigate  ])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!meterType || !loadType || !ruleCondition.method || 
            !ruleCondition.selectionType || !Number(ruleCondition.pdpCount)) return;
        const apiPayload: EstimationRuleMutation = {
            ...baseState,
            "meter_type": meterType.value,
            "load_type": loadType.value,
            "method": ruleCondition.method.value,
            "selection_type": ruleCondition.selectionType.value,
            "previous_data_points_count": Number(ruleCondition.pdpCount)
        }
        if(!estimationRule){ 
            return handleAddEstimationRule(apiPayload);
        }
        handleEditEstimationRule(estimationRule.id, apiPayload);
    }, [ 
        estimationRule, baseState, ruleCondition, 
        meterType, loadType,
        handleAddEstimationRule, handleEditEstimationRule 
    ]);

    return (
        <form className={cn("flex flex-col gap-4", formCss)} onSubmit={handleSubmit}>
            <BaseForm
                name="estimation-rule"
                baseState={baseState}
                setBaseState={setBaseState}
            />
            <MTLTForm
                meterType={meterType}
                loadType={loadType}
                customProfile={ESTIMATION_PROFILE}
                handleChangeMeterType={handleChangeMeterType}
                handleChangeLoadType={handleChangeLoadType}
            />
            <EstimationRuleConditionForm 
                ruleCondition={ruleCondition} 
                loading={conditionLoading || conditionFetching} 
                conditionData={conditionData}
                formCss={formCss}
                setRuleCondition={setRuleCondition} 
            />
            <SubmitButton
                title={estimationRule ? "Update Detail" : "Save Detail"}
                disabled={isLoading || updateLoading}
            />
        </form>
    )
}

export default AddEstimationRuleForm