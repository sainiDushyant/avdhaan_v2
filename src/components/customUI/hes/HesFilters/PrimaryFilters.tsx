import useHesPrimaryFilterOptions from "@/hooks/hes/useHesPrimaryFilterOptions";
import { FC, useCallback } from "react";
import { MultiValue } from "react-select";
import { Option } from "@/store/vee/types/other";
import AsyncMultiOptionSelect from "@/components/customUI/Select/AsyncMultiOptionSelect";
import { HesFilterState } from "@/store/hes/types/records/device-management";

interface PrimaryFiltersProps {
    primaryFilters: HesFilterState;
    setPrimaryFilters: React.Dispatch<React.SetStateAction<HesFilterState>>;
}

const PrimaryFilters: FC<PrimaryFiltersProps> = ({
    primaryFilters, setPrimaryFilters
}) => {

    const {
        deviceIdentifierOptions, dtrOptions, feederOptions, pssOptions,
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
            <AsyncMultiOptionSelect
                loadOptions={pssOptions}
                handleChange={handleChangePss}
                value={primaryFilters.pss_id}
                loading={false}
                customCss="flex-none md:min-w-[220px]"
                placeholder={"Sub-Station"}
            />
            <AsyncMultiOptionSelect
                loadOptions={feederOptions}
                handleChange={handleChangeFeeder}
                value={primaryFilters.feeder_id}
                loading={false}
                customCss="flex-none md:min-w-[220px]"
                placeholder={"Feeder"}
            />
            <AsyncMultiOptionSelect
                loadOptions={dtrOptions}
                handleChange={handleChangeDtr}
                value={primaryFilters.dtr_id}
                loading={false}
                customCss="flex-none md:min-w-[220px]"
                placeholder={"DTR"}
            />
            <AsyncMultiOptionSelect
                loadOptions={deviceIdentifierOptions}
                handleChange={handleChangeDeviceIdentifier}
                value={primaryFilters.device_identifier}
                loading={false}
                customCss="flex-none md:min-w-[220px]"
                placeholder={"Meter"}
            />
        </>
    )
}

export default PrimaryFilters