import { useLocation } from 'react-router-dom';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import Spinner from '@/components/customUI/Loaders/Spinner';
import Graph from '@/components/customUI/Graph';
import { useGetLiveDataMetricsQuery } from '@/store/hes/hesApi';
import { getLast7DaysMinMax, prepareChartData } from '@/lib/utils';
import Button from '@/components/ui/button';
import RefreshButton from '@/components/svg/RefreshButton';
import DateTimeFilter from '@/components/customUI/hes/HesFilters/DateTimeFilter';
import '@/styles/tooltip.css';
import { useState } from 'react';

const InstantaneousGraph = () => {
  const { search } = useLocation();
  const [query, setQuery] = useState<string>('');
  const { data, isFetching, isError, error, refetch } =
    useGetLiveDataMetricsQuery({
      searchQuery: `${search ? search : '?'}${query}`
    });

  const chartData =
    data && prepareChartData(data.profileInstantMetrics, 'bar', 'days');

  const { minDate, maxDate } = getLast7DaysMinMax();

  if (isFetching) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />;
  if (!data) return <EmptyScreen title="No data found" />;

  return (
    <div className=" w-full">
      <div className="flex justify-center items-center">
        {isFetching ? (
          <div className="h-[70vh] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-full">
            <div className="flex relative flex-col md:flex-row mt-8">
              <div className="flex-1 overflow-x-scroll">
                <div className="flex flex-col">
                  <div className="self-end flex gap-2 items-center mb-5">
                    <div>
                      <DateTimeFilter
                        start={{
                          min: minDate,
                          max: maxDate
                        }}
                        end={{
                          min: minDate,
                          max: maxDate
                        }}
                        queryUpdater={setQuery}
                      />
                    </div>
                    <Button
                      variant={'ghost'}
                      className="refresh-button"
                      onClick={refetch}
                    >
                      <RefreshButton />
                    </Button>
                  </div>
                  {chartData && (
                    <div className="p-5 rounded-lg bg-white h-[70vh] graph-border">
                      <Graph title={'Day Range'} type="bar" data={chartData} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstantaneousGraph;
