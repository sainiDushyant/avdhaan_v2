import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { APIResponse } from "../../types/dailyLoad";
export const DailyLoadEndPoints = (
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
    getDailyLoadPushData: builder.query<any, { searchQuery: string }>({

        query: ({ searchQuery }) => ({
            url: `/push-data/dailyload${searchQuery}`,
            method: "GET"
        }),
        transformResponse: (response: APIResponse) => {
            let records: any[] = [];
            if (response.data.records && response.data.records.length) {
                response.data.records.map(item => {
                    records.push({
                        meter_number: item.data.ID,
                        datetime: item.data.dailyload_datetime,
                        export_wh: item.data.export_Wh,
                        import_wh: item.data.import_Wh,
                        export_vah: item.data.export_VAh,
                        import_vah: item.data.import_VAh,
                        daily_temperature: item.data.daily_temperature
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
