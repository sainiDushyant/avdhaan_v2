import React from 'react';
import Graph from "@/components/customUI/Graph";
import { ApexOptions } from 'apexcharts';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import { useGetScheduledReportsQuery } from '@/store/hes/hesApi';
import { useLocation } from 'react-router-dom';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';

const GraphComponent: React.FC = () => {
  const { search } = useLocation();
  const {
    data: scheduledReportsResponse,
    isLoading: scheduledReportsLoading,
    isError: scheduledReportsHasError,
    error: scheduledReportsError,
  } = useGetScheduledReportsQuery({ searchQuery: search });

  if (scheduledReportsLoading) return <FullScreen hasSpinner={true} />;
  if (scheduledReportsHasError) return <ErrorScreen error={scheduledReportsError} />;
  if (!scheduledReportsResponse || Object.keys(scheduledReportsResponse.chartData).length === 0) {
    return <EmptyScreen title="Scheduled reports data not available" />;
  }

  const renderCharts = () => {
    return Object.keys(scheduledReportsResponse.chartData).map((commandName) => {
      const data = scheduledReportsResponse.chartData[commandName];
      const graphData = {
        series: data.series,
        options: {scheduledReportsResponse,
          chart: {
            type: 'pie',
          },
          labels: data.labels,
          legend: {
            position: 'right',
            labels: {
              colors: ['#333'],
              useSeriesColors: false,
            },
          },
          dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(0)}%`,
            style: {
              fontSize: '14px',
            },
          },
          colors: ['#0A3690', '#FF5A5A', '#FFC32E', '#00C4B4', '#9966FF', '#FF9F40'],
        } as ApexOptions,
      };

      return (
        <div key={commandName} className="flex-1 bg-white shadow-md rounded-lg p-8 m-4">
          <Graph data={graphData} title={commandName} type="pie" />
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
      {renderCharts()}
    </div>
  );
};

export default GraphComponent;
