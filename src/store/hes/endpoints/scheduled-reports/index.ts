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
        command_Name: record.commandName,
        date_and_timestamp: record.executionStartTime,
        total_Meters: record.totalMeters,
        success_Percentage: record.statusBreakup.SUCCESS.percentage,
        initiate: record.statusBreakup.INITIATE.count,
        in_Progress: record.statusBreakup.IN_PROGRESS.count,
        pending: record.statusBreakup.PENDING.count,
        success: record.statusBreakup.SUCCESS.count,
        failed: record.statusBreakup.FAILED.count,
        success_After_Timeout: record.statusBreakup.SUCCESS_AFTER_TIMEOUT?.count || 0,
        partial_Success: record.statusBreakup.PARTIAL_SUCCESS?.count || 0,
        partial_Success_After_Timeout: record.statusBreakup.PARTIAL_SUCCESS_AFTER_TIMEOUT?.count || 0,
        progress:record.progress,
      }));

      return { chartData, transformedRecords };
    },
    providesTags: [],
    keepUnusedDataFor: CACHING_TIME,
  }),
});
