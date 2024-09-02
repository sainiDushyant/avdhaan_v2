import { FC } from 'react';
import { METER_TYPE, LOAD_TYPE, MeterTypeOption, LoadTypeOption } from '@/lib/vee'
import SingleOptionSelect from '@/components/customUI/Select/SingleOptionSelect'
import { Option } from "@/store/vee/types/other";
import { cn } from '@/lib/utils';

interface MTLTFormProps {
    meterType: MeterTypeOption | null;
    loadType: LoadTypeOption | null;
    customProfile?: LoadTypeOption[];
    hideLabels?: boolean;
    customCss?: string;
    meterTypeReq?: boolean;
    profileReq?: boolean;
    handleChangeMeterType: (selected: MeterTypeOption | null) => void;
    handleChangeLoadType: (selected: LoadTypeOption | null) => void;
}

const MTLTForm: FC<MTLTFormProps> = ({ 
    meterType, loadType, 
    customProfile, hideLabels, 
    customCss, meterTypeReq, profileReq,
    handleChangeLoadType,
    handleChangeMeterType
}) => {
    return (
        <div className="flex gap-4">
            <div className={cn("flex flex-1 flex-col", customCss)}>
                {!hideLabels && <label htmlFor="meter-type" className="mb-1">Meter Type</label>}
                <SingleOptionSelect
                    customCss={customCss}
                    handleChange={handleChangeMeterType as (selected: Option | null) => void}
                    value={meterType} loading={false}
                    placeholder={"Meter Type"}
                    data={METER_TYPE}
                    name="meter-type"
                    required={meterTypeReq === undefined ? true: meterTypeReq}
                />
            </div>

            <div className={cn("flex flex-1 flex-col", customCss)}>
                {!hideLabels && <label htmlFor="load-type" className="mb-1">Profile</label>}
                <SingleOptionSelect
                    customCss={customCss}
                    handleChange={handleChangeLoadType as (selected: Option | null) => void}
                    value={loadType} loading={false}
                    placeholder={"Profile"} 
                    data={customProfile || LOAD_TYPE}
                    required={profileReq === undefined ? true: profileReq}
                />
            </div>
        </div>
    )
}

export default MTLTForm