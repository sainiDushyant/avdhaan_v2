import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { BlockLoadEndPoints } from "./blockload";
import { DailyLoadEndPoints } from "./dailyload";
import { MonthlyBillingEndPoints } from "./monthlyBilling";
import { LiveDataMetricsResponse } from "../../types";
import { LiveDataMetricsRecord } from "../../types/live-data-metrics";


export const liveDataEndPoints = (
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
  getLiveDataMetrics: builder.query<LiveDataMetricsRecord, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `/push-data/metrics${searchQuery}`,
      method: "GET",
    }),
    transformResponse: (response:LiveDataMetricsResponse):LiveDataMetricsRecord => {
        return response.data.records[0] ;
    },
  }),
  ...BlockLoadEndPoints(builder),...DailyLoadEndPoints(builder),...MonthlyBillingEndPoints(builder)
});
