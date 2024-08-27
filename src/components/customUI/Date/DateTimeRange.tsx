import { FC, useState } from "react";
import DateTime from "./DateTime"
import { DateTimeProps } from "@/store/vee/types/other";

interface DateTimeRangeProps {
    start: DateTimeProps;
    end: DateTimeProps;
}

const DateTimeRange: FC<DateTimeRangeProps> = ({ start, end }) => {

    const [startDate, setStartDate] = useState(start.initialValue || "");
    const [endDate, setEndDate] = useState(end.initialValue || "");

    return (
        <>
            <DateTime
                {...start}
                placeholder={start.placeholder || "Start Date Time"}
                name={start.name || "from"}
                customState={{ val: startDate, setter: setStartDate }}
                max={endDate}
            />

            <DateTime
                {...end}
                placeholder={end.placeholder || "End Date Time"}
                name={start.name || "to"}
                customState={{ val: endDate, setter: setEndDate }}
                min={startDate}
            />
        </>
    )
}

export default DateTimeRange