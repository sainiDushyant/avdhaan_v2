import useHesPrimaryFilterOptions from "@/hooks/hes/useHesPrimaryFilterOptions";
import { FC, useCallback } from "react";
import { MultiValue } from "react-select";
import { Option } from "@/store/vee/types/other";
import AsyncMultiOptionSelect from "@/components/customUI/Select/AsyncMultiOptionSelect";
import { HesFilterState } from "@/store/hes/types/records/supplementary";

interface PrimaryFiltersProps {
    primaryFilters: HesFilterState;
    setPrimaryFilters: React.Dispatch<React.SetStateAction<HesFilterState>>;
}

const PrimaryFilters: FC<PrimaryFiltersProps> = ({
    primaryFilters, setPrimaryFilters
}) => {

    const {
        poleOptions, dtrOptions, feederOptions, pssOptions, siteOptions
    } = useHesPrimaryFilterOptions(primaryFilters);

    const handleChangePole = useCallback((selected: MultiValue<Option>) => {
        setPrimaryFilters(prevData => ({ 
            ...prevData, "pole": selected 
        }));
    }, []);

    const handleChangeDtr = useCallback((selected: MultiValue<Option>) => {
        setPrimaryFilters(prevData => ({ 
            ...prevData, "dtr": selected, pole: []
        }));
    }, []);

    const handleChangeFeeder = useCallback((selected: MultiValue<Option>) => {
        setPrimaryFilters(prevData => ({ 
            ...prevData, "feeder": selected, dtr: [], pole: []
        }));
    }, []);

    const handleChangePss = useCallback((selected: MultiValue<Option>) => {
        setPrimaryFilters(prevData => ({ 
            ...prevData, "pss": selected, feeder: [], dtr: [], pole: [] 
        }));
    }, []);

    const handleChangeSite = useCallback((selected: MultiValue<Option>) => {
        setPrimaryFilters({ 
            "site": selected, pss: [],  feeder: [],  dtr: [], pole: [] 
        });
    }, []);
    
    return (
        <>
            <AsyncMultiOptionSelect
                loadOptions={siteOptions}
                handleChange={handleChangeSite}
                value={primaryFilters.site}
                loading={false}
                customCss="flex-none md:min-w-[220px]"
                placeholder={"Site"}
            />
            <AsyncMultiOptionSelect
                loadOptions={pssOptions}
                handleChange={handleChangePss}
                value={primaryFilters.pss}
                loading={false}
                customCss="flex-none md:min-w-[220px]"
                placeholder={"Pss"}
            />
            <AsyncMultiOptionSelect
                loadOptions={feederOptions}
                handleChange={handleChangeFeeder}
                value={primaryFilters.feeder}
                loading={false}
                customCss="flex-none md:min-w-[220px]"
                placeholder={"Feeder"}
            />
            <AsyncMultiOptionSelect
                loadOptions={dtrOptions}
                handleChange={handleChangeDtr}
                value={primaryFilters.dtr}
                loading={false}
                customCss="flex-none md:min-w-[220px]"
                placeholder={"Dtr"}
            />
            <AsyncMultiOptionSelect
                loadOptions={poleOptions}
                handleChange={handleChangePole}
                value={primaryFilters.pole}
                loading={false}
                customCss="flex-none md:min-w-[220px]"
                placeholder={"Pole"}
            />
        </>
    )
}

export default PrimaryFilters