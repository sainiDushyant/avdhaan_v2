import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery, HES_TAG_TYPES } from "../utils";
import { dashboardEndpoints } from "./endpoints/dashboard";
import { supplementaryEndpoints } from "./endpoints/supplementary";

const hesApi = createApi({
  reducerPath: "hesApi",
  baseQuery: customBaseQuery({
    baseUrl: `${import.meta.env.VITE_HES_BASE_URL}/${import.meta.env.VITE_HES_API_VERSION}/`,
    credentials: 'same-origin',
    setHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", import.meta.env.VITE_HES_AUTH_TOKEN );
      return headers;
    }
  }),
  tagTypes: HES_TAG_TYPES,
  endpoints: (builder) => ({
    ...dashboardEndpoints(builder),
    ...supplementaryEndpoints(builder),
  }),
});

export const { 
  useLazyGetFilterOptionsQuery,
  useGetDeviceMetaInfoMetricsQuery,
  usePrefetch 
} = hesApi;

export default hesApi;
