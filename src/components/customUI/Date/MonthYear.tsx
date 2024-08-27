import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { DateTimeProps } from "@/store/vee/types/other";

const MonthYearPicker: FC<DateTimeProps> = ({
    initialValue, placeholder, customState, max, min,
    name, required
}) => {
    const dateRef = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState(initialValue || "");   
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); 

    const minDate = min ? min.slice(0, 7) : "";
    const maxDate = max ? max.slice(0, 7)  : currentMonth; 

    const handleChangeDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const selectedMonthYear = event.target.value;
        const formattedDate = `${selectedMonthYear}-01`;

        if (customState) {
            customState.setter(formattedDate);
        }
        setDate(selectedMonthYear);
    }, [customState]);

    const onFocusDate = useCallback(() => {
        if (dateRef.current) {
            dateRef.current.type = "month";
        }
    }, [dateRef])

    return (
        <div className='relative flex-1 border border-slate-300 rounded-md h-[38px] min-w-[170px] md:max-w-[220px]'>
            <Input
                ref={dateRef}
                className='block w-full h-full border-0 outline-none'
                aria-label={placeholder}
                type="text"
                placeholder={placeholder}
                value={customState?.val.slice(0, 7) || date}
                name={name}
                required={required}
                min={minDate} 
                max={maxDate} 
                onChange={handleChangeDate}
                onFocus={onFocusDate}
            />
        </div>
    );
}

export default MonthYearPicker;