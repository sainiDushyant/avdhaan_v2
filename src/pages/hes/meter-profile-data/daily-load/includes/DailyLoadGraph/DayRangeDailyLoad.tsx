import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetLiveDataMetricsQuery } from '@/store/hes/hesApi';
import DateTimeBarGraph from '../../../includes/DateTimeBarGraph';
import { MeterProfileQueryParams } from '@/store/hes/types/records/meter-profile-data-metrics';

const DayRangeDailyLoad = () => {

    const { search } = useLocation();
    const [query, setQuery] = useState<MeterProfileQueryParams>({});

    const getUrlSearchParams = useCallback((params: MeterProfileQueryParams, preFix: string) => {
        return (search ? `${search}&` : `?`) + `${preFix}&from=${params.from || ""}&to=${params.to || ""}`
    }, [search])

    const {
        data,
        isFetching,
        isError,
        error,
    } = useGetLiveDataMetricsQuery({
        searchQuery: getUrlSearchParams(query, "data_type=dailyload")
    });

    return (
        <DateTimeBarGraph 
            isFetching={isFetching}
            isError={isError} error={error}
            setQuery={setQuery} 
            data={data?.dailyLoadMetrics}        
        />
    )
}

export default DayRangeDailyLoad