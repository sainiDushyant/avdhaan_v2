import { FC, useCallback, useMemo, useState } from "react";
import { RuleActivation } from "@/store/vee/types/records/rule";
import { useGetAllEstimationRulesTableQuery, useUpdateEstimationRuleActivationMutation } from "@/store/vee/veeApi";
import { useToast } from "@/components/ui/use-toast";
import { CustomAPIError } from "@/store/vee/types";
import { EstimationRuleRecord } from "@/store/vee/types/records/estimation-rules";
import { useLocation } from "react-router-dom";
import Spinner from "@/components/customUI/Loaders/Spinner";
import { LOAD_TYPE, METER_TYPE } from "@/lib/vee";

interface ToggleEstimationRuleActivationProps {
    data: EstimationRuleRecord;
    cb?: () => void
}

const ToggleEstimationRuleActivation: FC<ToggleEstimationRuleActivationProps> = ({ data, cb }) => {

    const { toast } = useToast();
    const { search } = useLocation();

    const meterType = METER_TYPE.find(item => item.value === data.meter_type);
    const loadType = LOAD_TYPE.find(item => item.value === data.load_type);

    const ruleId = data.id;
    const currentRuleMtlt = `${data.meter_type}-${data.load_type}` 
    const [isActive, setIsActive] = useState(data.is_default);

    const [toggleEstimationRuleActivation, 
        { isLoading: toggleLoading }
    ] = useUpdateEstimationRuleActivationMutation();

    const {
        data: response, isLoading,
      } = useGetAllEstimationRulesTableQuery({
        searchQuery: search
      });

      const ruleMTLTMap = useMemo(() => {
        const ruleMap = new Map<string, {id: string, isDefault: boolean}[]>();
        if(!response || !response.rules) return ruleMap;
        response.rules.forEach(rule => {
            const mtltKey = `${rule.meter_type}-${rule.load_type}`;
            let mtltValue = ruleMap.get(mtltKey);
            if(mtltValue){
                mtltValue.push({ id: rule.id, isDefault: rule.is_default })
            }else{
                mtltValue = [{ id: rule.id, isDefault: rule.is_default }];
            }
            ruleMap.set(mtltKey, mtltValue);
        })
        return ruleMap
      }, [ response ])

    const handleToggleRuleActivation = useCallback(async (apiPayload: RuleActivation) => {
        try {
            await toggleEstimationRuleActivation(apiPayload);
            toast({
                variant: "default",
                description: `Estimation Rule ${!apiPayload.isActive ? "de-" : ""} activated successfully`,
            })
            if (cb) cb();
        } catch (error) {
            setIsActive(!isActive);
            const errorMsg = error as CustomAPIError;
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMsg?.description || "Failed to change estimation rule activation",
            })
        }
    }, [toggleEstimationRuleActivation, toast, cb, isActive])

    const handleToggle = useCallback((val: boolean) => {
        if (toggleLoading) return;
        const ruleMtltValue = ruleMTLTMap.get(currentRuleMtlt);
        if(ruleMtltValue){
            const activeRule = ruleMtltValue.find(rule => rule.isDefault);
            //Active rule already present and active rule is not the current rule
            if(activeRule && activeRule.id !== ruleId){
                toast({
                    variant: "destructive",
                    title: "You cant set this estimation rule as default",
                    description: `For ${loadType?.label} ${meterType?.label}, 
                        estimation rule ${activeRule.id} is already default, 
                        Please Disable it as default first`,
                })
                return 
            }
        }
        setIsActive(val);
        handleToggleRuleActivation({ ruleId, isActive: val });
    }, [
        ruleId, ruleMTLTMap, currentRuleMtlt, toggleLoading,
        meterType, loadType,
        handleToggleRuleActivation, toast
    ]);

    if(!response || isLoading) return <Spinner />

    return (

        <div
            role='button'
            className={`switch ${isActive ? 'on' : 'off'}`}
            onClick={() => handleToggle(!isActive)}
        >
            <div className="switch-handle"></div>
        </div>

    )
}

export default ToggleEstimationRuleActivation;