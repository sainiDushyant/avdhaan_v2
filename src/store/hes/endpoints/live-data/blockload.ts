import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { APIResponse, TransformedResponse } from '@/store/hes/types/blockLoad';
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
    getBlockLoadPushData: builder.query<TransformedResponse, { searchQuery: string }>({

        query: ({ searchQuery }) => ({
            url: `/push-data/blockload${searchQuery}`,
            method: "GET"
        }),
        transformResponse: (response: APIResponse) => {
            let records: any = [];
            if (response.data.records && response.data.records.length) {
                response.data.records.forEach(item => {
                    records.push({
                        meter_number: item.device_identifier,
                        datetime: item.data.blockload_datetime,
                        export_wh: item.data.export_Wh,
                        import_wh: item.data.import_Wh,
                        export_vah: item.data.export_VAh,
                        import_vah: item.data.import_VAh,
                        avg_current: item.data.avg_current,
                        avg_voltage: item.data.avg_voltage,
                        temperature: item.data.temperature,
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
