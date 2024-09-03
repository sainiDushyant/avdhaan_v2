import { DeviceMetaInfoMetricsRecord } from "./records/dashboard";
import { DeviceInfoRecord, LocationHierarchyRecord } from "./records/device-management";

export type ResponseBase<T> = {
  data: {
    records: T extends null ? null : T[];
    count: number;
    cursor: {
      after: string | null;
      before: string | null;
    };
  };
};

export type ResponseBaseWithOutPagination<T> = {
  data: { 
    records: T[]; 
    count: number; 
  };
};

export type DeviceMetaInfoMetricsResponse = ResponseBaseWithOutPagination<DeviceMetaInfoMetricsRecord>;
export type LocationHierarchyResponse = ResponseBaseWithOutPagination<LocationHierarchyRecord>;
export type DeviceInfoResponse = ResponseBaseWithOutPagination<DeviceInfoRecord>;

export interface CustomAPIError {
  description?: string;
  // Define other properties if needed
}