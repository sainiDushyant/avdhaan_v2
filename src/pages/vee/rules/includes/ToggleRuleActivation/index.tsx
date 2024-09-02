import { FC, useCallback, useState } from "react";
import { RuleActivation, RuleRecord } from "@/store/vee/types/records/rule";
import { useUpdateRuleActivationMutation } from "@/store/vee/veeApi";
import { useToast } from "@/components/ui/use-toast";
import { CustomAPIError } from "@/store/vee/types";

interface ToggleRuleActivationProps {
    data: RuleRecord;
    cb?: () => void
}

const ToggleRuleActivation: FC<ToggleRuleActivationProps> = ({ data, cb }) => {

    const { toast } = useToast();

    const ruleId = data.id;
    const [isActive, setIsActive] = useState(data.is_active);

    const [toggleRuleActivation, { isLoading }] = useUpdateRuleActivationMutation();

    const handleToggleRuleActivation = useCallback(async (apiPayload: RuleActivation) => {
        try {
            await toggleRuleActivation(apiPayload);
            toast({
                variant: "default",
                description: `Rule ${!apiPayload.isActive ? "de-" : ""} activated successfully`,
            })
            if (cb) cb();
        } catch (error) {
            setIsActive(!isActive);
            const errorMsg = error as CustomAPIError;
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMsg?.description || "Failed to change rule activation",
            })
        }
    }, [toggleRuleActivation, toast, cb])

    const handleToggle = useCallback((val: boolean) => {
        if (isLoading) return;
        setIsActive(val);
        handleToggleRuleActivation({ ruleId, isActive: val });
    }, [handleToggleRuleActivation, ruleId, isLoading])

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

export default ToggleRuleActivation;