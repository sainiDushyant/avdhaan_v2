import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { searchParamsToHesFilters } from '@/lib/hes';
import { HesFilterState } from '@/store/hes/types/records/device-management';

export const INITIAL_FILTERS = {
    dtr_id: [],
    feeder_id: [],
    pss_id: [],
    device_identifier: []
}

const useHesPrimaryFilterState = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ searchParams, _ ] = useSearchParams();
    
    const defaultFilters = useMemo(() => {
        return searchParamsToHesFilters(searchParams)
    }, [ searchParams ]);

    const [selectedFilters, setSelectedFilters] = useState<HesFilterState>(INITIAL_FILTERS);

    useEffect(() => {
        setSelectedFilters({
            dtr_id: defaultFilters.dtr_id || [],
            feeder_id: defaultFilters.feeder_id || [],
            pss_id: defaultFilters.pss_id || [],
            device_identifier: defaultFilters.device_identifier || []
        })
    }, [ defaultFilters ])

    return {
        primaryFilters: selectedFilters,
        setPrimaryFilters: setSelectedFilters
    }
}

export default useHesPrimaryFilterState