import { useRef, useState, useCallback, ChangeEvent, FC } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DateTimeProps } from '@/store/vee/types/other';
import { useToast } from "@/components/ui/use-toast";

const TimeItem: FC<DateTimeProps> = ({
    initialValue, placeholder, customState, max, min,
    name, required, step, customCss,
}) => {

    const { toast } = useToast();

    const timeRef = useRef<HTMLInputElement>(null);
    const [time, setTime] = useState(initialValue || "");

    const handleChangeTime = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (customState) {
            if(step){
                const divBy = Number(step) / 60;
                const selectedTime = Number(event.target.value.split(":")[1]);
                if(selectedTime % divBy !== 0) {
                    return toast({
                        variant: "default",
                        title: "Invalid Time",
                        description: `Valid time interval: ${divBy} minutes`,
                      })
                }
            }
            customState.setter(event.target.value);
            return;
        }
        setTime(event.target.value);
    }, [customState]);

    const onFocusTime = useCallback(() => {
        if (timeRef.current) timeRef.current.type = "time";
    }, [timeRef])

    return (
        <div 
            className={cn('h-auto md:flex-none xl:flex-1 border border-slate-300 rounded-md h-[38px] md:min-w-[170px]', customCss)}
        >
            <Input
                ref={timeRef}
                className='block w-full h-full'
                aria-label={placeholder}
                type="text"
                placeholder={placeholder || "Enter Time"}
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