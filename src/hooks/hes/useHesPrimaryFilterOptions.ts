import { useCallback } from "react";
import pDebounce from "p-debounce";
import { 
    hesFiltersStateToObject,
    objectToUrlParams, 
} from "@/lib/hes";
import { 
    LocationHierarchyRecord, 
    HesFilterState, 
    HesFilterStateOptional 
} from "@/store/hes/types/records/device-management";
import { useLazyGetLocationHierarchyQuery } from "@/store/hes/hesApi";

const useHesPrimaryFilterOptions = (primaryFilters: HesFilterState) => {

    const [ getLocationHierarchy, { isLoading: primaryFilterLoading } ] = useLazyGetLocationHierarchyQuery();

    const searchPrimaryFiltersAPI = useCallback(async (
        key: keyof LocationHierarchyRecord,
        value: string, 
        higherPriorityParams: HesFilterStateOptional = {},
    ) => {
        const higherOrderParamsObj = hesFiltersStateToObject(higherPriorityParams);
        const urlParams = objectToUrlParams(higherOrderParamsObj);
        urlParams.set(`${key}_id`, value);
        const response = await getLocationHierarchy({ searchQuery: urlParams.toString()});
        const data = response.data;
        if(!data) return [];
        return data[key]
    }, []);

    const searchPrimaryFiltersAPIDebounced = pDebounce(searchPrimaryFiltersAPI, 500);

    const dtrOptions = useCallback(async (inputValue: string) => {
        if(inputValue.length < 2 || inputValue.length > 40) return [];
        const higherPriorityParams: HesFilterStateOptional = { 
            pss_id: primaryFilters.pss_id,
            feeder_id: primaryFilters.feeder_id
        };
        const searchData = await searchPrimaryFiltersAPIDebounced("dtr", inputValue, higherPriorityParams);
        if(!searchData) return [];
        const dtrIds = primaryFilters.dtr_id.map(item => item.value);
        return searchData.filter(item => !dtrIds.includes(String(item.value)));
    }, [ primaryFilters ]);

    const feederOptions = useCallback(async (inputValue: string) => {
        if(inputValue.length < 2 || inputValue.length > 40) return [];
        const higherPriorityParams: HesFilterStateOptional = { 
            pss_id: primaryFilters.pss_id
        };
        const searchData = await searchPrimaryFiltersAPIDebounced("feeder", inputValue, higherPriorityParams);
        if(!searchData) return [];
        const feederIds = primaryFilters.feeder_id.map(item => item.value);
        return searchData.filter(item => !feederIds.includes(String(item.value)));
    }, [ primaryFilters ]);

    const pssOptions = useCallback(async (inputValue: string) => {
        if(inputValue.length < 2 || inputValue.length > 40) return [];
        const searchData = await searchPrimaryFiltersAPIDebounced("pss", inputValue);
        if(!searchData) return [];
        const pssIds = primaryFilters.pss_id.map(item => item.value);
        return searchData.filter(item => !pssIds.includes(String(item.value)));
    }, [ primaryFilters ]);

    return {
        primaryFilterLoading,
        dtrOptions,
        feederOptions,
        pssOptions,
    }
}

export default useHesPrimaryFilterOptions