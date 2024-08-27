import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery, HES_TAG_TYPES } from "../utils";


const hesApi = createApi({
  reducerPath: "hesApi",
  baseQuery: customBaseQuery(`/${import.meta.env.VITE_API_VERSION}/`),
  tagTypes: HES_TAG_TYPES,
  endpoints: (builder) => ({
    
  }),
});

export const { 
  usePrefetch 
} = hesApi;

export default hesApi;
