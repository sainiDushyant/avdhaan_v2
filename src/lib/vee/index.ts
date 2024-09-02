import { Option } from "@/store/vee/types/other";
import { GraphData } from "@/store/vee/types/records/summary-details";
import { ConditionType, ConditionTypeState } from "@/store/vee/types/records/rule";

export const DEFAULT_LOAD_TYPE = "BL";
export const DEFAULT_LOAD_TYPE_LABEL = "Block Load";
export const DEFAULT_METER_TYPE = "1-Ph";
export const DEFAULT_METER_TYPE_LABEL = "1 Phase";

export type LOAD_TYPES = "BL" | "DL" | "ML";
export type METER_TYPES = "1-Ph" | "3-Ph" | "HTCT" | "LTCT";

export type LoadTypeOption = Option & { value: LOAD_TYPES };
export type MeterTypeOption = Option & { value: METER_TYPES };

export const LOAD_TYPE: LoadTypeOption[] = [
  { label: DEFAULT_LOAD_TYPE_LABEL, value: DEFAULT_LOAD_TYPE },
  { label: "Daily Load", value: "DL" },
  { label: "Monthly Billing", value: "ML" },
];

export const ESTIMATION_PROFILE: LoadTypeOption[] = [
  { label: "Daily Load", value: "DL" },
];

export const METER_TYPE: MeterTypeOption[] = [
  { label: DEFAULT_METER_TYPE_LABEL, value: DEFAULT_METER_TYPE },
  { label: '3 Phase', value: "3-Ph" },
  { label: 'HTCT', value: "HTCT" },
  { label: 'LTCT', value: "LTCT" },
]

export const METER_MAKE: Option[] = [];

export const LOAD_TYPE_ARR: [string, string][] = [
  [DEFAULT_LOAD_TYPE, DEFAULT_LOAD_TYPE_LABEL],
  ["DL", "Daily Load"],
  ["ML", "Monthly Billing"],
]

export const METER_TYPE_ARR: [string, string][] = [
  [DEFAULT_METER_TYPE, DEFAULT_METER_TYPE_LABEL],
  ["3-Ph", "3 Phase"],
  ["HTCT", "HTCT"],
  ["LTCT", "LTCT"],
]

export const LOAD_TYPE_REV = new Map(LOAD_TYPE_ARR);
export const METER_TYPE_REV = new Map(METER_TYPE_ARR);

type GroupPieChartData = { title: string; value: number; color: string; };

export const getGraphData = (
  graph: GraphData, countKeys: string[], 
  rateKeys: string[], colorKeys: string[]
): GroupPieChartData[] => {
    const groupPieChartData: GroupPieChartData[] = [];
    rateKeys.map((rate, index) => {
        const value = graph[rate as keyof GraphData] as number;
        if(value > 0){
            const countKey = countKeys[index] as keyof GraphData;
            const countValue = graph[countKey];
            const colorKey = colorKeys[index]  as keyof GraphData;
            const color = graph[colorKey] as string;
            const title = `${countKey.toString().split("_").join(" ")}: ${countValue}`;
            groupPieChartData.push({
                title: title,
                value: value,
                color: color
            })
        }
    })
    return groupPieChartData;
}

export function getNewAddRuleState({ selectedType, ogCondition }:{
  selectedType: Option | null; 
  ogCondition?: ConditionType;
}): ConditionTypeState {

const newState: ConditionTypeState = {
  type: selectedType,
  field_name: null, 
  condition_type: null, 
  first_value: "",
  second_value: "", 
  other_params: [],
  method: null,
  pdp_count: "",
  max_spike_percentage: "",

}

if(ogCondition && selectedType && ogCondition.type === selectedType.value){
    newState['field_name'] = { label: ogCondition.field_name.split("_").join(" "),  value: ogCondition.field_name };
    newState['condition_type'] = {label: ogCondition.condition_type, value: ogCondition.condition_type };
    newState['first_value'] = ogCondition.first_value || "",
    newState['second_value'] = ogCondition.second_value || "",
    newState['method'] = ogCondition?.method ? { label: ogCondition.method,  value: ogCondition.method }  : null,
    newState['pdp_count'] = ogCondition.pdp_count || "",
    newState['max_spike_percentage'] = ogCondition.max_spike_percentage || "",
    newState['other_params'] = ogCondition?.other_params ? ogCondition.other_params.map(
            item => ({ label: item.split("_").join(" "), value: item })) : []
}
return newState
}