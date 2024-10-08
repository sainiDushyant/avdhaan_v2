import { useState, useMemo } from 'react';
import HesFilters from '@/components/customUI/hes/HesFilters';
import useGetTableColumns from '@/hooks/useGetTableColumns';
import { useGetRestorationOccuranceMetricsQuery } from '@/store/hes/hesApi';
import { useLocation } from 'react-router-dom';
import DataTable from '@/components/customUI/DataTable';
import Spinner from '@/components/customUI/Loaders/Spinner';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import Header from './includes/Header';
import { AlarmsQueryParams } from '@/store/hes/types/records/alarms';
import { getCommandExecutionHistoryUrlSearchParams } from '../command/includes/utils';
import { getDateRangesFor7Days } from '@/lib/utils';

const Alarms = () => {
  const { search } = useLocation();
  const [query, setQuery] = useState<AlarmsQueryParams>({});
  const urlSearchParams = useMemo(() => {
    return getCommandExecutionHistoryUrlSearchParams({ query, search });
  }, [query, search]);

  const { data, isFetching, isError, isLoading, error, refetch } =
    useGetRestorationOccuranceMetricsQuery({
      searchQuery: urlSearchParams
    });
  const columns = useGetTableColumns({ cols: data, query: [] });
  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />;
  return (
    <div className="px-5 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Alarms</span>
          </h1>
        </div>
        <HesFilters />
        {!isFetching && (
          <div className="overflow-x-scroll">
            {
              <>
                <Header
                  showDate={true}
                  query={query}
                  setQuery={setQuery}
                  filterType="datetime"
                  refresh={refetch}
                  showDownloadButton={true}
                  parentName="pull-events"
                />
                {data && <DataTable data={data} columns={columns} />}
              </>
            }
          </div>
        )}
        {isFetching && (
          <div className="w-full flex items-center justify-center h-[84vh]">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Alarms;
