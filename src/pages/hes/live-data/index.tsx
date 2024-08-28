import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import Spinner from "@/components/customUI/Loaders/Spinner";
import BarGraph from '@/components/customUI/Graph/BarGraph';
import { ApexOptions } from 'apexcharts';


import { useGetLiveDataMetricsQuery } from '@/store/hes/hesApi';

const LiveData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract the search query from the URL
  const trail = searchParams.get('trail') || '7';
  
  const { data, isFetching, isError, error } = useGetLiveDataMetricsQuery({ searchQuery: `?trail=${trail}` });

  useEffect(() => {
    const fetchToken = async () => {
      let token: string | null = localStorage.getItem('token');

      if (token) {
        // Decode the token to check its expiration time
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
          console.log("Token is expired, fetching a new one...");
          token = await getNewToken();
        }
      } else {
        // If no token exists, fetch a new one
        token = await getNewToken();
      }

      if (token) {
        console.log("Token is valid or newly fetched");
        // You can now use this token for your requests
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
            // Add any other necessary headers here
          },
          credentials: 'same-origin',
        });

        const data = await response.json();

        // Store the new token in local storage
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

  
  type RecordData = {
    key: string;
    title: string;
    value: number;
    color: string;
    count: number;
  };
  
  type Record = {
    data: RecordData[];
    title: string;
    data_timestamp: string;
  };
  
  type BarGraphProps = {
    data: Record[];
  };
  
  const convertToChartData = (records: Record[]): { options: ApexOptions; series: ApexAxisChartSeries } => {
    const categories = records.map(record => record.data_timestamp);
  
    const collectedCountData = records.map(record => {
      const collected = record.data.find(item => item.key === 'collectedCount');
      return collected ? { value: collected.value, color: collected.color } : { value: 0, color: '' };
    });
  
    const missedCountData = records.map(record => {
      const missed = record.data.find(item => item.key === 'missedCount');
      return missed ? { value: missed.value, color: missed.color } : { value: 0, color: '' };
    });
  
    const collectedColor = collectedCountData.length > 0 ? collectedCountData[0].color : '';
    const missedColor = missedCountData.length > 0 ? missedCountData[0].color : '';
  
    return {
      options: {
        chart: {
          id: 'block-load-metrics',
          type: 'bar',
        },
        xaxis: {
          categories, // Use timestamps as categories
        },
          colors: ["#0A3690", "#B9CDF4"], // Add the colors here
        plotOptions: {
          bar: {
            columnWidth: '50%', // Controls the width of the bars, effectively adding gaps
            distributed: false, // Set to true if each bar should have its own color (useful for different bar colors per category)
           
          },
        },
      },
      series: [
        {
          name: 'Collected Count',
          data: collectedCountData.map(item => item.value),
          
        },
        {
          name: 'Missed Count',
          data: missedCountData.map(item => item.value),
          
        },
      ],
    };
  };



  if (isFetching) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />;
  if (!data) return <EmptyScreen title="No data found" />;

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex justify-center items-center">
        {isFetching ? (
          <div className='h-[70vh] flex items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <div className='h-[70vh]'><BarGraph data={convertToChartData(data)}/></div>
        )}
      </div>
    </div>
  );
};

export default LiveData;
