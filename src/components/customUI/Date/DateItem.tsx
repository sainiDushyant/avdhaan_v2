import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { Input } from '@/components/ui/input';
import { DateTimeProps } from '@/store/vee/types/other';

const DateItem: FC<DateTimeProps> = ({
    initialValue, placeholder, customState, max, min,
    name, required
}) => {

    const dateRef = useRef<HTMLInputElement>(null);
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(initialValue || "");

    const handleChangeDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.value;
        if (customState) {
            customState.setter(selectedDate);
            return;
        }
        setDate(event.target.value);
    }, [customState]);

    const onFocusDate = useCallback(() => {
        if (dateRef.current) dateRef.current.type = "date";
    }, [dateRef])

    return (
        <div className='flex-1 border border-[#ccc] rounded-md h-[38px] min-w-[170px] md:max-w-[220px]'>
            <Input
                ref={dateRef}
                className='block w-full h-full border-0 outline-none'
                aria-label={placeholder}
                type="text"
                placeholder={placeholder}
                onFocus={onFocusDate}
                value={customState?.val || date}
                name={name}
                required={required}
                min={min || ""}
                max={max || today }
                onChange={handleChangeDate}
            />
        </div>
    )
}

export default DateItem;