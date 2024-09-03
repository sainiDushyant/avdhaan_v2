import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { searchParamsToHesFilters } from '@/lib/hes';
import { HesFilterState } from '@/store/hes/types/records/device-management';

const useHesPrimaryFilterState = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ searchParams, _ ] = useSearchParams();
    
    const defaultFilters = useMemo(() => {
        return searchParamsToHesFilters(searchParams)
    }, []);

    const [selectedFilters, setSelectedFilters] = useState<HesFilterState>({
        dtr_id: defaultFilters.dtr_id || [],
        feeder_id: defaultFilters.feeder_id || [],
        pss_id: defaultFilters.pss_id || [],
        device_identifier: defaultFilters.device_identifier || []
    });

    return {
        primaryFilters: selectedFilters,
        setPrimaryFilters: setSelectedFilters
    }
}

export default useHesPrimaryFilterState