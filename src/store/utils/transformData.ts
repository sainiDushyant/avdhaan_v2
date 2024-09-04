import { ScheduledReportsResponse, ChartData } from "../hes/types/records/reports";

export const transformDataForChart = (data: ScheduledReportsResponse['data']): ChartData => {
  const chartData: ChartData = {};

  data.records.forEach(({ commandName, statusBreakup }) => {
    const chartItem = chartData[commandName] || {
      labels: ['In Progress', 'Failed', 'Partial Success', 'Success'],
      series: [0, 0, 0, 0],
      colors: ["#FFC32E", "#FF5A5A", "#00C4B4", "#0A3690"],
    };

    Object.entries(statusBreakup).forEach(([status, detail]) => {
      if (!detail || !('percentage' in detail)) return;

      const { percentage } = detail;
      const index = {
        IN_PROGRESS: 0,
        FAILED: 1,
        PARTIAL_SUCCESS: 2,
        PARTIAL_SUCCESS_AFTER_TIMEOUT: 2,
        SUCCESS: 3,
        SUCCESS_AFTER_TIMEOUT: 3,
      }[status];

      if (index !== undefined) chartItem.series[index] += percentage;
    });

    chartData[commandName] = chartItem;
  });

  return chartData;
};
