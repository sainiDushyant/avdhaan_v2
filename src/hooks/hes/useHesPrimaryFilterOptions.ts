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
import { useLazyGetDeviceIdentifierQuery, useLazyGetLocationHierarchyQuery } from "@/store/hes/hesApi";

const useHesPrimaryFilterOptions = (primaryFilters: HesFilterState) => {

    const [ getLocationHierarchy, { isLoading: primaryFilterLoading } ] = useLazyGetLocationHierarchyQuery();

    const [ getDeviceIdentifers, { isLoading: deviceIdentifierLoading } ] = useLazyGetDeviceIdentifierQuery();

    const searchDeviceIdentifierAPI = useCallback(async(
        key: keyof LocationHierarchyRecord,
        value: string, 
        higherPriorityParams: HesFilterStateOptional = {},
    ) => {
        const higherOrderParamsObj = hesFiltersStateToObject(higherPriorityParams);
        const urlParams = objectToUrlParams(higherOrderParamsObj);
        urlParams.set(key, value);
        const response = await getDeviceIdentifers({ searchQuery: urlParams.toString()});
        const data = response.data;
        if(!data) return [];
        return data[key]
    }, [])

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
    const searchDeviceIdentifierAPIDebounced = pDebounce(searchDeviceIdentifierAPI, 500);

    const deviceIdentifierOptions = useCallback(async (inputValue: string) => {
        const higherPriorityParams: HesFilterStateOptional = { 
            pss_id: primaryFilters.pss_id,
            feeder_id: primaryFilters.feeder_id,
            dtr_id: primaryFilters.dtr_id
        };
        const searchData = await searchDeviceIdentifierAPIDebounced(
            "device_identifier", inputValue, higherPriorityParams
        );
        if(!searchData) return [];
        return searchData
    }, [ primaryFilters ]);

    const dtrOptions = useCallback(async (inputValue: string) => {
        const higherPriorityParams: HesFilterStateOptional = { 
            pss_id: primaryFilters.pss_id,
            feeder_id: primaryFilters.feeder_id
        };
        const searchData = await searchPrimaryFiltersAPIDebounced("dtr", inputValue, higherPriorityParams);
        if(!searchData) return [];
        return searchData
    }, [ primaryFilters ]);

    const feederOptions = useCallback(async (inputValue: string) => {
        const higherPriorityParams: HesFilterStateOptional = { 
            pss_id: primaryFilters.pss_id
        };
        const searchData = await searchPrimaryFiltersAPIDebounced("feeder", inputValue, higherPriorityParams);
        if(!searchData) return [];
        return searchData
    }, [ primaryFilters ]);

    const pssOptions = useCallback(async (inputValue: string) => {
        const searchData = await searchPrimaryFiltersAPIDebounced("pss", inputValue);
        if(!searchData) return [];
        return searchData
    }, [ primaryFilters ]);

    return {
        deviceIdentifierOptions,
        dtrOptions,
        feederOptions,
        pssOptions,
    }
}

export default useHesPrimaryFilterOptions