import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GraphComponent from './includes/GraphReports';
import { useGetScheduledReportsQuery } from '@/store/hes/hesApi';
import ListReports from './includes/ListReports';
import Download from '@/components/svg/Download';
import ToggleView from '@/components/customUI/ToggleView';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import HesFilters from '@/components/customUI/hes/HesFilters';
import Spinner from '@/components/customUI/Loaders/Spinner';

const ScheduledReads = () => {
  const { search } = useLocation();

  const {
    data: scheduledReportsResponse,
    isLoading: scheduledReportsLoading,
    isFetching: scheduledReportsFetching,
    isError: scheduledReportsHasError,
    error: scheduledReportsError,
  } = useGetScheduledReportsQuery({ searchQuery: search });

  const [view, setView] = useState<string>('graph');

  if (scheduledReportsLoading) return <FullScreen hasSpinner={true} />;
  if (scheduledReportsHasError) return <ErrorScreen error={scheduledReportsError} />
  if (!scheduledReportsResponse) return (<EmptyScreen title={`scheduled reports data not available`} />);

  return (
    <div className="px-5 py-3 w-full">
      <HesFilters />
      {
        !scheduledReportsFetching ?

          <div className="flex relative flex-col mt-8">
            <div className="flex justify-between items-center">

              <h1 className="capitalize secondary-title lg:main-title">
                <span className="font-bold text-[#0A3690]">Reports</span>
              </h1>

              <div className='flex items-center gap-x-6'>
                <Link
                  to="/"
                  className="link-button tertiary-vee-btn px-2"
                  target="_blank"
                >
                  <Download />
                </Link>
                <ToggleView view={view} setView={setView} />
              </div>
            </div>

            <div className="overflow-x-scroll">
              {view === 'table' ?
                <ListReports /> :
                <GraphComponent chartData={scheduledReportsResponse.chartData} />
              }
            </div>
          </div>
          :
          <div className='min-h-[80vh] flex items-center justify-center'>
            <Spinner />
          </div>
      }
    </div>
  );
};

export default ScheduledReads;
