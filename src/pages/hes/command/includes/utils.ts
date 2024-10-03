import { CommandHistoryQueryParams } from '@/store/hes/types/records/command-execution';

type ExecutionHistoryParams = {
  query: CommandHistoryQueryParams;
  search: string;
  postFix?: string;
};

export const getCommandExecutionHistoryUrlSearchParams = ({
  query,
  search,
  postFix = ''
}: ExecutionHistoryParams) => {
  const { command_status, device_identifier, ...rest } = query;

  let newQuery = Object.entries(rest).reduce((acc, [key, value]) => {
    if (value.toString().length > 0) {
      if (acc === '') {
        return '?' + `${key}=${value}`;
      } else {
        return acc + `&${key}=${value}`;
      }
    }
    return acc;
  }, search);

  if (command_status && command_status.length > 0) {
    newQuery = command_status.reduce((acc, value) => {
      if (value.length > 0) {
        if (acc === '') {
          return '?' + `command_status=${value}`;
        } else {
          return acc + `&command_status=${value}`;
        }
      }
      return acc;
    }, newQuery);
  }

  if (device_identifier && device_identifier.length > 0) {
    newQuery = device_identifier.reduce((acc, value) => {
      if (value.length > 0) {
        if (acc === '') {
          return '?' + `device_identifier=${value}`;
        } else {
          return acc + `&device_identifier=${value}`;
        }
      }
      return acc;
    }, newQuery);
  }

  return newQuery + (newQuery ? `&${postFix}` : `?${postFix}`);
};

type Payload = {
  data_type?: string;
  [key: string]: any;
};

type ResponseData = {
  cmd_name: string;
  payload: Payload;
};

type RecordResponse = {
  response: {
    responseData: ResponseData;
    [key: string]: any;
  };
  pendingStatusReason?: {
    reason: string;
  };
  [key: string]: any;
};

type ExecutionHistoryDetailsRecordModified = {
  [key: string]: any;
};

/**
 * Group records by data_type for cmd_name "EVENTS"
 */
export const groupEventDataByDataType = (
  records: RecordResponse[]
): ExecutionHistoryDetailsRecordModified[][] | undefined => {
  const eventGroups: Record<string, ExecutionHistoryDetailsRecordModified[]> =
    {};

  if (!records) {
    return;
  }
  records.forEach((record) => {
    if (record.cmd_name === 'EVENTS') {
      const dataType = record.payload?.data_type || 'default';
      if (!eventGroups[dataType]) {
        eventGroups[dataType] = [];
      }
      eventGroups[dataType].push(record.payload);
    }
  });

  // Return grouped records as an array of arrays
  return Object.values(eventGroups);
};
