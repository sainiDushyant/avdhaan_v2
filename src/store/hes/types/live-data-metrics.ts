// Types for individual data items
type CollectedDataItem = {
    value: number;
    count: number;
    data_timestamp: string;
};

type MissedDataItem = {
    value: number;
    count: number;
    data_timestamp: string;
};

// Types for each metric group
 export type MetricGroup = {
    collectedData: CollectedDataItem[];
    missedData: MissedDataItem[];
};

// Types for the API response structure
export type LiveDataMetricsRecord = {
    blockLoadMetrics: MetricGroup;
    dailyLoadMetrics: MetricGroup;
    billingMetrics: MetricGroup;
};

// Transformed Response Type
export interface PushDataMetricsRecord {
    blockLoadMetrics: MetricGroup;
    dailyLoadMetrics: MetricGroup;
    billingMetrics: MetricGroup;
}
