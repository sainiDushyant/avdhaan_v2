import {
  CommandHistoryQueryParams,
  ExecutionHistoryDetailsRecordModified
} from '@/store/hes/types/records/command-execution';

type ExecutionHistoryParams = {
  query: CommandHistoryQueryParams;
  search: string;
  postFix?: string;
};

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

type ExecutionHistoryDetailRecordModified = {
  [key: string]: string | number;
};

export const groupEventDataByDataType = (
  records: ExecutionHistoryDetailsRecordModified[],
  commandName?: string
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
      if (
        (record.cmd_name === 'EVENTS' || commandName?.includes('EVENT')) &&
        record.payload
      ) {
        const dataType = (record.payload as { data_type?: string }).data_type;
        if (dataType && !eventGroups[dataType]) {
          eventGroups[dataType] = [];
        }
        if (dataType) {
          eventGroups[dataType].push(record.payload);
          return undefined;
        } // Exclude from the results array since it's grouped
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

export function lightenColor(hex: string, percent: number): string {
  // Helper function to convert hex to RGB
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  }

  // Helper function to convert RGB to hex
  function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (component: number) => {
      const hex = component.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // Convert hex to RGB
  const { r, g, b } = hexToRgb(hex);

  // Lighten the RGB values by the percentage
  const newR = Math.min(Math.floor(r + (255 - r) * percent), 255);
  const newG = Math.min(Math.floor(g + (255 - g) * percent), 255);
  const newB = Math.min(Math.floor(b + (255 - b) * percent), 255);

  // Convert back to hex and return the lighter color
  return rgbToHex(newR, newG, newB);
}

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ''; // Handle empty string case
  return str.charAt(0).toUpperCase() + str.slice(1);
};
