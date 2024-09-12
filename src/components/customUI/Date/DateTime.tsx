import { useState, useCallback, ChangeEvent, useRef, FC } from "react";
import { Input } from "@/components/ui/input";
import { DateTimeProps } from "@/store/vee/types/other";
import { cn } from "@/lib/utils";


const DateTime: FC<DateTimeProps> = ({
    initialValue, placeholder, customState, max, min,
    name, required,customCss
}) => {

    const dateRef = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState(initialValue || "");
    const today = new Date().toISOString().split("T")[0] + "T23:59:59";

    const formatDateTime = (value: string) => {
        if (!value) return "";

        const [datePart, timePart] = value.split("T");
        return `${datePart} ${timePart}:00`;
    };

    const handleChangeDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatDateTime(event.target.value);

        if (customState) {
            customState.setter(formattedValue);
            return;
        }
        setDate(formattedValue);
    }, [customState]);

    const onFocusDate = useCallback(() => {
        if (dateRef.current) dateRef.current.type = "datetime-local";
    }, [dateRef]);

    
    return (
        <div className='h-auto md:flex-none border border-slate-300 rounded-md '>
            <Input
                ref={dateRef}
                className={cn("md:min-w-[170px] flex-1", customCss)}
                aria-label={placeholder}
                type="text"
                placeholder={placeholder}
                onFocus={onFocusDate}
                value={customState?.val || date}
                name={name}
                required={required}
                min={min || ""}
                max={max || today || ""}
                onChange={handleChangeDate}
            />
        </div>
    );
}

export default DateTime