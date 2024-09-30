import { FC } from "react";
import DateTime from "./DateTime"
import { DateTimeProps } from "@/store/vee/types/other";

interface DateTimeRangeProps {
    start: DateTimeProps;
    end: DateTimeProps;
    customCss?: string;
}

const DateTimeRange: FC<DateTimeRangeProps> = ({ start, end, customCss }) => {

    return (
        <>
            <DateTime
                {...start}
                placeholder={start.placeholder || "Start Date Time"}
                name={start.name || "from"}
                customState={start.customState}
                max={end.customState?.val || start.max}
                customCss={customCss}
            />

            <DateTime
                {...end}
                placeholder={end.placeholder || "End Date Time"}
                name={end.name || "to"}
                customState={end.customState}
                min={start.customState?.val}
                max={end.max}
                customCss={customCss}
            />
        </>
    )
}

export default DateTimeRange
