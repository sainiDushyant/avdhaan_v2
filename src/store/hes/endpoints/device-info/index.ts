import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { CACHING_TIME } from "@/store/utils";
import { DeviceDetailResponse } from "../../types";
import { UpdateDevicePayload } from "../../types/records/device-information";

export const deviceInfoEndpoints = (
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
  getDeviceInfo: builder.query<DeviceDetailResponse, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `device-management/device-info${searchQuery}`,
      method: "GET",
    }),
    providesTags: ["Device"],
    keepUnusedDataFor: CACHING_TIME,
  }),

  updateDeviceInfo: builder.mutation<void, UpdateDevicePayload>({
    query: (data) => ({
      url: `device-management/update-device`,
      method: "PUT",
      body: data,
    }),
    invalidatesTags: ["Device"],
  }),
});
