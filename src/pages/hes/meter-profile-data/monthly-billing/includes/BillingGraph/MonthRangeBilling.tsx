import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetLiveDataMetricsQuery } from '@/store/hes/hesApi';
import MonthBarGraph from '../../../includes/MonthBarGraph';
import { MeterProfileQueryParams } from '@/store/hes/types/records/meter-profile-data-metrics';

const MonthRangeBilling = () => {
  const { search } = useLocation();
  const [query, setQuery] = useState<MeterProfileQueryParams>({});

  const getUrlSearchParams = useCallback(
    (params: MeterProfileQueryParams, preFix: string) => {
      return (
        (search ? `${search}&` : `?`) +
        `${preFix}&from=${params.from || ''}&to=${params.to || ''}`
      );
    },
    [search]
  );

  const { data, isFetching, isError, error } = useGetLiveDataMetricsQuery({
    searchQuery: getUrlSearchParams(query, 'data_type=billing')
  });

  return (
    <MonthBarGraph
      isFetching={isFetching}
      isError={isError}
      error={error}
      setQuery={setQuery}
      data={data?.billingMetrics}
    />
  );
};

export default MonthRangeBilling;
