import React from 'react';
import BarGraph from "../../../../components/customUI/Graph/BarGraph";
import { ChartData } from "../../../../store/hes/types/records/reports";
import { ApexOptions } from 'apexcharts';

type GraphComponentProps = {
  chartData: ChartData;
};

const GraphComponent: React.FC<GraphComponentProps> = ({ chartData }) => {
  const renderCharts = () => {
    return Object.keys(chartData).map((commandName) => {
      const data = chartData[commandName];
      const graphData = {
        series: data.series,
        options: {
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
          <BarGraph data={graphData} title={commandName} type="pie" />
        </div>
      );
    });
  };

  return <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">{renderCharts()}</div>;
};

export default GraphComponent;
