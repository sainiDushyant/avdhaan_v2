import { Input } from '@/components/ui/input';
import { DateTimeProps } from '@/store/vee/types/other';
import { useRef, useState, useCallback, ChangeEvent, FC } from 'react';

const TimeItem: FC<DateTimeProps> = ({
    initialValue, placeholder, customState, max, min,
    name, required
}) => {

    const timeRef = useRef<HTMLInputElement>(null);
    const [time, setTime] = useState(initialValue || "");

    const handleChangeTime = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (customState) {
            customState.setter(event.target.value);
            return;
        }
        setTime(event.target.value);
    }, [customState]);

    const onFocusTime = useCallback(() => {
        if (timeRef.current) timeRef.current.type = "time";
    }, [timeRef])

    return (
        <div className='h-auto md:flex-none xl:flex-1 border border-slate-300 rounded-md h-[38px] md:min-w-[170px]'>
            <Input
                ref={timeRef}
                className='block w-full h-full'
                aria-label={placeholder}
                type="text"
                placeholder={placeholder}
                onFocus={onFocusTime}
                value={customState?.val || time}
                name={name}
                required={required}
                min={min || ""}
                max={max || ""}
                onChange={handleChangeTime}
            />
        </div>
    )
}

export default TimeItem