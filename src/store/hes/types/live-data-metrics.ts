// Types for individual data items
type data1 = {
  value: number;
  count?: number;
  data_timestamp: string;
};

type data2 = {
  value: number;
  count?: number;
  data_timestamp: string;
};

// Types for each metric group
export type MetricGroup = {
  collectedData: data1[];
  missedData: data2[];
};

type ModifiedGroup = {
  data1: data1[];
  data2: data2[];
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
