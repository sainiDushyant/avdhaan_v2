import { ExecutionHistoryDetailsResponseModified } from '@/store/hes/types';
import {
  CommandHistoryQueryParams,
  ExecutionHistoryDetailsRecordModified
} from '@/store/hes/types/records/command-execution';

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

type ExecutionHistoryDetailRecordModified = {
  [key: string]: string | number;
};

export const groupEventDataByDataType = (
  records: ExecutionHistoryDetailsRecordModified[]
):
  | ExecutionHistoryDetailRecordModified[][]
  | ExecutionHistoryDetailRecordModified[]
  | undefined => {
  const eventGroups: Record<string, ExecutionHistoryDetailRecordModified[]> =
    {};

  if (!records || records.length === 0) {
    return;
  }

  const results: ExecutionHistoryDetailRecordModified[] = records
    .map((record) => {
      if (record.cmd_name === 'EVENTS' && record.payload) {
        const dataType =
          (record.payload as { data_type?: string }).data_type || 'default';
        if (!eventGroups[dataType]) {
          eventGroups[dataType] = [];
        }
        eventGroups[dataType].push(record.payload);
        return undefined; // Exclude from the results array since it's grouped
      } else if (record.payload) {
        return record.payload; // Return payload for non-'EVENTS' records
      }
    })
    .filter(
      (payload): payload is ExecutionHistoryDetailRecordModified => !!payload
    ); // Filter out undefined

  return Object.keys(eventGroups).length > 0
    ? Object.values(eventGroups)
    : results;
};
