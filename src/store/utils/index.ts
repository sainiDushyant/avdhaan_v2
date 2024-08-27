import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const CACHING_TIME = 5 * 60 * 1000;

// Define custom baseQuery function with configuration
export const customBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl: 
      import.meta.env.VITE_BASE_URL  
      // ""
      + baseUrl,
    credentials: "same-origin",
    prepareHeaders(headers) {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  });
};


export const HES_TAG_TYPES = [
];
