import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { DeviceInfoResponse, DeviceMetaInfoMetricsResponse, LocationHierarchyResponse } from "../../types";
import { LocationHierarchyRecord } from "../../types/records/device-management";
import { CACHING_TIME } from "@/store/utils";

export const deviceManagementEndpoints = (
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
    getLocationHierarchy: builder.query<LocationHierarchyRecord, string>({
      query: (params) => ({
        url: `device-management/location-hierarchy-list?${params}`,
        method: "GET",
      }),
      transformResponse: (response: LocationHierarchyResponse): LocationHierarchyRecord => {
        const records = response.data.records;
        return records[0];
      },
    }),
    //device-management/device-info
    getDeviceIdentifier: builder.query<LocationHierarchyRecord, string>({
      query: (params) => ({
        url: `device-management/device-info?${params}`,
        method: "GET",
      }),
      transformResponse: (response: DeviceInfoResponse): LocationHierarchyRecord => {
        const deviceIdentifiers = response.data.records.map(record => ({ 
          label: record.deviceIdentifier, 
          value: record.deviceIdentifier
        }));

        return { device_identifier: deviceIdentifiers };
      },
    }),
    getDeviceMetaInfoMetrics: builder.query<DeviceMetaInfoMetricsResponse, void>({
      query: () => ({
        url: `device-management/device-meta-info-metrics`,
        method: "GET",
      }),
      providesTags: [],
      keepUnusedDataFor: CACHING_TIME,
  }),
});
