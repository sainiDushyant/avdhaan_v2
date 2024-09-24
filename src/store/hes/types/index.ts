import { DeviceDetailRecord } from './records/device-information';
import {
  DeviceManagementInfoRecord,
  LocationHierarchyRecord,
  DeviceMetaInfoMetricsRecord,
  DeviceSubCategoryRecord
} from './records/device-management';
import {
  LiveDataMetricsRecord,
  MeterProfileDataTableRecord,
  MeterProfileDataTableRecordTransformed
} from './records/meter-profile-data-metrics';
import {
  BatchCommandHistoryRecord,
  CommandHistoryRecord,
  CommandInfoRecord,
  ExecutionHistoryDetailsRecord,
  ExecutionHistoryDetailsRecordModified
} from './records/command-execution';
import { ScheduledCommandRecord } from './records/reports';
import { ConfigureCommandRecord } from './records/configure-command';
import { HESAuthToken } from './records/login';
import { DownloadCSVRecord } from './records/download-csv';

export type HesAPIError = {
  errorMsg: string;
  errorCode: string;
};

export type ResponseBaseWithOffsetPagination<T> = {
  success: boolean;
  data: {
    records: T extends null ? null : T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
  error: HesAPIError | null;
};

export type ResponseBase<T> = {
  success: boolean;
  data: {
    records: T extends null ? null : T[];
    count: number;
    cursor: {
      after: string | null;
      before: string | null;
    };
  };
  error: HesAPIError | null;
};

export type ResponseBaseWithOutPagination<T> = {
  success: boolean;
  data: {
    records: T extends null ? null : T[];
    count: number;
  };
  error: HesAPIError | null;
};

export type DeviceSubCategoryResponse =
  ResponseBaseWithOutPagination<DeviceSubCategoryRecord>;
export type DeviceMetaInfoMetricsResponse =
  ResponseBaseWithOutPagination<DeviceMetaInfoMetricsRecord>;
export type LocationHierarchyResponse =
  ResponseBaseWithOutPagination<LocationHierarchyRecord>;
export type DeviceInfoResponse =
  ResponseBaseWithOutPagination<DeviceManagementInfoRecord>;
export type LiveDataMetricsResponse =
  ResponseBaseWithOutPagination<LiveDataMetricsRecord>;

export type CommandInfoResponse =
  ResponseBaseWithOutPagination<CommandInfoRecord>;
export type CommandHistoryResponse = ResponseBase<CommandHistoryRecord>;
export type BatchCommandHistoryResponse =
  ResponseBaseWithOffsetPagination<BatchCommandHistoryRecord>;
export type ExecutionHistoryDetailsResponse =
  ResponseBase<ExecutionHistoryDetailsRecord>;
export type ExecutionHistoryDetailsResponseModified =
  ResponseBase<ExecutionHistoryDetailsRecordModified>;

export type MeterProfileDataTableOgResponse =
  ResponseBase<MeterProfileDataTableRecord>;
export type MeterProfileDataTableNewResponse =
  ResponseBase<MeterProfileDataTableRecordTransformed>;

export type ScheduledReportsResponse =
  ResponseBaseWithOutPagination<ScheduledCommandRecord>;

export type DeviceDataResponse = ResponseBase<DeviceManagementInfoRecord>;
export type DeviceDetailResponse = ResponseBase<DeviceDetailRecord>;
export type configureCommandResponse = ResponseBase<ConfigureCommandRecord>;

export interface CustomAPIError {
  description?: string;
  // Define other properties if needed
}
