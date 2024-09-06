import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubmitButton from "@/components/customUI/Button/SubmitButton";
import DateTime from "../../../Date/DateTime"; 

const DateFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const formatDate = (date: string) => {
        if (!date) return "";
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const hours = String(formattedDate.getHours()).padStart(2, '0');
        const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
        const seconds = String(formattedDate.getSeconds()).padStart(2, '0');
        return `${year}-${day}-${month} ${hours}:${minutes}:${seconds}`;
    };


    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const params = new URLSearchParams(searchParams);
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            if (formattedStartDate) params.set("from", formattedStartDate);
            if (formattedEndDate) params.set("to", formattedEndDate);  // Add this line if you want to include endDate
            setSearchParams(params.toString());
        },
        [startDate, endDate, searchParams, setSearchParams]
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