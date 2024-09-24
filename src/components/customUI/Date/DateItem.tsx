import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { Input } from '@/components/ui/input';
import { DateTimeProps } from '@/store/vee/types/other';
import { cn } from '@/lib/utils';

const DateItem: FC<DateTimeProps> = ({
    initialValue, placeholder, customState, max, min,
    name, required, customCss
}) => {

    const dateRef = useRef<HTMLInputElement>(null);
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
        <div className={cn('flex-1 border border-[#ccc] rounded-md h-[38px] min-w-[170px] md:max-w-[220px]', customCss)}>
            <Input
                ref={dateRef}
                className='block w-full h-full border-0 outline-blue-500'
                aria-label={placeholder}
                type="text"
                placeholder={placeholder || "Enter Date"}
                onFocus={onFocusDate}
                value={customState?.val || date}
                name={name}
                required={required}
                min={min || ""}
                max={max || ""}
                onChange={handleChangeDate}
            />
        </div>
    )
}

export default DateItem;