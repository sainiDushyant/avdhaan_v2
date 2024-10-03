export type RestorationOccuranceMetricsRecord = {
  name: string;
  occurenceCount: number;
  restorationCount: number;
  restorationPercentage: number;
};

export type AlarmsQueryParams = {
  after_cursor?: string;
  before_cursor?: string;
  to?: string;
  from?: string;
  sub_category?: number;
};
