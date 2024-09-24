import { lazy, Suspense } from "react";
import {     
    CommandInfoArgsType, CommandInfoParams, DateAndTimeParams, 
    NumberParams, RangeParams,
} from "@/store/hes/types/records/command-execution";
import { 
    getNumberFilter, getRangeFilter, getDateParams, 
    getDateRange, getDateTimeRange 
} from "./utils";

const DateFilter = lazy(() => import("@/components/customUI/Date/DateItem"));
const DateTimeFilter = lazy(() => import("@/components/customUI/Date/DateTime"));


export const getParametrizedComponent = ({argsType, params}: 
    { argsType: CommandInfoArgsType; params: CommandInfoParams }
) => {

    return (
        <Suspense fallback={<div>Loading...</div>}>

            {(argsType === "number") && getNumberFilter(params as NumberParams)}

            {(argsType === "range") && getRangeFilter(params as RangeParams)}

            {(argsType === "date") && (
                <DateFilter 
                    {...getDateParams(params as DateAndTimeParams )} 
                    name="from" required 
                />
            )}
            
            {(argsType === 'dateTime') && (
                <DateTimeFilter 
                    {...getDateParams(params as DateAndTimeParams )} 
                    name="from" required 
                />
            )}

            {(argsType === "dateRange") && getDateRange(params as DateAndTimeParams)}

            {(argsType === "dateTimeRange") && getDateTimeRange(params as DateAndTimeParams)}

        </Suspense>
    )
}