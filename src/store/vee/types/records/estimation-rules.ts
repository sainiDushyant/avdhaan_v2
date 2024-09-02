import { BaseObj, BaseObjWithoutId } from ".";
import { MeterInfo } from "./head-groups";
import { Option } from "@/store/vee/types/other";

export type EstimationRuleRecord = BaseObj & MeterInfo & {
    method: string;
    previous_data_points_count: number;
    is_default: boolean;
    selection_type: string;
    parameters: string[];
};

export type MinMax = {
    min_value: number;
    max_value: number;
}

export type EstimationParameters = {
    methods: string[], 
    params: string[], 
    selection_type: string[], 
    previous_data_point_count: MinMax
}

export type EstimationParams = {
    methods: Option[], 
    params: string[], 
    selection_type: Option[], 
    previousDataPointCount: MinMax
}

export type EstimationState = {
    method: Option | null;
    selectionType: Option | null;
    pdpCount: string | number;
}

export type EstimationRuleMutation = BaseObjWithoutId & MeterInfo & {
    method: string;
    previous_data_points_count: number;
    selection_type: string;
};