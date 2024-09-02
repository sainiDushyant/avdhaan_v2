import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { convertSearchParamsToHesFilters } from '@/lib/hes';
import { HesFilterState } from '@/store/hes/types/records/supplementary';

const useHesPrimaryFilterState = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ searchParams, _ ] = useSearchParams();
    
    const defaultFilters = useMemo(() => {
        return convertSearchParamsToHesFilters(searchParams)
    }, []);

    const [selectedFilters, setSelectedFilters] = useState<HesFilterState>({
        pole: defaultFilters.pole || [],
        dtr: defaultFilters.dtr || [],
        feeder: defaultFilters.feeder || [],
        pss: defaultFilters.pss || [],
        site: defaultFilters.site || []
    });

    return {
        primaryFilters: selectedFilters,
        setPrimaryFilters: setSelectedFilters
    }
}

export default useHesPrimaryFilterState