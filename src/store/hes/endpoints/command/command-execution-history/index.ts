import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { BatchCommandHistoryResponse } from '../../../types';

export const commandExecutionEndpoints = (
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
  getBatchCommandExecutionHistory: builder.query<
    BatchCommandHistoryResponse,
    { searchParams: string }
  >({
    query: ({ searchParams }) => ({
      url: `/command-execution/batch-execution-history${searchParams}`,
      method: 'GET'
    })
  })
});
