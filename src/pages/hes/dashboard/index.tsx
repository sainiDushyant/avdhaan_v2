import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import Graph from "@/components/customUI/Graph";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import { useGetDeviceMetaInfoMetricsQuery } from "@/store/hes/hesApi";

const Dashboard = () => {
  const {
    data: deviceMetaInfoMetricsResponse,
    isLoading: deviceMetaInfoMetricsLoading,
    isFetching: deviceMetaInfoMetricsFetching,
    isError: deviceMetaInfoMetricsHasError,
    error: deviceMetaInfoMetricsError,
    refetch: refetchDeviceMetaInfoMetrics,
  } = useGetDeviceMetaInfoMetricsQuery();

  if (deviceMetaInfoMetricsLoading) return <FullScreen hasSpinner={true} />;
  if (deviceMetaInfoMetricsHasError) return <ErrorScreen error={deviceMetaInfoMetricsError} />
  if (!deviceMetaInfoMetricsResponse) return ( <EmptyScreen title={`deviceMetaInfoMetricsResponse not available`} /> );
  
  return (
    <div className="px-5 py-3 w-full">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
      {
          deviceMetaInfoMetricsResponse.data.records.map(recordItem => {
            return Object.entries(recordItem).map(([graphTitle, graphObj]) => (
              <div className="" key={graphTitle}>
                <Graph graphTitle={graphTitle} graphData={graphObj} />
              </div>
            ))
          })
      }
      </div>
    </div>
  )
}

export default Dashboard