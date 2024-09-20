import { lazy, useState } from "react";
import { DateAndTimeParams, NumberParams, RangeParams } from "@/store/hes/types/records/command-execution";

const SingleNumber = lazy(() => import("@/components/customUI/hes/NumberFilter/SingleNumber"));
const MultiNumber = lazy(() => import("@/components/customUI/hes/NumberFilter/MultiNumber"));
const SingleRange = lazy(() => import("@/components/customUI/hes/RangeFilter/SingleRange"));
const MultiRange = lazy(() => import("@/components/customUI/hes/RangeFilter/MultiRange"));
const DateRangeFilter = lazy(() => import("@/components/customUI/Date/DateRange"));
const DateTimeRangeFilter = lazy(() => import("@/components/customUI/Date/DateTimeRange"));


export const getDateParams = ({ max, step }: DateAndTimeParams) => {
    const date = new Date().toISOString();
    const today = date.split("T")[0];
    let currentMax = ""
    if(max === "today"){
        currentMax = today;
    }else if(max === "current_time"){
        currentMax = today + "T00:00"
    }
    return {
        step,
        max: currentMax,
        required: true,
        customCss: "flex-none xl:flex-none md:min-w-[120px]" 
    }
}

export const getNumberFilter = (params: NumberParams): JSX.Element => {
    if(params.isMulti){
        return <MultiNumber 
            params={params} 
            customCss={"flex-none xl:flex-none md:min-w-[120px]"}
        />
    }
    return <SingleNumber 
            params={params} 
            customCss={"flex-none xl:flex-none md:min-w-[120px]"}
    />
}

export const getRangeFilter = ({ isMulti, ...rest }: RangeParams): JSX.Element  => {
    if(isMulti){
        return <MultiRange 
            start={{...rest, name: "from", required: true }} 
            end={{...rest, name: "to", required: true}} 
            customCss={"flex-none xl:flex-none md:min-w-[150px]"}
        />  
    }
    return (
        <SingleRange 
            {...rest} 
            name="from" 
            required={true} 
            customCss={"flex-none xl:flex-none md:min-w-[150px]"}
        />
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDateRange = (_params: DateAndTimeParams) => {

    const max = new Date().toISOString().slice(0, 10);
    const [ startDate, setStartDate ] = useState("")
    const [endDate, setEndDate] = useState("")

    return (
        <DateRangeFilter 
            start={{
                max,
                name:"from",
                required: true,
                customState: {
                    val: startDate,
                    setter: setStartDate
                }
            }} 
            end={{
                max,
                name: "to",
                required: true,
                customState: {
                    val: endDate,
                    setter: setEndDate
                } 
            }} 
        />
    )
}

export const getDateTimeRange = ({ step }: DateAndTimeParams) => {

    const date = new Date().toISOString();
    const max = date.split("T")[0] + "T00:00";

    const [ startDateTime, setStartDateTime ] = useState("")
    const [endDateTime, setEndDateTime] = useState("")

    return (
        <DateTimeRangeFilter 
            start={{
                step,
                max,
                name:"from",
                required: true,
                customState: {
                    val: startDateTime,
                    setter: setStartDateTime
                }
            }} 
            end={{
                step,
                max,
                name:"to",
                required: true,
                customState: {
                    val: endDateTime,
                    setter: setEndDateTime
                } 
            }} 
            customCss={"flex-none xl:flex-none md:min-w-[220px]"}
        />
    )
}