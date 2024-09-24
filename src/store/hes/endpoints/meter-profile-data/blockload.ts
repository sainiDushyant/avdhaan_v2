import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { MeterProfileDataTableOgResponse, MeterProfileDataTableNewResponse } from "../../types";

export const BlockLoadEndPoints = (
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
    getBlockLoadPushData: builder.query<MeterProfileDataTableNewResponse, { searchQuery: string }>({
        query: ({ searchQuery }) => ({
            url: `/push-data/blockload${searchQuery}`,
            method: "GET"
        }),
        transformResponse: (response: MeterProfileDataTableOgResponse): MeterProfileDataTableNewResponse => {
            const records = !response.data.records ? [] : response.data.records.map(record => {
                const { data, ...rest } = record
                return { ...rest, ...data }
            })
            return {
                ...response,
                data: {
                    ...response.data,
                    records: records
                }
            }
        },
    })
});
