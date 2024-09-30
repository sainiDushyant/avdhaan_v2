import { useCallback, useState } from "react";
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
    const [defaultOptions, setDefaultOptions] = useState<LocationHierarchyRecord>({})

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
        return data
    }, []);

    const searchPrimaryFiltersAPIDebounced = pDebounce(searchPrimaryFiltersAPI, 500);

    const dtrOptions = useCallback(async (inputValue: string) => {
        if(inputValue.length < 2 || inputValue.length > 40) return [];
        const higherPriorityParams: HesFilterStateOptional = { 
            pss_id: primaryFilters.pss_id,
            feeder_id: primaryFilters.feeder_id
        };
        const searchData = await searchPrimaryFiltersAPIDebounced("dtr", inputValue, higherPriorityParams);
        if(!searchData || !searchData.dtr) return [];
        const { dtr, ...rest } = searchData;
        const dtrIds = primaryFilters.dtr_id.map(item => item.value);
        setDefaultOptions(rest);
        return dtr.filter(item => !dtrIds.includes(String(item.value)));
    }, [ primaryFilters, setDefaultOptions ]);

    const feederOptions = useCallback(async (inputValue: string) => {
        if(inputValue.length < 2 || inputValue.length > 40) return [];
        const higherPriorityParams: HesFilterStateOptional = { 
            pss_id: primaryFilters.pss_id
        };
        const searchData = await searchPrimaryFiltersAPIDebounced("feeder", inputValue, higherPriorityParams);
        if(!searchData || !searchData.feeder) return [];
        const { feeder, ...rest } = searchData;
        setDefaultOptions(rest);
        const feederIds = primaryFilters.feeder_id.map(item => item.value);
        return feeder.filter(item => !feederIds.includes(String(item.value)));
    }, [ primaryFilters, setDefaultOptions ]);

    const pssOptions = useCallback(async (inputValue: string) => {
        if(inputValue.length < 2 || inputValue.length > 40) return [];
        const searchData = await searchPrimaryFiltersAPIDebounced("pss", inputValue);
        if(!searchData || !searchData.pss) return [];
        const { pss, ...rest } = searchData;
        setDefaultOptions(rest);
        const pssIds = primaryFilters.pss_id.map(item => item.value);
        return pss.filter(item => !pssIds.includes(String(item.value)));
    }, [ primaryFilters, setDefaultOptions ]);

    return {
        primaryFilterLoading,
        defaultOptions,
        dtrOptions,
        feederOptions,
        pssOptions,
    }
}

export default useHesPrimaryFilterOptions