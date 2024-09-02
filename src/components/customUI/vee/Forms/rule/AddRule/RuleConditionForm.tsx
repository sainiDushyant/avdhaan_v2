import { ChangeEvent, FC, useCallback } from 'react';
import MultiOptionSelect from '@/components/customUI/Select/MultiOptionSelect'
import SingleOptionSelect from '@/components/customUI/Select/SingleOptionSelect'
import { Input } from "@/components/ui/input"
import { Option } from "@/store/vee/types/other"
import { ConditionTypeState, RuleConditions } from '@/store/vee/types/records/rule';
import { MultiValue } from 'react-select';
import { cn } from '@/lib/utils';

interface RuleConditionFormProps {
    conditionData?: RuleConditions;
    ruleCondition: ConditionTypeState;
    loading: boolean;
    setRuleCondition: React.Dispatch<React.SetStateAction<ConditionTypeState>>
    formCss?: string;
}

const RuleConditionForm: FC<RuleConditionFormProps> = ({
    conditionData, ruleCondition, loading,
    setRuleCondition, formCss
}) => {

    const handleChangeFieldName = useCallback((selected: Option | null) => {
        setRuleCondition(prevData => ({ ...prevData, field_name: selected }));
    }, [setRuleCondition]);

    const handleChangeConditionType = useCallback((selected: Option | null) => {
        setRuleCondition(prevData => ({ ...prevData, condition_type: selected }));
    }, [setRuleCondition]);

    const handleChangeFirstValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRuleCondition(prevData => ({ ...prevData, first_value: e.target.value }));
    }, [setRuleCondition]);

    const handleChangeSecondValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRuleCondition(prevData => ({ ...prevData, second_value: e.target.value }));
    }, [setRuleCondition]);

    const handleChangePdpCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRuleCondition(prevData => ({ ...prevData, pdp_count: e.target.value }));
    }, [setRuleCondition]);

    const handleChangeMaxSpikePercentage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRuleCondition(prevData => ({ ...prevData, max_spike_percentage: e.target.value }));
    }, [setRuleCondition]);

    const handleChangeMethod = useCallback((selected: Option | null) => {
        setRuleCondition(prevData => ({ ...prevData, method: selected }));
    }, [setRuleCondition]);

    const handleChangeOtherParams = useCallback((selected: MultiValue<Option>) => {
        setRuleCondition(prevData => ({ ...prevData, other_params: selected }));
    }, [setRuleCondition]);

    if (!conditionData) return null;

    return (
        <div className={cn('flex gap-5 flex-wrap', formCss)}>
            <SingleOptionSelect
                handleChange={handleChangeFieldName}
                value={ruleCondition.field_name}
                loading={loading}
                placeholder={"field name"}
                data={conditionData.fieldNames}
                required
                customCss='min-w-[200px]'
            />

            <SingleOptionSelect
                handleChange={handleChangeConditionType}
                value={ruleCondition.condition_type}
                loading={loading}
                placeholder={"rule conditions"}
                data={conditionData.conditionTypes}
                required
                customCss='min-w-[200px]'
            />

            {ruleCondition.type &&
                <>
                    {(ruleCondition.type.value === "Non_Cum_Comparison" || ruleCondition.type.value === "RANGE") &&
                        <Input
                            type="number"
                            value={ruleCondition.first_value}
                            onChange={handleChangeFirstValue}
                            name={"first_value"}
                            placeholder="Enter first value"
                            required
                            className="min-w-[200px]"

                        />
                    }

                    {
                        (ruleCondition.type.value === "RANGE") &&
                        <Input
                            type="number"
                            value={ruleCondition.second_value}
                            onChange={handleChangeSecondValue}
                            name={"second_value"}
                            placeholder="Enter Second value"
                            required
                            className="min-w-[200px]"
                        />
                    }

                    {
                        (ruleCondition.type.value === "Non_Cum_Aggregation") &&
                        <MultiOptionSelect
                            handleChange={handleChangeOtherParams}
                            value={ruleCondition.other_params}
                            loading={loading}
                            placeholder={"other params"}
                            data={conditionData.fieldNames}
                            customCss='min-w-[200px]'
                        />
                    }

                    {
                            (ruleCondition.type.value === "High_Avg_Check") &&
                            <>
                                <SingleOptionSelect
                                    handleChange={handleChangeMethod}
                                    value={ruleCondition.method}
                                    loading={loading}
                                    placeholder={"rule method"}
                                    data={conditionData.method || undefined}
                                    required
                                    customCss='min-w-[200px]'
                                />
                                <Input
                                    type="number"
                                    value={ruleCondition.pdp_count}
                                    onChange={handleChangePdpCount}
                                    name={"pdp_count"}
                                    placeholder="Enter previous data point count"
                                    required
                                    max={conditionData.pdp_count?.max_value}
                                    min={conditionData.pdp_count?.min_value}
                                    className="min-w-[200px]"
                                />
                                <Input
                                    type="number"
                                    value={ruleCondition.max_spike_percentage}
                                    onChange={handleChangeMaxSpikePercentage}
                                    name={"max_spike_percentage"}
                                    placeholder="Enter max spike percentage"
                                    required
                                    max={conditionData.max_spike_percentage?.max_value}
                                    min={conditionData.max_spike_percentage?.min_value}
                                    className="min-w-[200px]"
                                />
                            </>
                    }
                </>
            }
        </div>
    )
}

export default RuleConditionForm