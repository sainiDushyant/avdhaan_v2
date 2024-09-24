import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import {
  DeviceInfoResponse,
  DeviceMetaInfoMetricsResponse,
  DeviceSubCategoryResponse,
  LocationHierarchyResponse
} from '../../types';
import {
  DeviceMetaInfoMetricsRecord,
  DeviceSubCategoryRecord,
  LocationHierarchyRecord
} from '../../types/records/device-management';

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
    'hesApi'
  >
) => ({
  getLocationHierarchy: builder.query<LocationHierarchyRecord,{ searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `device-management/location-hierarchy-list?${searchQuery}`,
      method: 'GET'
    }),
    transformResponse: (response: LocationHierarchyResponse): LocationHierarchyRecord => {
      const records = response.data.records;
      return records[0];
    }
  }),
  getDeviceIdentifier: builder.query<LocationHierarchyRecord, { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `device-management/device-info?${searchQuery}`,
      method: 'GET'
    }),
    transformResponse: (response: DeviceInfoResponse): LocationHierarchyRecord => {
      const deviceIdentifiers = response.data.records.map((record) => ({
        label: record.deviceIdentifier,
        value: record.deviceIdentifier
      }));

      return { device_identifier: deviceIdentifiers };
    }
  }),
  getDeviceMetaInfoMetrics: builder.query<DeviceMetaInfoMetricsRecord[], { searchQuery: string }>({
    query: ({ searchQuery }) => ({
      url: `device-management/device-meta-info-metrics${searchQuery}`,
      method: 'GET'
    }),
    transformResponse: (response: DeviceMetaInfoMetricsResponse): DeviceMetaInfoMetricsRecord[] => {
      return response.data.records || [];
    }
  }),
  getDeviceSubCategory: builder.query<DeviceSubCategoryRecord[], void>({
    query: () => ({
      url: `device-management/device-sub-category-list`,
      method: 'GET'
    }),
    transformResponse: (response: DeviceSubCategoryResponse): DeviceSubCategoryRecord[] => {
      return response.data.records || [];
    }
  })
});
