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
import '@/styles/tooltip.css';
import DateTimeFilter from '@/components/customUI/hes/HesFilters/DateTimeFilter';
import { useState } from 'react';

const BlockLoadGraph = () => {
  const { search } = useLocation();
  const [dailyMetricsQuery, setDailyMetricsQuery] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const today = new Date().toISOString().split('T')[0] + 'T23:59:59';

  // First API call
  const {
    data: blockLoadData,
    isFetching: isBlockLoadFetching,
    isError: isBlockLoadError,
    error: blockLoadError,
    refetch: refetchBlockLoad
  } = useGetLiveDataMetricsQuery({
    searchQuery: `?data_type=blockload${search}${query}`
  });

  // Second API call
  const {
    data: blockLoadDailyData,
    isFetching: isBlockLoadDailyFetching,
    isError: isBlockLoadDailyError,
    error: blockLoadDailyError,
    refetch: refetchBlockLoadDaily
  } = useGetLiveDataMetricsQuery({
    searchQuery: `?data_type=blockload-daily-metrics${search}${dailyMetricsQuery}`
  });

  const { minDate, maxDate } = getLast7DaysMinMax();

  const blockLoadChartData =
    blockLoadData &&
    prepareChartData(blockLoadData.blockLoadMetrics, 'line', 'time');
  const blockLoadDailyChartData =
    blockLoadDailyData &&
    prepareChartData(blockLoadDailyData.blockLoadDailyMetrics, 'bar', 'days');

  const isLoading = isBlockLoadFetching || isBlockLoadDailyFetching;
  const hasError = isBlockLoadError || isBlockLoadDailyError;

  if (isLoading) return <FullScreen hasSpinner={true} />;

  if (hasError) {
    const errorToShow =
      isBlockLoadError && blockLoadError ? blockLoadError : blockLoadDailyError;

    // Ensure errorToShow is an object before passing to ErrorScreen
    if (errorToShow && typeof errorToShow === 'object') {
      return <ErrorScreen error={errorToShow} />;
    }
    return <ErrorScreen error={{ message: 'An unknown error occurred.' }} />;
  }

  if (!blockLoadData && !blockLoadDailyData)
    return <EmptyScreen title="No data found" />;

  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        {isLoading ? (
          <div className="h-[70vh] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-full">
            <div className="flex relative flex-col md:flex-row mt-8">
              <div className="flex-1 overflow-x-scroll">
                <div className="flex flex-col">
                  <div className="self-end mb-5">
                    <Button
                      variant={'ghost'}
                      className="refresh-button"
                      onClick={() => {
                        refetchBlockLoad();
                        refetchBlockLoadDaily();
                      }}
                    >
                      <RefreshButton />
                    </Button>
                  </div>
                  <div className="w-[550px] self-end mb-5">
                    <DateTimeFilter
                      start={{
                        min: today,
                        max: today
                      }}
                      end={{
                        min: today,
                        max: today
                      }}
                      queryUpdater={setQuery}
                    />
                  </div>
                  {blockLoadChartData && (
                    <div className="p-5 rounded-lg bg-white h-[70vh] graph-border">
                      <Graph title={'Time Range'} data={blockLoadChartData} />
                    </div>
                  )}
                  <div className="w-[550px] self-end mt-5">
                    <DateTimeFilter
                      start={{ min: minDate, max: maxDate }}
                      end={{ min: minDate, max: maxDate }}
                      queryUpdater={setDailyMetricsQuery}
                    />
                  </div>
                  {blockLoadDailyChartData && (
                    <div className="p-5 rounded-lg bg-white h-[70vh] graph-border mt-5">
                      <Graph
                        title={'Day Range'}
                        type="bar"
                        data={blockLoadDailyChartData}
                      />
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

export default BlockLoadGraph;
