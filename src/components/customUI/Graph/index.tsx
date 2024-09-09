import React from 'react';
import Chart from 'react-apexcharts';

interface GraphType {
  series: ApexAxisChartSeries | number[]; // or any other specific type depending on your data
  options: ApexCharts.ApexOptions; // or a custom type if you have one
}

interface GraphProps {
  data: GraphType;
  title: string;
  type?:
    | 'area'
    | 'line'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap';
}

const Graph: React.FC<GraphProps> = ({ data, title, type }) => {
  return (
    <div className="w-full max-w-full mx-auto sm:h-64 md:h-72 lg:h-96 xl:h-96 lg:w-5/6 xl:w-full">
      <div style={{ color: '#0A3690' }} className="font-bold mb-2">
        {title}
      </div>
      <div className="w-full h-0 border border-1"></div>
      <Chart
        options={data.options}
        series={type === 'pie' ? (data.series as number[]) : data.series}
        type={(type && type) || 'line'}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Graph;
