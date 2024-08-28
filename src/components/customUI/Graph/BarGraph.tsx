import React from 'react';
import Chart from 'react-apexcharts';

// type BarGraphProps = {
//   data: number[{title:string}]; // Adjust this type based on the actual structure of your data
// };

const BarGraph = ({ data }:any) => {
    

  return (
    <Chart options={data.options} series={data.series} type="bar" width={1000} height={320} />
  );
};

export default BarGraph;
