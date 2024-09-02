import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { SummaryGraphAPIResponse, SummaryListView, SummaryTableAPIResponse } from "../types";
import { FilterPayload } from "../types/other";

export const summaryDetailsEndPoints = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      NonNullable<unknown>,
      FetchBaseQueryMeta
    >,
    string,
    "veeApi"
  >
) => ({
  getSummaryGraphDetails: builder.query<SummaryGraphAPIResponse, { pathname: string; searchQuery: string }>({
    query: ({ pathname, searchQuery }) => ({
      url: `/summary/${pathname}_summary/graph_details${searchQuery}`,
      method: "GET",
    }),
  }),
  getSummaryTableDetails: builder.query<SummaryListView, { pathname: string; params: FilterPayload }>({
    query: ({ pathname, params }) => ({
      url: `/summary/${pathname}_summary/list_details`,
      method: "GET",
      params
    }),
    transformResponse: (response: SummaryTableAPIResponse): SummaryListView => {
      const { validated_data_stats, estimated_data_stats, ...rest } = response
      const table = validated_data_stats || estimated_data_stats || [];
      return {
        table, 
        ...rest
      }
    },
  }),
});
