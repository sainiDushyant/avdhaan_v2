import { useSearchParams } from 'react-router-dom';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import Spinner from '@/components/customUI/Loaders/Spinner';
import Graph from '@/components/customUI/Graph';
import { useGetLiveDataMetricsQuery } from '@/store/hes/hesApi';
import { prepareChartData } from '@/lib/utils';
import '@/styles/tooltip.css';

const BillingGraph = () => {
  const [searchParams] = useSearchParams();
  const trail = searchParams.get('trail') || '7';

  const { data, isFetching, isError, error } = useGetLiveDataMetricsQuery({
    searchQuery: `?trail=${trail}`
  });

  const chartData =
    data && prepareChartData(data.billingMetrics, 'bar', 'days');

  if (isFetching) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />;
  if (!data) return <EmptyScreen title="No data found" />;

  return (
    <div className="px-2 w-full">
      <div className="flex justify-center items-center">
        {isFetching ? (
          <div className="h-[70vh] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="px-5 py-3 w-full">
            <div className="flex relative flex-col md:flex-row mt-8">
              <div className="flex-1 overflow-x-scroll">
                <div>
                  {chartData && (
                    <div className="p-5 rounded-lg bg-white h-[70vh] graph-border">
                      <Graph
                        title={'Monthly Range'}
                        type={'bar'}
                        data={chartData}
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

export default BillingGraph;
