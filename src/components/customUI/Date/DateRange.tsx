import { FC } from "react";
import { DateTimeProps } from "@/store/vee/types/other";
import DateItem from "./DateItem";

interface DateRangeProps {
    start: DateTimeProps;
    end: DateTimeProps;
    customCss?: string;
}

const DateRange: FC<DateRangeProps> = ({ start, end, customCss }) => {
    return (
        <>
            <DateItem
                {...start}
                placeholder={start.placeholder || "Start Date"}
                name={start.name || "from"}
                customState={start.customState}
                max={end.customState?.val || start.max}
                customCss={customCss}
            />

            <DateItem
                {...end}
                placeholder={end.placeholder || "End Date"}
                name={end.name || "to"}
                customState={end.customState}
                min={start.customState?.val}
                max={end.max}
                customCss={customCss}
            />
        </>
    )
}

export default DateRange