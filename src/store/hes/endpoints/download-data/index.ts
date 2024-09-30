import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { DownloadCSVResponse } from '../../types';
import { DownloadCSVRecord } from '../../types/records/download-csv';

type Params = {
  type: string;
  rest: string;
};

export const downloadDataEndpoints = (
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
  downloadCSVData: builder.query<DownloadCSVRecord, { params: Params }>({
    query: ({ params: { type, rest } }) => ({
      url: `/push-data/download-report?data_type=${type}&${rest}`
    }),
    transformResponse: (response: DownloadCSVResponse): DownloadCSVRecord => {
      const url = response?.data?.records[0]?.url;
      return {
        url
      };
    }
  })
});
