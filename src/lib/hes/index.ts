import { HesFilterPayload } from "@/store/hes/types/other";
import { CommandInfoArgsType, CommandInfoParams, NumberParams } from "@/store/hes/types/records/command-execution";
import { HesFilterRecord, HesFilterStateOptional } from "@/store/hes/types/records/device-management";

export const executionStatusData = [
    { label: "Success", value: "SUCCESS" },
    { label: "Partial success", value: "PARTIAL_SUCCESS" },
    { label: "Initiate", value: "INITIATE" },
    { label: "Success after timeout", value: "SUCCESS_AFTER_TIMEOUT" },
    { label: "Partial Success after timeout", value: "PARTIAL_SUCCESS_AFTER_TIMEOUT" },
    { label: "Pending", value: "PENDING" },
    { label: "Failed", value: "FAILED" },
    { label: "In progress", value: "IN_PROGRESS" },
]

type MeterCategory = { id: number; name: string };

export const meterCategoryData: MeterCategory[] = [
  {
      "id": 1,
      "name": "One Phase meter"
  },
  {
      "id": 2,
      "name": "Three Phase meter"
  },
  {
      "id": 3,
      "name": "LTCT Meter"
  },
  {
      "id": 4,
      "name": "HTCT meter"
  }
]

export const searchParamsToHesFilters = 
    (urlSearchParams: URLSearchParams): HesFilterRecord => {
    const paramsObject: HesFilterRecord= {}; 
    const appliedFilters: string[] = [];
    for (const [param_key, param_value] of urlSearchParams.entries()) {
        if(!appliedFilters.includes(`${param_key}-${param_value}`)){
            const key = param_key as keyof HesFilterRecord;
            if (paramsObject[key]) {
                const prevVal = paramsObject[key];
                if(key === "device_identifier"){
                    paramsObject[key] = [...prevVal, { label: param_value, value: param_value }];
                }else{
                    paramsObject[key] = [...prevVal, { label: `${key}: ${param_value}`, value: param_value }];
                }
            } else {
                if(key === "device_identifier"){
                    paramsObject[key] = [{ label: param_value, value: param_value }];
                }else{
                    paramsObject[key] = [{ label: `${key}: ${param_value}`, value: param_value }];
                }
            }
            appliedFilters.push(`${param_key}-${param_value}`)
        }
    }
    return paramsObject;
}

export const hesFiltersStateToObject = 
    (data: HesFilterStateOptional): HesFilterPayload => {
    const newParams: HesFilterPayload = {};
    Object.keys(data).forEach(key => {
        const filterKey = key as keyof HesFilterStateOptional;
        const payloadValue = data[filterKey];
        if(payloadValue && payloadValue.length > 0){
            newParams[filterKey] = payloadValue.map(item => item.value);
        }
    })
    return newParams
}

export const objectToUrlParams = (obj: Record<string, string | string[]>): URLSearchParams => {
    const params = new URLSearchParams();
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
        } else {
            params.append(key, value);
        }
    });
    return params;
}

export const getValFromFormData = (formData: FormData, key: string, prefix="", isDate=true) => {
    const val = formData.get(key);
    if(val){ 
        if(isDate) return String(val).split("T").join(" ") + prefix; 
        return String(val) + prefix; 
    }
    return ""
}

export const getCommandArgsValue = (
    formData: FormData, commandArg: CommandInfoArgsType, 
    commandParameter: CommandInfoParams
) => {

    const toFromData: { to?: string | number; from?: string | number } = {};
    let valueData: number | null = null;

    switch(commandArg){
        case "number":
            if((commandParameter as NumberParams).isMulti){
                const selectedValues = formData.getAll('selected-numbers');
                const sortedValues = selectedValues.sort((a, b) =>  Number(a) - Number(b));
                if(sortedValues.length < 2){
                    valueData = Number(sortedValues[0]);
                }else{
                    toFromData['from'] = Number(sortedValues[0]);
                    toFromData['to'] = Number(sortedValues[1]);
                }
            }else{
                const fromVal = getValFromFormData(formData, "from", "", false);
                if(fromVal) valueData = Number(fromVal);
            }
            break
        case "range":
            if((commandParameter as NumberParams).isMulti){
                const fromVal = getValFromFormData(formData, "from", "", false);
                if(fromVal) toFromData['from'] = Number(fromVal);
                const toVal = getValFromFormData(formData, "to", "", false);
                if(toVal) toFromData['to'] = Number(toVal);
            }else{
                const fromVal = getValFromFormData(formData, "from", "", false);
                if(fromVal) valueData = Number(fromVal);
            }
            break
        default:
            if(commandArg === "dateRange" || commandArg === "dateTimeRange"){
                const fromVal = getValFromFormData(formData, "from", commandArg === "dateTimeRange" ? ":00" : "");
                if(fromVal) toFromData['from'] = fromVal;
                const toVal = getValFromFormData(formData, "to", commandArg === "dateTimeRange" ? ":00" : "");
                if(toVal) toFromData['to'] = toVal;
            }else{
                const fromVal = getValFromFormData(formData, "from", commandArg === "dateTime" ? ":00": "");
                if(fromVal) toFromData['from'] = fromVal;
            }
    }
    return { value: valueData ? valueData: toFromData }
}