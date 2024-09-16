import { FC, useState } from "react";
import { RangeProps } from "@/store/vee/types/other";
import SingleRange from "./SingleRange";

interface RangeFilterProps {
    start: RangeProps;
    end: RangeProps;
    customCss?: string;
}

const MultiRange: FC<RangeFilterProps> = ({ start, end, customCss }) => {

  const [startRange, setStartRange] = useState(start.initialValue || "");
  const [endRange, setEndRange] = useState(end.initialValue || "");

  return (
    <>
      <SingleRange 
        {...start}
        placeholder={start.placeholder || "Enter start range"}
        name={start.name || "from"}
        customState={{ val: startRange, setter: setStartRange }}
        max={endRange}
        customCss={customCss}
      />
      
      <SingleRange
        {...end}
        placeholder={end.placeholder || "Enter end range"}
        name={end.name || "to"}
        customState={{ val: endRange, setter: setEndRange }}
        min={startRange}
        customCss={customCss}
      />
    </>
  )
}

export default MultiRange