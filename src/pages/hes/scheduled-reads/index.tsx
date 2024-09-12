
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GraphComponent from './includes/GraphReports';
import ListReports from './includes/ListReports';
import Download from '@/components/svg/Download';
import ToggleView from '@/components/customUI/ToggleView';
import HesFilters from '@/components/customUI/hes/HesFilters';
import DateFilters from '@/components/customUI/hes/HesFilters/DateFilter.tsx';
import { useGetScheduledReportsQuery } from '@/store/hes/hesApi';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import Spinner from '@/components/customUI/Loaders/Spinner';

export type QueryType = {
  from: string;
  to: string;
}

const ScheduledReads = () => {

  const { search } = useLocation();

  const [view, setView] = useState<string>('graph');
  const [query, setQuery] = useState<QueryType>({ from: "", to: "" });

  const urlSearchParam = useMemo(() => {
    let newSearchParam = search ? `${search}&` : "?";
    if (query.from) newSearchParam += `from=${query.from}&`
    if (query.to) newSearchParam += `to=${query.to}&`
    return newSearchParam
  }, [query, search]);

  const { data: response, isLoading, isFetching, isError, error } = useGetScheduledReportsQuery({
    searchQuery: urlSearchParam
  }, { refetchOnMountOrArgChange: true });

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response || !response.transformedRecords.length ||
    !response.chartData) return (<EmptyScreen title={`scheduled reads not available`} />);

  return (
    <div className="px-5 py-3 w-full">
      <HesFilters />
      <DateFilters
        setQuery={setQuery}
      />
      {!isFetching ?
        <>
          <div className="flex relative flex-col mt-8 m-4 h-[440vh]">
            <div className="flex justify-between items-center p-2">
              <h1 className="capitalize secondary-title lg:main-title">
                <span className="font-bold text-[#0A3690]">Reports</span>
              </h1>
              <div className='flex items-center gap-x-6'>
                <Link to="/" className="link-button tertiary-vee-btn px-2" target="_blank">
                  <Download />
                </Link>
                <ToggleView view={view} setView={setView} />
            </div>
          </div>
          {view === 'table' ? (
            <ListReports data={response.transformedRecords} />
          ) : (
            <GraphComponent  data={response.chartData} />
          )
          }
          </div>
        </>
        :
        <div className='min-h-[80vh] flex items-center justify-center'>
          <Spinner />
        </div>
      }
    </div>
  );
};

export default ScheduledReads;
