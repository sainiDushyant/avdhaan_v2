import { LiveDataMetricsRecord } from "./live-data-metrics";
import { DeviceMetaInfoMetricsRecord } from "./records/dashboard";

type ResponseBase<T> = {
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

export type LiveDataMetricsResponse = ResponseBaseWithOutPagination<LiveDataMetricsRecord>;


export interface CustomAPIError {
  description?: string;
  // Define other properties if needed
}