import { FC } from "react";
import TimeItem from "./TimeItem"
import { DateTimeProps } from "@/store/vee/types/other";

interface TimeRangeProps {
    start: DateTimeProps;
    end: DateTimeProps;
    customCss?: string;
}

const TimeRange: FC<TimeRangeProps> = ({ start, end, customCss }) => {

    return (
        <>
            <TimeItem
                {...start}
                placeholder={start.placeholder || "Start Time"}
                name={start.name || "from"}
                customState={start.customState}
                max={end.customState?.val || start.max}
                customCss={customCss}
            />

            <TimeItem
                {...end}
                placeholder={end.placeholder || "End Time"}
                name={end.name || "to"}
                customState={end.customState}
                min={start.customState?.val}
                max={end.max}
                customCss={customCss}
            />
        </>
    )
}

export default TimeRange
