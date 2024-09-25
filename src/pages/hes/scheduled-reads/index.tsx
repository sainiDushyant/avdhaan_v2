import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GraphComponent from './includes/GraphReports';
import ToggleView from '@/components/customUI/ToggleView';
import HesFilters from '@/components/customUI/hes/HesFilters';
import { useGetScheduledReportsQuery } from '@/store/hes/hesApi';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import Spinner from '@/components/customUI/Loaders/Spinner';
import DataTable from '@/components/customUI/DataTable';
import useGetTableColumns from '@/hooks/useGetTableColumns';
import DateFilter from './includes/DateFilter.tsx';

export type QueryType = {
  from: string;
  to: string;
}

const ScheduledReads = () => {

  const { search } = useLocation();

  const [view, setView] = useState<"graph" | "table">('graph');
  const [query, setQuery] = useState<QueryType>({ from: "", to: "" });

  const urlSearchParam = useMemo(() => {
    let newSearchParam = search ? `${search}&` : "?";
    if (query.from) newSearchParam += `from=${query.from}&`
    if (query.to) newSearchParam += `to=${query.to}&`
    return newSearchParam
  }, [query, search]);

  const {
    data: response, isLoading,
    isFetching, isError, error, refetch
  } = useGetScheduledReportsQuery({ searchQuery: urlSearchParam });

  const tableData = response?.records || [];
  const columns = useGetTableColumns({
    cols: tableData,
    query: ["totalCommands"]
  });

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response) return (<EmptyScreen title={`scheduled reads not available`} />)

  return (
    <div className="px-5 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Schedule Reads</span>
          </h1>
          <ToggleView view={view} setView={setView} />
        </div>
        <HesFilters />
        <DateFilter setQuery={setQuery} refresh={refetch} />
        {
          !isFetching ?
            <div className="mt-8">
              {view === 'table' &&
                <DataTable
                  columns={columns}
                  data={tableData}
                />
              }
              {view === 'graph' && <GraphComponent data={response.chartData} />}
            </div> :
            <div className='min-h-[80vh] flex items-center justify-center'>
              <Spinner />
            </div>
        }
      </div>
    </div>
  )
};

export default ScheduledReads;
