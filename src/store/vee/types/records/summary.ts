import { BaseObj } from ".";

export type ConditionType = {
  field_name: string;
  condition_type: string;
  first_value: number | null;
  second_value: number | null;
  type: string | null;
  other_params: string[] | null;
};

export type SummaryListRecord = BaseObj & { 
  dates?: string[] ;
  condition?: ConditionType;
  rule_id?: string | null;
};
export type SummaryTable = SummaryListRecord[];

export type SummaryTableName =
  | "validated_summary_table"
  | "estimated_summary_table"
  | "editing_summary_table";

export type SummaryListViewTableName =  "validated_data_stats" | "estimated_data_stats"

export interface OverviewSummary {
  validation_summary: {
    failed_meters: number;
    validated_meters: number;
  };
  estimation_summary: {
    estimated_meters: number;
  };
  editing_summary: {
    edited_meters: number;
  };
}



