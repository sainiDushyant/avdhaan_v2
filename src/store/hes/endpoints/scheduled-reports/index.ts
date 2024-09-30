import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { transformDataForChart } from "@/store/utils/transformData"; 
import { ScheduledReportsResponse } from "../../types";
import { 
  StatusBreakup, StatusBreakupNum, 
  StatusDetail, TransformedScheduledCommandRecord 
} from "@/store/hes/types/records/reports"; 

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
  getScheduledReports: builder.query<TransformedScheduledCommandRecord, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `command-execution/scheduled-command-execution-history${searchQuery}`,
      method: "GET",
    }),
    transformResponse: (response: ScheduledReportsResponse): TransformedScheduledCommandRecord => {
      if (!response.data.records) return { chartData: {}, records: [] };
      const chartData = transformDataForChart(response.data);
      const records = response.data.records.map(record => {
        const {  statusBreakup, ...rest } = record;
        const statusData: StatusBreakupNum = {}
        Object.keys(statusBreakup).forEach(key => {
          const statusKey =  key as keyof StatusBreakup;
          const item = statusBreakup[statusKey] as StatusDetail;
          statusData[statusKey] = item.count;
        });
        return {
          ...rest,
          ...statusData
        }
      });
      return { chartData, records };
    },
  }),
});
