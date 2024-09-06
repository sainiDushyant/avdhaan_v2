import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import {
  APIResponse,
  TransformedResponse
} from '@/store/hes/types/records/meter-profile/instantaneousProfile';
import { formatDate } from '@/lib/utils';

export const InstantaneousProfileEndpoints = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      NonNullable<unknown>,
      FetchBaseQueryMeta
    >,
    string,
    'hesApi'
  >
) => ({
  getProfileInstantData: builder.query<TransformedResponse, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `/push-data/profile-instant${searchQuery}`,
      method: 'GET'
    }),
    transformResponse: (response: APIResponse): TransformedResponse => {
      let records: any[] = [];
      if (response.data.records && response.data.records.length) {
        response.data.records.map((item) => {
          records.push({
            meter_number: item.device_identifier,
            date: formatDate(item.data_timestamp, 'DD-MM-YYYY'),
            time: formatDate(item.data_timestamp, 'HH:mm'),
            MD_W: item.data.MD_W,
            MD_VA: item.data.MD_VA,
            PF: item.data.PF,
            export_Wh: item.data.export_Wh,
            export_VAh: item.data.export_VAh,
            MD_W_datetime: item.data.MD_W_datetime,
            MD_VA_datetime: item.data.MD_VA_datetime
          });
        });
      }
      return {
        records: records,
        cursor: response.data.cursor
      };
    }
  })
});
