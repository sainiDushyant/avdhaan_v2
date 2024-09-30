import { useState, useCallback, ChangeEvent, useRef, FC } from "react";
import { Input } from "@/components/ui/input";
import { DateTimeProps } from "@/store/vee/types/other";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";


const DateTime: FC<DateTimeProps> = ({
    initialValue, placeholder, customState, max, min,
    name, required, step, customCss
}) => {

    const { toast } = useToast();
    const dateRef = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState(initialValue || "");

    const handleChangeDate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (customState) {
            if(step){
                const divBy = Number(step) / 60;
                const newDate = new Date(event.target.value);
                if(newDate.getMinutes() % divBy !== 0) {
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
        setDate(event.target.value);
    }, [customState, toast]);

    const onFocusDate = useCallback(() => {
        if (dateRef.current) dateRef.current.type = "datetime-local";
    }, [dateRef]);

    
    return (
        <div className={cn('h-auto  md:flex-none xl:flex-1 border border-slate-300 rounded-md h-[38px] md:min-w-[170px]', customCss)}>
            <Input
                ref={dateRef}
                className='block w-full h-full outline-blue-500'
                aria-label={placeholder}
                type="text"
                placeholder={placeholder || "Enter Date Time"}
                onFocus={onFocusDate}
                value={customState?.val || date}
                name={name}
                required={required}
                min={min || ""}
                max={max || ""}
                step={step}
                onChange={handleChangeDate}
            />
        </div>
    );
}

export default DateTime