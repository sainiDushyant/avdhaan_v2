import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { BlockLoadEndPoints } from './blockload';
import { DailyLoadEndPoints } from './dailyload';
import { MonthlyBillingEndPoints } from './monthlyBilling';
import { LiveDataMetricsResponse } from '../../types';
import { ModifiedLiveDataRecord } from '../../types/meter-profile-data-metrics';
import { InstantaneousProfileEndpoints } from './instantaneousProfile';

export const meterProfileData = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      NonNullable<unknown>,
      FetchBaseQueryMeta
    >,
    string,
    'hesApi'
  >
) => ({
  getLiveDataMetrics: builder.query<
    ModifiedLiveDataRecord,
    { searchQuery: string }
  >({
    query: ({ searchQuery }) => ({
      url: `/push-data/metrics${searchQuery}`,
      method: 'GET'
    }),
    transformResponse: (
      response: LiveDataMetricsResponse
    ): ModifiedLiveDataRecord => {
      const data = response.data.records.map((ele) => {
        return {
          billingMetrics: {
            data1: ele.billingMetrics.collectedData,
            data2: ele.billingMetrics.missedData
          },
          blockLoadMetrics: {
            data1: ele.blockLoadMetrics.collectedData,
            data2: ele.blockLoadMetrics.missedData
          },
          dailyLoadMetrics: {
            data1: ele.dailyLoadMetrics.collectedData,
            data2: ele.dailyLoadMetrics.missedData
          },
          blockLoadDailyMetrics: {
            data1: ele.blockLoadDailyMetrics.collectedData,
            data2: ele.blockLoadDailyMetrics.missedData
          },
          profileInstantMetrics: {
            data1: ele.profileInstantMetrics.collectedData,
            data2: ele.profileInstantMetrics.missedData
          }
        };
      });
      return data[0];
    }
  }),
  ...BlockLoadEndPoints(builder),
  ...DailyLoadEndPoints(builder),
  ...MonthlyBillingEndPoints(builder),
  ...InstantaneousProfileEndpoints(builder)
});
