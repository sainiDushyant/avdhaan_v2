import { ChangeEvent, FC, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { RangeProps } from "@/store/vee/types/other";


const SingleRange: FC<RangeProps> = ({ 
  initialValue, name, required, 
  placeholder, customState, 
  max, min, customCss 
}) => {

  const minVal = Number(min) || 0;
  const maxVal = Number(max) || 0;

  const [range, setRange] = useState(initialValue || "");

  const handleChangeRange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (customState) {
        customState.setter(newValue);
        return;
    }
    setRange(newValue);
}, [customState]);

  return (
    <div className={cn('h-auto md:flex-none xl:flex-1 border border-slate-300 rounded-md h-[38px] md:min-w-[170px]', customCss)}>
        <Input
            className="block w-full h-full [&::-webkit-inner-spin-button]:appearance-none"
            aria-label={placeholder || "Enter a range"}
            type="number"
            placeholder={placeholder || "Enter a range"}
            name={name}
            required={required}
            min={minVal}
            max={maxVal}
            value={customState?.val ||  range}
            onChange={handleChangeRange}
        />
    </div>
  )
}

export default SingleRange