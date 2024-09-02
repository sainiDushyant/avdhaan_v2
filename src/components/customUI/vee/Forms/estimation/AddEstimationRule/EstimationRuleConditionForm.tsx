import { ChangeEvent, FC, useCallback } from "react";
import { EstimationParams, EstimationState } from "@/store/vee/types/records/estimation-rules";
import { Option } from "@/store/vee/types/other";
import SingleOptionSelect from "@/components/customUI/Select/SingleOptionSelect";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EsimtatiomRuleConditionFormProps {
    conditionData?: EstimationParams;
    ruleCondition: EstimationState;
    loading: boolean;
    formCss?: string;
    setRuleCondition: React.Dispatch<React.SetStateAction<EstimationState>>;
}

const EstimationRuleConditionForm: FC<EsimtatiomRuleConditionFormProps> = ({
    conditionData,
    ruleCondition,
    loading,
    formCss,
    setRuleCondition
}) => {

    const handleChangeMethod = useCallback((selected: Option | null) => {
        setRuleCondition((prevData) => ({ ...prevData, "method": selected }));
    }, [setRuleCondition]);

    const handleChangeSelectionType = useCallback((selected: Option | null) => {
        setRuleCondition((prevData) => ({ ...prevData, "selectionType": selected }));
    }, [setRuleCondition]);

    const handleChangePdpCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRuleCondition((prevData) => ({ ...prevData, "pdpCount": e.target.value }));
    }, [setRuleCondition]);

    if (!conditionData) return null;

    return (
        <div className={cn('flex gap-5 flex-wrap', formCss)}>
            <SingleOptionSelect
                handleChange={handleChangeMethod}
                value={ruleCondition.method}
                loading={loading}
                placeholder={"Method"}
                data={conditionData.methods}
                name="method"
                required
            />
            <SingleOptionSelect
                handleChange={handleChangeSelectionType}
                value={ruleCondition.selectionType}
                loading={loading}
                placeholder={"Selection Type"}
                data={conditionData.selection_type}
                name="selection-type"
                required
            />
            <Input
                type="number"
                value={ruleCondition.pdpCount}
                onChange={handleChangePdpCount}
                name={"pdp-count"}
                placeholder="Enter previous data point count"
                min={conditionData.previousDataPointCount.min_value}
                max={conditionData.previousDataPointCount.max_value}
                required
                className="min-w-[200px]"
            />

            {conditionData.params && conditionData.params.length > 0 &&
                    <div>
                    <label htmlFor="parameters">Parameters</label>
                    <div className='flex flex-row flex-wrap gap-3'>
                        {conditionData.params.map((param, index) => (
                            <Input
                                key={`${param}_${index}`}
                                name={index === 0 ? "parameters" : `param_${index}`}
                                defaultValue={param}
                                disabled
                                style={{ opacity: "0.8", cursor: "text" }}
                                className="md:min-w-[170px] flex-1"
                            />
                        ))}
                    </div>
                    </div>
                }
        </div>
    )
}

export default EstimationRuleConditionForm