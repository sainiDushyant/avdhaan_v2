import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const CACHING_TIME = 5 * 60 * 1000;

type BaseQuery = {
  baseUrl: string;
  credentials?: RequestCredentials;
  setHeaders?: (headers: Headers, endpoint: { endpoint: string }) => Headers;
};

// Define custom baseQuery function with configuration
export const customBaseQuery = ({
  baseUrl,
  credentials,
  setHeaders
}: BaseQuery) => {
  return fetchBaseQuery({
    baseUrl,
    credentials: credentials || 'same-origin',
    prepareHeaders(headers, { endpoint }) {
      return setHeaders ? setHeaders(headers, { endpoint }) : headers;
    }
  });
};

export const HES_TAG_TYPES = [];
export const VEE_TAG_TYPES = [
  'HeadGroups',
  'HeadGroupDetails',
  'RuleGroups',
  'RuleGroupDetails',
  'Rules',
  'EstimationRules'
];
