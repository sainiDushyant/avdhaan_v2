import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { APIResponse } from '@/store/hes/types/monthlyBilling';
export const MonthlyBillingEndPoints = (
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
    getMonthlyBillingData: builder.query<any, { searchQuery: string }>({

        query: ({ searchQuery }) => ({
            url: `/push-data/billing${searchQuery}`,
            method: "GET"
        }),
        transformResponse: (response: APIResponse) => {
            let records: any[] = [];
            if (response.data.records && response.data.records.length) {
                response.data.records.map(item => {
                    records.push({
                        meter_number: item.device_id,
                        date: item.data_timestamp,
                        time: item.data_timestamp,
                        MD_W: item.data.MD_W,
                        MD_VA: item.data.MD_VA,
                        avg_PF: item.data.avg_PF,
                        export_Wh: item.data.export_Wh,
                        export_VAh: item.data.export_VAh,
                        MD_W_datetime: item.data.MD_W_datetime,
                        MD_VA_datetime: item.data.MD_VA_datetime,
                        cumm_import_VAh: item.data.cumm_import_VAh,
                        cumm_import_Wh: item.data.cumm_import_Wh,
                        billing_datetime: item.data.billing_datetime
                    })
                })
            }
            return {
                records: records,
                cursor: response.data.cursor,
            }
        },
    })
});
