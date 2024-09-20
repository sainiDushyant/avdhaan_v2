import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { 
  BatchCommandHistoryResponse, CommandHistoryResponse, 
  CommandInfoResponse, ExecutionHistoryDetailsResponse, ExecutionHistoryDetailsResponseModified, ResponseBaseWithOutPagination 
} from "../../types";
import { CommandInfoRecordTransformed, ExecuteCommandPayload } from "../../types/records/command-execution";

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
    "hesApi"
  >
) => ({
    getCommandInfo: builder.query<CommandInfoRecordTransformed[], { name?: string, limit?: number }>({
      query: (searchQuery) => ({
        url: `/command-execution/command-info`,
        method: "GET",
        params: searchQuery
      }),
      transformResponse: (response: CommandInfoResponse): CommandInfoRecordTransformed[] => {
        return response.data.records.map(record => ({ ...record, label: record.name, value: record.name }));
      },
    }),
    getBatchCommandExecutionHistory: builder.query<BatchCommandHistoryResponse, { searchParams: string }>({
      query: ({ searchParams }) => ({
        url: `/command-execution/batch-execution-history${searchParams}`,
        method: "GET",
      }),
    }),
    getCommandExecutionHistory: builder.query<CommandHistoryResponse, { searchParams: string }>({
      query: ({ searchParams }) => ({
        url: `/command-execution/execution-history${searchParams}`,
        method: "GET",
      }),
    }),
    executeCommand: builder.mutation<ResponseBaseWithOutPagination<null>, ExecuteCommandPayload>({
      query: (data) => ({ 
        url: "/command-execution/execute-command", 
        method: "POST", 
        body: data 
      }),
    }),
    getCommandExecutionHistoryDetails: builder.query<ExecutionHistoryDetailsResponseModified, { searchParams: string }>({
      query: ({ searchParams }) => ({
      url: `/command-execution/command-response${searchParams}`,
        method: "GET",
      }),
      transformResponse: (response: ExecutionHistoryDetailsResponse): ExecutionHistoryDetailsResponseModified => {
        const records = response.data.records.map(record => {
          const { 
            execInfoID, pendingStatusReason, 
            response: { executionId, index, responseData } 
          } = record;

          const { cmd_name, payload } = responseData;

          return {
            execInfoID,
            executionId,
            index,
            pendingStatusReason,
            cmd_name,
            payload,
          }
        });
        return {
          ...response,
          data: {
            ...response.data,
            records
          }
        }
      },
    }),
});
