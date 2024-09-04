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
    commandName: string;
    executionStartTime: string;
    totalCommands: number;
    totalMeters: number;
    initiateCount: number;
    initiatePercentage: number;
    inProgressCount: number;
    inProgressPercentage: number;
    pendingCount: number;
    pendingPercentage: number;
    successCount: number;
    successPercentage: number;
    failedCount: number;
    failedPercentage: number;
    successAfterTimeoutCount: number;
    successAfterTimeoutPercentage: number;
    partialSuccessCount: number;
    partialSuccessPercentage: number;
    partialSuccessAfterTimeoutCount: number;
    partialSuccessAfterTimeoutPercentage: number;
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
  