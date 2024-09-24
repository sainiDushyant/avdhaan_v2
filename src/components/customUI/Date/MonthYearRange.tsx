import { FC } from "react";
import { DateTimeProps } from "@/store/vee/types/other";
import MonthYear from "./MonthYear";

interface MonthYearRangeProps {
  start: DateTimeProps;
  end: DateTimeProps;
  customCss?: string;
}

const MonthYearRange: FC<MonthYearRangeProps> = ({ start, end, customCss }) => {
  return (
    <>
      <MonthYear
        {...start}
        placeholder={start.placeholder || "Start Month"}
        name={start.name || "from"}
        customState={start.customState}
        max={end.customState?.val || start.max}
        customCss={customCss}
      />

      <MonthYear
        {...end}
        placeholder={end.placeholder || "End Month"}
        name={end.name || "to"}
        customState={end.customState}
        min={start.customState?.val}
        max={end.max}
        customCss={customCss}
      />
    </>
  )
}

export default MonthYearRange