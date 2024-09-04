import moment from "moment";
import { ApexOptions } from "apexcharts";
import { MetricGroup } from "@/store/hes/types/live-data-metrics";
import { HesFilterPayload } from "@/store/hes/types/other";
import { HesFilterRecord, HesFilterStateOptional } from "@/store/hes/types/records/device-management";

export const searchParamsToHesFilters = 
    (urlSearchParams: URLSearchParams): HesFilterRecord => {
    const paramsObject: HesFilterRecord= {};
    for (const [param_key, param_value] of urlSearchParams.entries()) {
        const key = param_key as keyof HesFilterRecord;
        if (paramsObject[key]) {
            const prevVal = paramsObject[key];
            if(key === "device_identifier"){
                paramsObject[key] = [...prevVal, { label: param_value, value: param_value }];
            }else{
                paramsObject[key] = [...prevVal, { label: `${key}: ${param_value}`, value: param_value }];
            }
        } else {
            if(key === "device_identifier"){
                paramsObject[key] = [{ label: param_value, value: param_value }];
            }else{
                paramsObject[key] = [{ label: `${key}: ${param_value}`, value: param_value }];
            }
        }
    }
    return paramsObject;
}

export const hesFiltersStateToObject = 
    (data: HesFilterStateOptional): HesFilterPayload => {
    const newParams: HesFilterPayload = {};
    Object.keys(data).forEach(key => {
        const filterKey = key as keyof HesFilterStateOptional;
        const payloadValue = data[filterKey];
        if(payloadValue && payloadValue.length > 0){
            newParams[filterKey] = payloadValue.map(item => item.value);
        }
    })
    return newParams
}

export const objectToUrlParams = (obj: Record<string, string | string[]>): URLSearchParams => {
    const params = new URLSearchParams();
    
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
        } else {
            params.append(key, value);
        }
    });
    return params;
}

export const prepareChartData = (
  data: MetricGroup, 
  chartType: 'bar' | 'line', 
  parent:'blockload'|'dailyload'|'billing'
) => {

  const transformDataForChart = (data: MetricGroup['collectedData']) => {
    // Sort the data array by the data_timestamp in ascending order
    const sortedData = [...data].sort((a, b) => new Date(a.data_timestamp).getTime() - new Date(b.data_timestamp).getTime());
  
    return {
      dates: sortedData.map(item => 
        chartType === 'bar' ? 
          moment(item.data_timestamp).format('MMM YYYY') : 
          parent ==='dailyload'? 
          moment(item.data_timestamp).format('D MMM'): 
          moment(item.data_timestamp).format('h:mm A')
      ),
      values: sortedData.map(item => item.value)
    };
  };
  
  
  const collectedDataTransformed = transformDataForChart(data.collectedData);
  const missedDataTransformed = transformDataForChart(data.missedData);

  const series = [
    {
      name: "% Reads Fetched",
      data: collectedDataTransformed.values
    },
    {
      name: "% Missed Fetched",
      data: missedDataTransformed.values
    }
  ];

  const commonOptions: ApexOptions = {
    chart: {
      type: chartType,
      height: 350,
      toolbar: {
        show: false
      }
    },
    yaxis: {
      tooltip: {
        enabled: false
      }
    },
    xaxis: {
      tooltip: {
        enabled: false
      },
      categories: collectedDataTransformed.dates,
      labels: {
        style: {
          fontSize: '12px',
          colors: '#6c757d'
        }
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex }) {
        return '<div class="arrow_box">' +
          '<span>' + `${series[seriesIndex][dataPointIndex]}%` + '</span>' +
          '</div>';
      }
    },
  };

  const barSpecificOptions: ApexOptions = {
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      }
    },
    stroke: {
      colors: ["transparent"],
      width: 5
    },
    colors:['#0A3690','#B9CDF4'],
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    dataLabels: {
      enabled: false
    },
  };

  const lineSpecificOptions: ApexOptions = {
    markers: {
      shape: 'circle',
      size: 5
    },
    colors:['#0A3690','#02C9A8'],
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    }
  };

  const options = {
    ...commonOptions,
    ...(chartType === 'bar' ? barSpecificOptions : lineSpecificOptions)
  };

  return { series, options };
};
