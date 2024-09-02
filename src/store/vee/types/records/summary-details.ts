export interface GraphData {[k: string]: string | number }

export interface SummaryGraphRecord {
  start_date?: string;
  end_date?: string;
  group_id: string;
  group_name: string;
  graph: GraphData[];
}
