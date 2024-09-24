import { useCallback } from 'react';
import pDebounce from 'p-debounce';
import { hesFiltersStateToObject, objectToUrlParams } from '@/lib/hes';
import { useLazyGetDeviceIdentifierQuery } from '@/store/hes/hesApi';
import { LocationHierarchyRecord, HesFilterStateOptional } from '@/store/hes/types/records/device-management';

const useDeviceIdentifierOptions = (primaryFilters: HesFilterStateOptional) => {

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

    const searchDeviceIdentifierAPIDebounced = pDebounce(searchDeviceIdentifierAPI, 500);

    const deviceIdentifierOptions = useCallback(async (inputValue: string) => {
        const { device_identifier, ...rest } =  primaryFilters;
        const searchData = await searchDeviceIdentifierAPIDebounced(
            "device_identifier", inputValue, rest
        );
        if(!searchData) return [];
        if(!device_identifier) return searchData;
        const deviceIds = device_identifier.map(item => item.value);
        return searchData.filter(item => !deviceIds.includes(String(item.value)));
    }, [ primaryFilters ]);

    return {
        deviceIdentifierOptions,
        deviceIdentifierLoading
    }
}

export default useDeviceIdentifierOptions