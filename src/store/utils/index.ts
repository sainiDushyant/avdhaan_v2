import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const CACHING_TIME = 5 * 60 * 1000;

type BaseQuery = {
  baseUrl: string, 
  credentials?: RequestCredentials,
  setHeaders?: (headers: Headers) => Headers,
}

// Define custom baseQuery function with configuration
export const customBaseQuery = ({ baseUrl, credentials, setHeaders }: BaseQuery) => {
  return fetchBaseQuery({
    baseUrl:  import.meta.env.VITE_BASE_URL  + baseUrl,
    credentials: credentials || "same-origin",
    prepareHeaders(headers) {
      return setHeaders ? setHeaders(headers) : headers
    },
  });
};


export const HES_TAG_TYPES = [
  
];
export const VEE_TAG_TYPES = [
  "HeadGroups",
  "HeadGroupDetails",
  "RuleGroups",
  "RuleGroupDetails",
  "Rules",
  "EstimationRules"
];
