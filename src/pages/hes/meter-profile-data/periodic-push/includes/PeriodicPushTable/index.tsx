import { useMemo, useState } from 'react';
import { useGetPeriodicPushDataQuery } from '@/store/hes/hesApi';
import { useLocation } from 'react-router-dom';
import { getCommandExecutionHistoryUrlSearchParams } from '@/pages/hes/command-execution/includes/utils';
import MetricProfileTable from '../../../includes/MetricProfileTable';
import { MeterProfileQueryParams } from '@/store/hes/types/records/meter-profile-data-metrics';
import { useSelector } from '@/store';

const PeriodicPushTable = () => {
  const { search } = useLocation();
  const [query, setQuery] = useState<MeterProfileQueryParams>({});
  const mainFilterLoading = useSelector(state => state.hes.mainFilterLoading);

  const urlSearchParams = useMemo(() => {
    return getCommandExecutionHistoryUrlSearchParams({ query, search });
  }, [query, search]);

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: refresh
  } = useGetPeriodicPushDataQuery(
    { searchQuery: urlSearchParams },
    { skip: mainFilterLoading }
  );

  return <MetricProfileTable
    response={response}
    isLoading={isLoading}
    isFetching={isFetching}
    isError={isError} error={error}
    query={query} setQuery={setQuery}
    refresh={refresh} 
    filterType={'datetime'}  
  />
};

export default PeriodicPushTable;
