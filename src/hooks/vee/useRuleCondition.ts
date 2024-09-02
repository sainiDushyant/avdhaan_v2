import { useEffect, useState, } from "react";
import { ConditionType, ConditionTypeState } from "@/store/vee/types/records/rule";
import { 
    useGetAllRulesTypesQuery, 
    useGetRulesTypeConditionsQuery
} from "@/store/vee/veeApi";
import { useToast } from "@/components/ui/use-toast";
import { CustomAPIError } from "@/store/vee/types";

const useRuleCondition = ({ condition }: { condition?: ConditionType; }) => {

    const { toast } = useToast();

    const { 
        data: typeData, isLoading: typesLoading, isFetching: typeFetching,
        isError: hasTypeError, error: typeError,
    } = useGetAllRulesTypesQuery();

    const [ruleCondition, setRuleCondition] = useState<ConditionTypeState>({
        field_name: condition?.field_name ? { label: condition.field_name.split("_").join(" "),  value: condition.field_name } : null,
        condition_type: condition?.condition_type ? {label: condition.condition_type, value: condition.condition_type } : null,
        first_value: condition?.first_value ? condition.first_value : "",
        second_value: condition?.second_value ? condition.second_value : "",
        type: condition?.type ? { label: condition.type,  value: condition.type } : null,
        other_params: condition?.other_params ? condition.other_params.map(item => ({ label: item.split("_").join(" "), value: item })) : [],
        method: condition?.method ? { label: condition.method,  value: condition.method } : null,
        pdp_count: condition?.pdp_count ? condition.pdp_count : "",
        max_spike_percentage: condition?.max_spike_percentage ? condition.max_spike_percentage : "",
    })

    const { 
        data: conditionData, isLoading: conditionLoading, isFetching: conditionFetching,
        isError: hasConditionError, error: conditionError,
    } = useGetRulesTypeConditionsQuery(
        { rule_type: ruleCondition.type?.value as string}, { skip: !ruleCondition.type }
    )

    useEffect(() => {
        if(hasTypeError){
            const errorMsg = typeError as CustomAPIError;
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMsg?.description || "Failed to fetch rule types",
            })
        }
    }, [ hasTypeError, typeError, toast ]);

    useEffect(() => {
        if(hasConditionError){
            const errorMsg = conditionError as CustomAPIError;
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMsg?.description || "Failed to fetch rule conditions for the selected type",
            })
        }
    }, [ hasConditionError, conditionError, toast ]);

    return {
        typeData, typesLoading, typeFetching,
        conditionData, conditionLoading, conditionFetching,
        ruleCondition, setRuleCondition,
    }
}

export default useRuleCondition