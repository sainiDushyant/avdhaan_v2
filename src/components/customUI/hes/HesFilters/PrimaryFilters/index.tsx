import useHesPrimaryFilterOptions from "@/hooks/hes/useHesPrimaryFilterOptions";
import { FC, useCallback } from "react";
import { MultiValue } from "react-select";
import { Option } from "@/store/vee/types/other";
import AsyncMultiOptionSelect from "@/components/customUI/Select/AsyncMultiOptionSelect";
import { HesFilterState } from "@/store/hes/types/records/device-management";
import DeviceIdentifier from "./DeviceIdentifier";
import DisabledFilter from "./DisabledFilter";

interface PrimaryFiltersProps {
    primaryFilters: HesFilterState;
    hideDisabledFilters?: boolean;
    setPrimaryFilters: React.Dispatch<React.SetStateAction<HesFilterState>>;
}

const PrimaryFilters: FC<PrimaryFiltersProps> = ({
    primaryFilters, hideDisabledFilters,
    setPrimaryFilters,
}) => {

    const {
        primaryFilterLoading,
        dtrOptions, feederOptions, pssOptions,
    } = useHesPrimaryFilterOptions(primaryFilters);

    const handleChangeDeviceIdentifier = useCallback((selected: MultiValue<Option>) => {
        setPrimaryFilters(prevData => ({ ...prevData, device_identifier: selected }));
    }, []);

    const handleChangeDtr = useCallback((selected: MultiValue<Option>) => {
        setPrimaryFilters(prevData => ({ 
            ...prevData, dtr_id: selected, device_identifier: []
        }));
    }, []);

    const handleChangeFeeder = useCallback((selected: MultiValue<Option>) => {
        setPrimaryFilters(prevData => ({ 
            ...prevData, feeder_id: selected, dtr_id: [], device_identifier: []
        }));
    }, []);

    const handleChangePss = useCallback((selected: MultiValue<Option>) => {
        setPrimaryFilters(prevData => ({ 
            ...prevData, pss_id: selected, feeder_id: [], dtr_id: [], device_identifier: []
        }));
    }, []);
    
    return (
        <>
            {!hideDisabledFilters && <DisabledFilter />}
            <AsyncMultiOptionSelect
                loadOptions={pssOptions}
                handleChange={handleChangePss}
                value={primaryFilters.pss_id}
                loading={primaryFilterLoading}
                customCss="flex-none md:min-w-[220px] max-w-[70vw]"
                placeholder={"Sub-Station"}
                cacheOptions={false}
            />
            <AsyncMultiOptionSelect
                loadOptions={feederOptions}
                handleChange={handleChangeFeeder}
                value={primaryFilters.feeder_id}
                loading={primaryFilterLoading}
                customCss="flex-none md:min-w-[220px] max-w-[70vw]"
                placeholder={"Feeder"}
                cacheOptions={false}
            />
            <AsyncMultiOptionSelect
                loadOptions={dtrOptions}
                handleChange={handleChangeDtr}
                value={primaryFilters.dtr_id}
                loading={primaryFilterLoading}
                customCss="flex-none md:min-w-[220px] max-w-[70vw]"
                placeholder={"DTR"}
                cacheOptions={false}
            />
            <DeviceIdentifier 
                primaryFilters={primaryFilters} 
                deviceIdentifier={primaryFilters.device_identifier} 
                cacheOptions={false}
                onChange={handleChangeDeviceIdentifier} 
            />
        </>
    )
}

export default PrimaryFilters