import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { SummaryAPIResponse, SummaryResponse } from "../types";

export const summaryEndPoints = (
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
  getGeneralSummaryData: builder.query<SummaryResponse, { pathname: string; searchQuery: string }>({
    query: ({ pathname, searchQuery }) => ({
      url: `/summary/${pathname}_summary${searchQuery}`,
      method: "GET",
    }),
    transformResponse: (response: SummaryAPIResponse): SummaryResponse => {
      const table = (
        response.table_summary.validated_summary_table ||
        response.table_summary.estimated_summary_table ||
        response.table_summary.editing_summary_table
      );
      return { ...response, table };
    },
  }),
});
