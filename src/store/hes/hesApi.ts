import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery, HES_TAG_TYPES } from "../utils";
import { deviceManagementEndpoints } from "./endpoints/device-management";
import { liveDataEndPoints } from "./endpoints/live-data";

const hesApi = createApi({
  reducerPath: "hesApi",
  baseQuery: customBaseQuery({
    baseUrl: `${import.meta.env.VITE_HES_BASE_URL}/${import.meta.env.VITE_HES_API_VERSION}/`,
    credentials: 'same-origin',
    setHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", import.meta.env.VITE_HES_AUTH_TOKEN || localStorage.getItem('token') );
      return headers;
    }
  }),
  tagTypes: HES_TAG_TYPES,
  endpoints: (builder) => ({
    ...deviceManagementEndpoints(builder),
    ...liveDataEndPoints(builder)
  }),
});

export const { 
  useLazyGetLocationHierarchyQuery,
  useLazyGetDeviceIdentifierQuery,
  useGetDeviceMetaInfoMetricsQuery,
  useGetLiveDataMetricsQuery,
  useGetBlockLoadPushDataQuery,
  useGetDailyLoadPushDataQuery,
  useGetMonthlyBillingDataQuery, 
  usePrefetch 
} = hesApi;

export default hesApi;
