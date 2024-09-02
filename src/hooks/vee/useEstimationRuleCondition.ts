import { useEffect, useState } from "react";
import { useGetAllEstimationRuleConditionsQuery } from "@/store/vee/veeApi";
import {
    MeterTypeOption,
    LoadTypeOption,
    LOAD_TYPES,
    METER_TYPES,
} from "@/lib/vee";
import { EstimationRuleRecord, EstimationState } from "@/store/vee/types/records/estimation-rules";
import { useToast } from "@/components/ui/use-toast";
import { CustomAPIError } from "@/store/vee/types";

interface useEstimationRuleConditionProps {
    meterType: MeterTypeOption | null;
    loadType: LoadTypeOption | null;
    estimationRule?: EstimationRuleRecord;
}

const useEstimationRuleCondition = ({
    meterType,
    loadType,
    estimationRule,
}: useEstimationRuleConditionProps) => {

    const { toast } = useToast();
    
    const {
        data: conditionData,
        isLoading: conditionLoading,
        isFetching: conditionFetching,
        isError, error
    } = useGetAllEstimationRuleConditionsQuery(
        {
            meter_type: meterType?.value as METER_TYPES,
            load_type: loadType?.value as LOAD_TYPES,
        },
        { skip: !(meterType?.value && loadType?.value) }
    );

    const defaultMethod = estimationRule ? {
            label: estimationRule.method,
            value: estimationRule.method,
        }
        : null;

    const defaultSelectionType = estimationRule
        ? {
            label: estimationRule.selection_type.split("_").join(" "),
            value: estimationRule.selection_type,
        }
        : null;

    const defaultPdpCount = estimationRule?.previous_data_points_count || "";

    const [ruleCondition, setRuleCondition] = useState<EstimationState>({
        method: defaultMethod,
        selectionType: defaultSelectionType,
        pdpCount: defaultPdpCount,
    });

    useEffect(() => {
        if(isError){
            const errorMsg = error as CustomAPIError;
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMsg?.description || "Failed to fetch estimation rule parameters",
            })
        }
    }, [ isError, error, toast ])

    return {
        conditionData,
        conditionLoading,
        conditionFetching,
        ruleCondition,
        setRuleCondition,
    };
};

export default useEstimationRuleCondition;
