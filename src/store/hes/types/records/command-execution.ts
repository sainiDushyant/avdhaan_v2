export interface DateAndTimeParams {
  max: 'today' | 'current_time';
  step?: string;
}

export interface NumberParams {
  allowed_values: number[];
  isMulti: boolean;
}

export interface RangeParams {
  min: string;
  max: string;
  isMulti: boolean;
}

export type CommandInfoParams =
  | DateAndTimeParams
  | NumberParams
  | RangeParams
  | object;

export type CommandInfoArgsType =
  | 'dateTimeRange'
  | 'dateTime'
  | 'dateRange'
  | 'date'
  | 'range'
  | 'number'
  | '';

export interface CommandInfoRecord {
  id: number;
  name: string;
  description: string;
  argsType: CommandInfoArgsType;
  argsMode: string;
  commandType: string;
  retryCount: number;
  timeout: number;
  params: CommandInfoParams;
  priority: string;
}

export interface CommandInfoRecordTransformed extends CommandInfoRecord {
  label: string;
  value: string;
}

export type CommandHistoryQueryParams = {
  after_cursor?: string;
  before_cursor?: string;
  page?: number;
  command_status?: string[];
  command_name?: string;
  device_identifier?: string[];
};

export interface BatchCommandHistoryRecord {
  batchId: string | null;
  createdAt: string;
  updatedAt: string;
  status: string;
  totalMeters: number;
  colorCode: string;
}

export interface CommandHistoryRecord {
  id: number;
  executionId: string;
  executionStatus: string;
  colorCode: string;
  startTime: string;
  updateTime: string;
  commandInfoId: number;
  commandName: string;
  deviceInfoId: number;
  deviceSerial: string;
  deviceIdentifier: string;
  requestId: string;
  commandRetryCount: number;
  commandExecutionMetaDataId: number;
  args: {
    value: {
      to: string;
      from: string;
    };
  };
  createdBy: number;
  updatedBy: string | null;
  batchId: string;
}

export interface ExecuteCommandPayload {
  clientRequestID: string;
  deviceInfo: {
    category: 'Meter';
    identifierType: 'device_identifier';
    identifiers: string[];
  };
  commandInfo: {
    command: string;
    argsType: CommandInfoArgsType;
    argsMode: string;
    deviceCommands: null;
    args: {
      value:
        | {
            from?: string | number;
            to?: string | number;
          }
        | number;
    };
  };
}

export type ExecutionHistoryDetailsRecord = {
  execInfoID: number;
  response: {
    executionId: string;
    index: number;
    responseData: {
      cmd_name: string;
      payload: { [key: string]: string | number };
    } | null;
  };
  pendingStatusReason: {
    executionid: string;
    reason: string;
  } | null;
};

export type ExecutionHistoryDetailsRecordModified = {
  execInfoID: number;
  executionId?: string;
  index?: number;
  cmd_name?: string;
  payload?: { [key: string]: string | number };
  pendingStatusReason?: string;
};

export type UploadCSVFileRecord = {
  deviceIdentifier: string[];
};

export type UploadCSVFileRecordModified = string;
