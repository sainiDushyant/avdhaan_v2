import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { RestorationOccuranceMetricsRecord } from '../../types/records/alarms';
import { RestorationOccuranceMetricsResponse } from '../../types';

export const alarmsEndPoints = (
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
  getRestorationOccuranceMetrics: builder.query<
    RestorationOccuranceMetricsRecord[],
    { searchQuery: string }
  >({
    query: ({ searchQuery }) => ({
      url: `push-data/pull-events/restoration-occurence-metrics${searchQuery}`
    }),
    transformResponse: (
      response: RestorationOccuranceMetricsResponse
    ): RestorationOccuranceMetricsRecord[] => {
      const data = response.data.records;
      return data;
    }
  })
});
