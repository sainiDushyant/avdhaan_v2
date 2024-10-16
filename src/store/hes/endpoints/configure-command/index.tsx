import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { configureCommandResponse } from "../../types";
import { CACHING_TIME } from "@/store/utils";
import { UpdateCommandPayload } from "../../types/records/configure-command";

export const configureCommandEndpoints = (
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
    getConfigureCommandInfo: builder.query<configureCommandResponse, { searchQuery: string }>({
        query: ({ searchQuery }) => ({
            url: `/command-execution/command-info${searchQuery}`,
            method: "GET",
        }),
        providesTags: ["Configure Command"],
        keepUnusedDataFor: CACHING_TIME,
    }),
    updateCommandInfo: builder.mutation<void, UpdateCommandPayload>({
        query: (data) => ({
            url: `/command-execution/command-info`,
            method: "PUT",
            body: data,
        }),
        invalidatesTags: ["Configure Command"],
    }),
});
