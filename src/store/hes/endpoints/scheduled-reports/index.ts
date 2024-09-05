import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { ScheduledReportsResponse, ChartData, FlattenedCommandRecord } from "@/store/hes/types/records/reports"; 
import { CACHING_TIME } from "@/store/utils";
import { transformDataForChart } from "@/store/utils/transformData"; 

export const scheduledReportsEndpoints = (
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
  getScheduledReports: builder.query<{ chartData: ChartData; transformedRecords: FlattenedCommandRecord[] }, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `command-execution/scheduled-command-execution-history${searchQuery}`,
      method: "GET",
    }),
    transformResponse: (response: ScheduledReportsResponse) => {
      if (!response.data.records) return { chartData: {}, transformedRecords: [] };

      const chartData = transformDataForChart(response.data);
      const transformedRecords = response.data.records.map(record => ({
        commandName: record.commandName,
        executionStartTime: record.executionStartTime,
        totalCommands: record.totalCommands,
        totalMeters: record.totalMeters,
        initiateCount: record.statusBreakup.INITIATE.count,
        initiatePercentage: record.statusBreakup.INITIATE.percentage,
        inProgressCount: record.statusBreakup.IN_PROGRESS.count,
        inProgressPercentage: record.statusBreakup.IN_PROGRESS.percentage,
        pendingCount: record.statusBreakup.PENDING.count,
        pendingPercentage: record.statusBreakup.PENDING.percentage,
        successCount: record.statusBreakup.SUCCESS.count,
        successPercentage: record.statusBreakup.SUCCESS.percentage,
        failedCount: record.statusBreakup.FAILED.count,
        failedPercentage: record.statusBreakup.FAILED.percentage,
        successAfterTimeoutCount: record.statusBreakup.SUCCESS_AFTER_TIMEOUT?.count || 0,
        successAfterTimeoutPercentage: record.statusBreakup.SUCCESS_AFTER_TIMEOUT?.percentage || 0,
        partialSuccessCount: record.statusBreakup.PARTIAL_SUCCESS?.count || 0,
        partialSuccessPercentage: record.statusBreakup.PARTIAL_SUCCESS?.percentage || 0,
        partialSuccessAfterTimeoutCount: record.statusBreakup.PARTIAL_SUCCESS_AFTER_TIMEOUT?.count || 0,
        partialSuccessAfterTimeoutPercentage: record.statusBreakup.PARTIAL_SUCCESS_AFTER_TIMEOUT?.percentage || 0,
      }));

      return { chartData, transformedRecords };
    },
    providesTags: [],
    keepUnusedDataFor: CACHING_TIME,
  }),
});
