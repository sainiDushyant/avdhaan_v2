import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { MeterProfileDataTableNewResponse, MeterProfileDataTableOgResponse } from '../../types';

export const InstantaneousProfileEndpoints = (
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
  getProfileInstantData: builder.query<MeterProfileDataTableNewResponse, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `/push-data/profile-instant${searchQuery}`,
      method: 'GET'
    }),
    transformResponse: (response: MeterProfileDataTableOgResponse): MeterProfileDataTableNewResponse => {
      const records = !response.data.records ? [] : response.data.records.map(record => {
        const { data, ...rest } = record
        return { ...rest, ...data }
      })
      return {
        ...response,
        data: {
          ...response.data,
          records: records
        }
      }
    }
  })
});
