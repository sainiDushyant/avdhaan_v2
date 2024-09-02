import { EstimationRuleRecord } from "./records/estimation-rules";
import { HeadGroupDetailRecord, HeadGroupRecord } from "./records/head-groups";
import { RuleRecord } from "./records/rule";
import { RuleGroupDetailRecord, RuleGroupRecord } from "./records/rule-groups";
import { OverviewSummary, SummaryTable, SummaryTableName } from "./records/summary";
import { SummaryGraphRecord } from "./records/summary-details";

export interface SummaryAPIResponse {
  summary: OverviewSummary;
  table_summary: {
    [key in SummaryTableName]: SummaryTable;
  };
}

export type SummaryResponse = Omit<SummaryAPIResponse, "table_summary"> & {
  table: SummaryTable;
};

export type SummaryGraphAPIResponse = SummaryGraphRecord[];

type SummaryListViewTableData = {
  validated_data_stats?: SummaryTable;
  estimated_data_stats?: SummaryTable;
}

export type SummaryTableAPIResponse = SummaryListViewTableData & {
  has_non_primitive_data: boolean;
  has_rule_details: boolean;
  next_cursor: string | null;
  prev_cursor: string | null;
}

export type SummaryListView = {
  table: SummaryTable;
  has_non_primitive_data: boolean;
  has_rule_details: boolean;
  next_cursor: string | null;
  prev_cursor: string | null;
};

export type HeadGroupTableAPIResponse = { head_groups: HeadGroupRecord[]};
export type HeadGroupDetailAPIReponse = HeadGroupDetailRecord;
export type RuleGroupTableAPIResponse = { groups: RuleGroupRecord[] };
export type RuleGroupDetailAPIResponse = RuleGroupDetailRecord;
export type RuleTableAPIResponse = { 
  rules: RuleRecord[];
  pagination: {
    pageIndex: number;
    pageSize: number;
    pageTotal: number;
  }
};
export type EstimationRuleAPIResponse = { 
  rules: EstimationRuleRecord[];
};

export interface CustomAPIError {
  description?: string;
  // Define other properties if needed
}