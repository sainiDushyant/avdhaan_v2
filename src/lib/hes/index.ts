import { HesFilterPayload } from "@/store/hes/types/other";
import { HesFiltersRecord, HesFilterStateOptional } from "@/store/hes/types/records/supplementary";

export const convertSearchParamsToHesFilters = 
    (urlSearchParams: URLSearchParams): HesFiltersRecord => {
    const paramsObject: HesFiltersRecord= {};
    for (const [param_key, param_value] of urlSearchParams.entries()) {
        const key = param_key as keyof HesFiltersRecord;
        if (paramsObject[key]) {
            const prevVal = paramsObject[key];
            paramsObject[key] = [...prevVal, { label: `${key}: ${param_value}`, value: param_value }];
        } else {
            paramsObject[key] = [{ label: `${key}: ${param_value}`, value: param_value }];
        }
    }
    return paramsObject;
}

export const convertHesFiltersToSearchParams = 
    ({ pole, dtr, feeder, pss, site }: HesFilterStateOptional): HesFilterPayload => {
    const newParams: HesFilterPayload = {};
    if (pole && pole.length > 0){ 
        newParams["pole"] = pole.map(item => item.value);
    };
    if (dtr && dtr.length > 0){
        newParams["dtr"] = dtr.map(item => item.value);
    };
    if (feeder && feeder.length > 0){
        newParams["feeder"] = feeder.map(item => item.value);  
    };
    if (pss && pss.length > 0){
        newParams["pss"] = pss.map(item => item.value); 
    };
    if (site && site.length > 0){
        newParams["site"] = site.map(item => item.value); 
    };
    return newParams
}