import { FC } from 'react';
import AsyncMultiOptionSelect from '@/components/customUI/Select/AsyncMultiOptionSelect'
import useDeviceIdentifierOptions from '@/hooks/hes/useDeviceIdentifierOptions'
import { MultiValue } from 'react-select';
import { Option } from "@/store/vee/types/other";
import { HesFilterStateOptional } from '@/store/hes/types/records/device-management';

interface DeviceIdentifierProps {
    primaryFilters: HesFilterStateOptional,
    deviceIdentifier: MultiValue<Option>;
    cacheOptions?: boolean;
    required?: boolean;
    disabled?: boolean;
    onChange: (selected: MultiValue<Option>) => void;
}

const DeviceIdentifier: FC<DeviceIdentifierProps> = ({ 
    primaryFilters, deviceIdentifier, cacheOptions, 
    required, disabled, onChange 
}) => {

    const { 
        deviceIdentifierLoading,
        deviceIdentifierOptions
    } = useDeviceIdentifierOptions(primaryFilters)

    return (
        <AsyncMultiOptionSelect
            loadOptions={deviceIdentifierOptions}
            handleChange={onChange}
            value={deviceIdentifier}
            loading={deviceIdentifierLoading}
            customCss="flex-none md:min-w-[220px] max-w-[70vw]"
            placeholder={"Meter"}
            required={required}
            cacheOptions={cacheOptions}
            isDisabled={disabled}
        />
    )
}

export default DeviceIdentifier