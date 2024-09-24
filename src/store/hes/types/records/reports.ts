export interface ChartData {
  [key: string]: ChartDataItem;
}

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

export type StatusBreakupNum = { [K in keyof StatusBreakup]?: number; }

export type ScheduledCommandRecord = {
  commandName: string;
  executionStartTime: string;
  totalCommands: number;
  totalMeters: number;
  statusBreakup: StatusBreakup;
  progress: number;
};

export type FlattenedScheduledCommandRecord = Omit<ScheduledCommandRecord, 
  'statusBreakup'> & StatusBreakupNum;

export interface ChartDataItem {
  labels: string[];
  series: number[];
  colors?: string[];
}

export type TransformedScheduledCommandRecord = { 
  chartData: ChartData; 
  records: FlattenedScheduledCommandRecord[] 
}