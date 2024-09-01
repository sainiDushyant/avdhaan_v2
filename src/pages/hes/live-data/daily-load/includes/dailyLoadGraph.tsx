import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import Spinner from "@/components/customUI/Loaders/Spinner";
import BarGraph from '@/components/customUI/Graph/BarGraph';
import { ApexOptions } from 'apexcharts';
import { useGetLiveDataMetricsQuery } from '@/store/hes/hesApi';
import moment from 'moment';
import '@/styles/tooltip.css'

// Function to prepare chart data
const prepareChartData = (data: any) => {
  const transformDataForChart = (data: any[]) => {
    // Sort the data array by the data_timestamp in ascending order
    const sortedData = [...data].sort((a, b) => new Date(a.data_timestamp).getTime() - new Date(b.data_timestamp).getTime());
  
    return {
      dates: sortedData.map(item => moment(item.data_timestamp).format('D MMMM')),
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

const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar:{
        show:false
      }
    },
    markers:{
      shape:'circle',
      size:5
    },
    grid: {
      show: true, // Show grid lines for both x and y axes
      xaxis: {
        lines: {
          show: true // Show grid lines on the x-axis
        }
      },
      yaxis: {
        lines: {
          show:true // Show grid lines on the y-axis
        }
      }
    },
    yaxis:{
      tooltip:{
        enabled:false,
      }
    },
    xaxis: {
      tickPlacement:'on',
      tooltip:{
        enabled:false
      },
      categories: collectedDataTransformed.dates,
      type: 'category', // Changed from 'datetime' to 'category' because we are using formatted time strings
      labels: {
        style: {
          fontSize: '12px',
          colors: '#6c757d'
        }
      }
    },
    stroke:{
      curve:'smooth',
      width:2
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    },
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        return '<div class="arrow_box">' +
          '<span>' + `${series[seriesIndex][dataPointIndex]}%` + '</span>' +
          '</div>'
      }
    },
   
     
  };


  return { series, options };
};

const DailyLoadGraph = () => {
  const [searchParams] = useSearchParams();
  const trail = searchParams.get('trail') || '7';

  const { data, isFetching, isError, error } = useGetLiveDataMetricsQuery({ searchQuery: `?trail=${trail}` });

  const [chartData, setChartData] = useState<{ series: any; options: ApexOptions } | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      let token: string | null = localStorage.getItem('token');

      if (token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.log("Token is expired, fetching a new one...");
          token = await getNewToken();
        }
      } else {
        token = await getNewToken();
      }

      if (token) {
        console.log("Token is valid or newly fetched");
      }
    };

    const getNewToken = async (): Promise<string | null> => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/auth/token`, {
          method: 'POST',
          body: JSON.stringify({
            "authID": "bdf234d4-e1bb-4df3-a27e-433d596b808c"
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        });

        const data = await response.json();

        if (data) {
          const newToken = data?.data?.records[0]?.token;
          localStorage.setItem('token', newToken);
          return newToken;
        } else {
          console.error("Failed to get the new token");
          return null;
        }
      } catch (error) {
        console.error("Error fetching new token:", error);
        return null;
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (data) {
      const transformedData = prepareChartData(data[0].dailyLoadMetrics);
      setChartData(transformedData);
    }
  }, [data]);

  if (isFetching) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />;
  if (!data) return <EmptyScreen title="No data found" />;

  return (
    <div className="px-2 w-full">
      <div className="flex justify-center items-center">
        {isFetching ? (
          <div className='h-[70vh] flex items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <div className="px-5 py-3 w-full">
          <div className="flex relative flex-col md:flex-row mt-8">
              
              <div className="flex-1 overflow-x-scroll">
                <div>
                  {chartData && <div className='p-5 rounded-lg bg-white h-[70vh] graph-border'><BarGraph title={'Day Range'} data={chartData} /></div>}
                  </div>
              </div>
          </div>
      </div>
          
        )}
      </div>
    </div>
  );
};

export default DailyLoadGraph;
