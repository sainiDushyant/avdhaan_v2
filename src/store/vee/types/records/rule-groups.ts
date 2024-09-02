import { BaseObj } from ".";
import { RuleRecord } from "./rule";

export type RuleGroupRecord = BaseObj;
0
export type UpdateRuleGroup = BaseObj;

export interface RuleGroupDetailRecord {
    group: RuleGroupRecord;
    rules: RuleRecord[];
}