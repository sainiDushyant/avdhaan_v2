import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { formatDate } from '@/lib/utils';
import { PeriodicPushResponse } from '../../types';
import { FlatenedPeriodicPushRecord } from '../../types/records/periodic-push';

export const PeriodicPushEndpoints = (
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
  getPeriodicPushData: builder.query<
    FlatenedPeriodicPushRecord,
    { searchQuery: string }
  >({
    query: ({ searchQuery }) => ({
      url: `/push-data/periodic-push${searchQuery}`,
      method: 'GET'
    }),
    transformResponse: (
      response: PeriodicPushResponse
    ): FlatenedPeriodicPushRecord => {
      let records: any[] = [];
      response.data.records.map((item) => {
        records.push({
          meter_number: item.device_identifier,
          date: formatDate(item.data_timestamp, 'DD-MM-YYYY'),
          time: formatDate(item.data_timestamp, 'HH:mm'),
          MD_W: item.data.MD_W,
          MD_VA: item.data.MD_VA,
          export_Wh: item.data.export_Wh,
          export_VAh: item.data.export_VAh,
          phase_current: item.data.phase_current,
          push_counter: item.data.push_counter,
          push_obis: item.data.push_obis,
          push_triggered_time: item.data.push_triggered_time
        });
      });
      return {
        records: records,
        cursor: response.data.cursor
      };
    }
  })
});
