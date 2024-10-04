<<<<<<< HEAD
import { ExecutionHistoryDetailsResponseModified } from '@/store/hes/types';
import {
  CommandHistoryQueryParams,
  ExecutionHistoryDetailsRecordModified
} from '@/store/hes/types/records/command-execution';
=======
import { CommandHistoryQueryParams } from '@/store/hes/types/records/command-execution';
>>>>>>> d90a1f9 (Refacotring Command execution according to the Figma)

type ExecutionHistoryParams = {
  query: CommandHistoryQueryParams;
  search: string;
  postFix?: string;
};

interface PrimaryFilters {
  pss_id: Option[];
  feeder_id: Option[];
  dtr_id: Option[];
  device_identifier: Option[];
}

interface Option {
  value: string | number;
  label: string;
}

/**
 * Function to add or update tableData with PSS, Feeder, or DTR data.
 * The total_count will include only the length of the device_identifier array.
 */

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

<<<<<<< HEAD
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
=======
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
>>>>>>> d90a1f9 (Refacotring Command execution according to the Figma)
};

export const getSelectionData = (
  currentStep: number,
  primaryFilters: PrimaryFilters
) => {
  if (!primaryFilters) {
    return;
  }
  console.log(primaryFilters, 'primary filters in utils');
  const meters = primaryFilters.device_identifier.map((device) => device.value);
  if (currentStep === 1) {
    return {
      pss_list: primaryFilters.pss_id.map((pss) => pss.label),
      meters
    };
  }

  if (currentStep === 2) {
    return {
      feeder_list: primaryFilters.feeder_id.map((feeder) => feeder.label),
      meters
    };
  }

  if (currentStep === 3) {
    return {
      dtr_list: primaryFilters.dtr_id.map((dtr) => dtr.label),
      meters
    };
  }

  return { meters };
};
