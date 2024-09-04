import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import Graph from "@/components/customUI/Graph";
import HesFilters from "@/components/customUI/hes/HesFilters";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import { useGetDeviceMetaInfoMetricsQuery } from "@/store/hes/hesApi";
import { prepareDashboardChart } from "./includes/utils";

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
      <HesFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {
          deviceMetaInfoMetricsResponse.map(recordItem => {
            return Object.entries(recordItem).map(([graphTitle, graphObj]) => (
              <div className="bg-white rounded-sm p-3 drop-shadow-sm" key={graphTitle}>
                <Graph data={prepareDashboardChart(graphObj)} title={graphTitle} type="pie" />
              </div>
            ))
          })
      }
      </div>
    </div>
  )
}

export default Dashboard