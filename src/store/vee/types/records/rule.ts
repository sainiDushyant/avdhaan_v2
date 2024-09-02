import { MultiValue } from "react-select";
import { BaseObj, BaseObjWithoutId } from ".";
import { Option } from "../other"
import { MinMax } from "./estimation-rules";

export type ConditionType = {
  field_name: string;
  condition_type: string;
  first_value: number | null;
  second_value: number | null;
  type: string | null;
  other_params: string[] | null;
  method: string | null;
  pdp_count: number | null;
  max_spike_percentage: number | null;
};

export type ConditionTypeState = {
  field_name: Option | null;
  condition_type: Option | null;
  first_value: string | number;
  second_value: string | number;
  type: Option | null;
  other_params: MultiValue<Option>;
  method: Option | null;
  pdp_count: string | number;
  max_spike_percentage: string | number;
}

export type RuleRecord = BaseObj & {
  condition: ConditionType;
  is_active: boolean;
};

export type AddRule = BaseObjWithoutId & {
  condition: ConditionType;
};

export type RulesTypeConditions = {
  condition_types: string[];
  field_names: string[];
  method?: string[];
  pdp_count?: MinMax;
  max_spike_percentage?: MinMax;
};

export type RuleConditions = {
  conditionTypes: Option[];
  fieldNames: Option[];
  method: Option[] | null;
  pdp_count?: MinMax;
  max_spike_percentage?: MinMax;
}

export type RuleDetails = BaseObj & {
  condition: ConditionType;
};

export type RuleActivation = { 
  ruleId: string; 
  isActive: boolean 
}

export type RuleDetailSummary = {
  name: string;
  description: string;
  id: string;
  condition ?: ConditionType;
  is_active : boolean;

}