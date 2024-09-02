import { useCallback } from "react";
import pDebounce from "p-debounce";
import { 
    convertHesFiltersToSearchParams 
} from "@/lib/hes";
import { 
    HesFiltersRecord, 
    HesFilterState, 
    HesFilterStateOptional 
} from "@/store/hes/types/records/supplementary";
import { filterData } from "./primaryHesFilterData";

const useHesPrimaryFilterOptions = (primaryFilters: HesFilterState) => {

    const searchFiltersAPI = useCallback(async (
        key: keyof HesFiltersRecord,
        value: string, 
        higherPriorityParams: HesFilterStateOptional = {}
    ) => {
        const higherPriorityObj = convertHesFiltersToSearchParams(higherPriorityParams);
        console.log(higherPriorityObj)
        const response = filterData[key];
        if(!response) return [];
        return response.map(item => ({ label: `${key}: ${item}`, value: item }));
        // const response = await searchFilters(value);
        // const data = response.data;
        // return data;
    }, []);

    const searchFiltersAPIDebounced = pDebounce(searchFiltersAPI, 250);

    const poleOptions = useCallback(async (inputValue: string) => {
        const higherPriorityParams: HesFilterStateOptional = { 
            site: primaryFilters.site, 
            pss: primaryFilters.pss,
            feeder: primaryFilters.feeder,
            dtr: primaryFilters.dtr
        };
        const searchData = await searchFiltersAPIDebounced("pole", inputValue, higherPriorityParams);
        return searchData
    }, [ primaryFilters ]);

    const dtrOptions = useCallback(async (inputValue: string) => {
        const higherPriorityParams: HesFilterStateOptional = { 
            site: primaryFilters.site, 
            pss: primaryFilters.pss,
            feeder: primaryFilters.feeder
        };
        const searchData = await searchFiltersAPIDebounced("dtr", inputValue, higherPriorityParams);
        return searchData
    }, [ primaryFilters ]);

    const feederOptions = useCallback(async (inputValue: string) => {
        const higherPriorityParams: HesFilterStateOptional = { 
            site: primaryFilters.site, 
            pss: primaryFilters.pss
        };
        const searchData = await searchFiltersAPIDebounced("feeder", inputValue, higherPriorityParams);
        return searchData
    }, [ primaryFilters ]);

    const pssOptions = useCallback(async (inputValue: string) => {
        const higherPriorityParams: HesFilterStateOptional = { site: primaryFilters.site };
        const searchData = await searchFiltersAPIDebounced("pss", inputValue, higherPriorityParams);
        return searchData
    }, [ primaryFilters ]);

    const siteOptions = useCallback(async (inputValue: string) => {
        const searchData = await searchFiltersAPIDebounced("site", inputValue);
        return searchData
    }, []);

    return {
        poleOptions,
        dtrOptions,
        feederOptions,
        pssOptions,
        siteOptions
    }
}

export default useHesPrimaryFilterOptions