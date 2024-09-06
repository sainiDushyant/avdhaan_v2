export type StatusDetail = {
    count: number;
    percentage: number;
  };
  
  export type StatusBreakup = {
    INITIATE: StatusDetail;
    IN_PROGRESS: StatusDetail;
    PENDING: StatusDetail;
    SUCCESS: StatusDetail;
    FAILED: StatusDetail;
    SUCCESS_AFTER_TIMEOUT?: StatusDetail;
    PARTIAL_SUCCESS?: StatusDetail;
    PARTIAL_SUCCESS_AFTER_TIMEOUT?: StatusDetail;
  };
  
  export type CommandRecord = {
    commandName: string;
    executionStartTime: string;
    totalCommands: number;
    totalMeters: number;
    statusBreakup: StatusBreakup;
    progress: number;
  };
  
  export type FlattenedCommandRecord = {
    command_Name: string;
    date_and_timestamp: string;
    total_Meters: number;
    initiate: number;
    in_Progress: number;
    pending: number;
    success: number;
    failed: number;
    success_After_Timeout: number;
    partial_Success: number;
    partial_Success_After_Timeout: number;
  };
  
  export interface ScheduledReportsResponse {
    success: boolean;
    data: {
      records: CommandRecord[];
      count: number;
    };
    error: any | null;
  }
  
  export interface ChartDataItem {
    labels: string[];
    series: number[];
    colors?: string[];
  }
  
  export interface ChartData {
    [key: string]: ChartDataItem;
  }
  