import { useCallback, useState } from "react";
import SubmitButton from "@/components/customUI/Button/SubmitButton";
import DateTime from "../../../Date/DateTime";
import { useSearchParams } from "react-router-dom";


const DateFilters = () => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const params = new URLSearchParams();
            if (startDate) params.set("from", startDate);
            if (endDate) params.set("to", endDate);
            setSearchParams(params);
        },
        [startDate, endDate, setSearchParams]
    );

    return (
        <form
            className="p-5 rounded-lg bg-white my-3 flex-1 flex flex-wrap gap-x-5 gap-y-5"
            onSubmit={handleSubmit}
        >
            <DateTime
                initialValue={startDate}
                placeholder="Start Date"
                customState={{ val: startDate, setter: setStartDate }}
                name="startDate"
                required={false}
            />

            <DateTime
                initialValue={endDate}
                placeholder="End Date"
                customState={{ val: endDate, setter: setEndDate }}
                name="endDate"
                required={false}
            />

            <SubmitButton title="Apply Filters" />
        </form>
    );
};

export default DateFilters;
