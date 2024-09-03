import { HesFilterPayload } from "@/store/hes/types/other";
import { HesFilterRecord, HesFilterStateOptional } from "@/store/hes/types/records/device-management";

export const searchParamsToHesFilters = 
    (urlSearchParams: URLSearchParams): HesFilterRecord => {
    const paramsObject: HesFilterRecord= {};
    for (const [param_key, param_value] of urlSearchParams.entries()) {
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

export function objectToUrlParams(obj: Record<string, string | string[]>): URLSearchParams {
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