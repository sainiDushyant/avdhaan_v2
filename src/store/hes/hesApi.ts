import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery, HES_TAG_TYPES } from "../utils";
import { dashboardEndpoints } from "./endpoints/dashboard";

const hesApi = createApi({
  reducerPath: "hesApi",
  baseQuery: customBaseQuery(`/${import.meta.env.VITE_API_VERSION}/`),
  tagTypes: HES_TAG_TYPES,
  endpoints: (builder) => ({
    ...dashboardEndpoints(builder),
  }),
});

export const { 
  useGetDeviceMetaInfoMetricsQuery,

  usePrefetch 
} = hesApi;

export default hesApi;
