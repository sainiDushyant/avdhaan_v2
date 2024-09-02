import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { DeviceMetaInfoMetricsResponse } from "../types";
import { CACHING_TIME } from "@/store/utils";

export const dashboardEndpoints = (
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
    getDeviceMetaInfoMetrics: builder.query<DeviceMetaInfoMetricsResponse, void>({
        query: () => ({
          url: `device-management/device-meta-info-metrics`,
          method: "GET",
        }),
        providesTags: [],
        keepUnusedDataFor: CACHING_TIME,
    }),
});
