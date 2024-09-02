import { LOAD_TYPES, METER_TYPES } from "@/lib/vee";
import { BaseObj, BaseObjWithoutId } from ".";
import { RuleRecord } from "./rule";

export type HeadGroupTableObj = BaseObj;

export type MeterInfo = {
  meter_type: METER_TYPES;
  load_type: LOAD_TYPES;
}

export type HeadGroup = MeterInfo

export type HeadGroupRecord = HeadGroupTableObj & HeadGroup;


export interface HeadGroupDetailRecord {
    head_group: HeadGroupRecord;
    rules: RuleRecord[];
    rule_groups: HeadGroupTableObj[];
}

export type AddHeadGroup = HeadGroup & BaseObjWithoutId;
export type EditHeadGroup = HeadGroup & BaseObj;