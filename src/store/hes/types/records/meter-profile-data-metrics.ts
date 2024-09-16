export type MeterProfileQueryParams = {
  after_cursor?: string;
  before_cursor?: string;
  to?: string;
  from?: string;
  sub_category?: number;
}

export type MeterProfileDataTableRecord = {
  id: number;
  device_id: number;
  data_timestamp: string;
  dcu_serial: string;
  device_identifier: string;
  data_source: string;
  data: {[key: string]: string | number | null | boolean};
}

export type MeterProfileDataTableRecordTransformed =  {
  id: number;
  device_id: number;
  data_timestamp: string;
  dcu_serial: string;
  device_identifier: string;
  data_source: string;
  [key: string]: string | number | null | boolean;
};

type MeterProfileGraphItem = {
  value: number;
  count?: number;
  data_timestamp: string;
}

// Types for each metric group
export type MetricGroup = {
  collectedData: MeterProfileGraphItem[];
  missedData: MeterProfileGraphItem[];
};

export type ModifiedGroup = {
  data1: MeterProfileGraphItem[];
  data2: MeterProfileGraphItem[];
};

// Types for the API response structure
export type LiveDataMetricsRecord = {
  blockLoadMetrics: MetricGroup;
  dailyLoadMetrics: MetricGroup;
  billingMetrics: MetricGroup;
  blockLoadDailyMetrics: MetricGroup;
  profileInstantMetrics: MetricGroup;
};

export type ModifiedLiveDataRecord = {
  blockLoadMetrics: ModifiedGroup;
  dailyLoadMetrics: ModifiedGroup;
  billingMetrics: ModifiedGroup;
  blockLoadDailyMetrics: ModifiedGroup;
  profileInstantMetrics: ModifiedGroup;
};
