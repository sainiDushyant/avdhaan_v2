import { FC } from 'react';
import Graph from "@/components/customUI/Graph";
import { ApexOptions } from 'apexcharts';
import { ChartData } from '@/store/hes/types/records/reports';

interface GraphComponentProps {
  data: ChartData;
}

const GraphComponent: FC<GraphComponentProps> = ({ data: graphResponseData }) => {

  const renderCharts = () => {
    return Object.keys(graphResponseData).map((commandName) => {
      const data = graphResponseData[commandName];
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
        <div key={commandName} className="bg-white rounded-sm p-3 drop-shadow-sm  ">
          <Graph data={graphData} title={commandName} type="pie" />
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[500px]">
      {renderCharts()}
    </div>
  );
};

export default GraphComponent;
