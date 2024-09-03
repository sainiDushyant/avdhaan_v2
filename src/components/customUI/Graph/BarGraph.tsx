import { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';

interface GraphType {
  series: ApexAxisChartSeries; // or any other specific type depending on your data
  options: ApexCharts.ApexOptions; // or a custom type if you have one
}

interface BarGraphProps {
  data: GraphType;
  title:string;
  type?:any
}

const BarGraph: React.FC<BarGraphProps> = ({ data,title,type }) => {
  return (
    <div className="w-full max-w-full mx-auto sm:h-64 md:h-72 lg:h-96 xl:h-96 lg:w-5/6 xl:w-full">
      <div style={{
        color:'#0A3690'
      }} className='font-bold mb-2'>{title&&title}</div>
      <div className='w-full h-0 border border-1'></div>
      <Chart 
        options={data.options} 
        series={data.series} 
        type={type&&type || 'line'}
        width="100%" 
        height="100%" 
      />
    </div>
  );
};

export default BarGraph;
