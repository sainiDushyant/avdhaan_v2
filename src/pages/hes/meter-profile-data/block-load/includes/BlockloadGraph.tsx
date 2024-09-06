import {
  useLocation,
} from 'react-router-dom';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import Spinner from '@/components/customUI/Loaders/Spinner';
import Graph from '@/components/customUI/Graph';
import { useGetLiveDataMetricsQuery } from '@/store/hes/hesApi';
import { prepareChartData } from '@/lib/utils';
import Button from '@/components/ui/button';
import RefreshButton from '@/components/svg/RefreshButton';
import '@/styles/tooltip.css';

const BlockLoadGraph = () => {
  const { search } = useLocation();
  const { data, isFetching, isError, error, refetch } =
    useGetLiveDataMetricsQuery({
      searchQuery: search
    });

  const chartData = data && prepareChartData(data.blockLoadMetrics, 'line', 'time');
  const daysData = data && prepareChartData(data.blockLoadDailyMetrics, 'line', 'days');

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
                  <div className="self-end mb-5">
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
                      <Graph title={'Time Range'} data={chartData} />
                    </div>
                  )}
                  {daysData && (
                    <div className="p-5 rounded-lg bg-white h-[70vh] graph-border mt-5">
                      <Graph title={'Day Range'} data={daysData} />
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
