import { FC, useCallback } from 'react';
import Graph from "@/components/customUI/Graph";
import { ApexOptions } from 'apexcharts';
import { ChartData } from '@/store/hes/types/records/reports';
import EmptyScreen from '@/components/customUI/EmptyScreen';

interface GraphComponentProps {
  data: ChartData;
}

const GraphComponent: FC<GraphComponentProps> = ({ data: graphResponseData }) => {

  const renderCharts = useCallback(() => {
    return Object.keys(graphResponseData).map((commandName) => {
      const data = graphResponseData[commandName];
      const graphData = {
        series: data.series,
        options: {
          chart: {
            type: 'pie',
            width: '100%',
            height: 350,
          },
          labels: data.labels,
          legend: {
            position: 'bottom',
            horizontalAlign: 'left',
          },
          dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(1)}%`,
            style: {
              fontSize: '12px',
            },
            minAngleToShowLabel: 0,
          },
          responsive: [{
            breakpoint: 658,
            options: {
              chart: {
                width: 250,
                height: 250
              },
            }
          }],
          colors: ['#0A3690', '#FF5A5A', '#FFC32E', '#00C4B4', '#9966FF', '#FF9F40'],
        } as ApexOptions
      };

      return (
        <div key={commandName} className="bg-white rounded-sm p-3 drop-shadow-sm max-w-full h-auto ">
          <Graph data={graphData} title={commandName} type="pie" />
        </div>
      );
    });
  }, [ graphResponseData ]);

  if(!graphResponseData || 
    !Object.keys(graphResponseData).length 
  ) return <EmptyScreen title={`scheduled reads not available`} />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {renderCharts()}
    </div>
  );
};

export default GraphComponent;
