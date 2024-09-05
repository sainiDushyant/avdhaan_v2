import { GraphData } from "@/store/hes/types/other";
import { ApexOptions } from "apexcharts";

export const prepareDashboardChart = (graphObj: GraphData) => {
    const commonOptions: ApexOptions = {
      labels: graphObj.map(item => item.name),
      title: {
        style: {
          fontFamily: "Satoshi"
        }
      },
      chart: {
        width: '100%',
        type: 'pie',
      },
      legend: {
        position: "bottom",
        horizontalAlign: "left"
      },
      tooltip: {
        enabled: true,
        custom: ({series, seriesIndex, dataPointIndex, w}) => {
          const currentVal = `${graphObj[seriesIndex].name}: ${graphObj[seriesIndex].count}`
          return (
            '<div style="min-width: 4px; height: 30px; padding:0 5px;">' +
              "<span>" + currentVal + "</span>" +
            "</div>"
          );
        }
      },
      responsive: [{
        breakpoint: 658,
        options: {
          chart: {
            width: 250,
            height: 250
          },
        }
      }]
    };
    return {
      series: graphObj.map(item => item.percentage), 
      options: commonOptions
    }
  }