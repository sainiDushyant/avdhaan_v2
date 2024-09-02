import { DateTimeProps } from "@/store/vee/types/other";
import { FC, useState } from "react";
import DateItem from "./DateItem";

interface DateRangeProps {
    start: DateTimeProps;
    end: DateTimeProps;
}

const DateRange: FC<DateRangeProps> = ({ start, end }) => {

    const [startDate, setStartDate] = useState(start.initialValue || "");
    const [endDate, setEndDate] = useState(end.initialValue || "");
    
    return (
        <>
            <DateItem
                {...start}
                placeholder={start.placeholder || "Start Date"}
                name={start.name || "from"}
                customState={{ val: startDate, setter: setStartDate }}
                max={endDate}
            />

            <DateItem
                {...end}
                placeholder={end.placeholder || "End Date"}
                name={start.name || "to"}
                customState={{ val: endDate, setter: setEndDate }}
                min={startDate}
            />
        </>
    )
}

export default DateRange