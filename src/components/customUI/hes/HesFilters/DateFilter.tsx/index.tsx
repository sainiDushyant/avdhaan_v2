import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubmitButton from "@/components/customUI/Button/SubmitButton";
import DateTime from "../../../Date/DateTime"; // Adjust the import path based on your project structure.

const DateFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [startDate, setStartDate] = useState<string>("");

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const params = new URLSearchParams(searchParams);
            if (startDate) params.set("startDate", startDate);
            setSearchParams(params);
        },
        [startDate, searchParams, setSearchParams]
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

            <SubmitButton title="Apply Filters" />
        </form>
    );
};

export default DateFilters;
