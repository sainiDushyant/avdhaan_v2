import { FC, useState } from 'react'
import BaseModal from '@/components/customUI/Modals';
import { EstimationRuleRecord } from '@/store/vee/types/records/estimation-rules';
import { Input } from '@/components/ui/input';

interface EstimationRuleConditionProps {
    data: EstimationRuleRecord;
    cb?: () => void
}

const EstimationRuleCondition: FC<EstimationRuleConditionProps> = ({ data }) => {
    const [open, setOpen] = useState(false);

    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            title="Details"
            dialogTitle="Estimated Rule Details"
            buttonClass="tertiary-vee-btn"
        >
            <div className='flex flex-col gap-6 max-h-[80vh] overflow-y-auto scrollable-content'>
                {/* <div className='space-y-2'>
                    <label htmlFor="rule-name">Rule Name</label>
                    <Input
                        name="estimation0rule-name"
                        defaultValue={data.name}
                        disabled
                        style={{ opacity: "0.8", cursor: "text" }}
                        className="flex flex-wrap h-auto"
                    />
                </div> */}

                <div className='space-y-2'>
                    <label htmlFor="rule-description">Rule Description</label>
                    <textarea
                        readOnly
                        name="rule-description"
                        defaultValue={data.description}
                        disabled
                        style={{ opacity: "0.8", cursor: "text", resize: "none" }}
                        className="w-full h-auto rounded-md  border border-input bg-background px-3 py-2 text-sm"
                    />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="type">Rule Meter Type</label>
                    <Input
                        name="type"
                        defaultValue={data.meter_type}
                        disabled
                        style={{ opacity: "0.8", cursor: "text" }}
                        className="flex flex-wrap h-auto"
                    />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="type">Rule Load Type</label>
                    <Input
                        name="type"
                        defaultValue={data.load_type}
                        disabled
                        style={{ opacity: "0.8", cursor: "text" }}
                        className="flex flex-wrap h-auto"
                    />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="type">Rule Is Active</label>
                    <Input
                        name="type"
                        defaultValue={data.is_default ? "YES" : "NO"}
                        disabled
                        style={{ opacity: "0.8", cursor: "text", color: data.is_default ? "green" : "red"  }}
                        className="flex flex-wrap h-auto"
                    />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="type">Rule Method</label>
                    <Input
                        name="type"
                        defaultValue={data.method}
                        disabled
                        style={{ opacity: "0.8", cursor: "text" }}
                        className="flex flex-wrap h-auto"
                    />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="type">Rule Previous Data Points Count</label>
                    <Input
                        name="type"
                        defaultValue={data.previous_data_points_count}
                        disabled
                        style={{ opacity: "0.8", cursor: "text" }}
                        className="flex flex-wrap h-auto"
                    />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="type">Rule Selected Type</label>
                    <Input
                        name="type"
                        defaultValue={data.selection_type}
                        disabled
                        style={{ opacity: "0.8", cursor: "text" }}
                        className="flex flex-wrap h-auto"
                    />
                </div>

                {data.parameters && data.parameters.length > 0 &&
                    <div className='space-y-2'>
                        <label htmlFor="parameters">Parameters</label>
                        {data.parameters.map((param, index) => (
                            <Input
                                key={`${param}_${index}`}
                                name={index === 0 ? "parameters" : `param_${index}`}
                                defaultValue={param}
                                disabled
                                style={{ opacity: "0.8", cursor: "text" }}
                                className="flex flex-wrap h-auto"
                            />
                        ))}
                    </div>
                }

            </div>
        </BaseModal>
    )
}

export default EstimationRuleCondition