import { FC, useCallback } from "react";
import DateTime from "../../../Date/DateTime";
import { Dispatch, SetStateAction } from "react";

interface DateFiltersProps {
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
}

const DateFilters: FC<DateFiltersProps> = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    []
  );

  return (
    <form className="p-5 rounded-lg bg-white my-3 flex-1 flex flex-wrap gap-x-5 gap-y-5" onSubmit={handleSubmit}>
      <DateTime
        initialValue={startDate}
        placeholder="Start Date"
        customState={{ val: startDate, setter: setStartDate }}
        name="startDate"
        required={false}
      />
      <DateTime
        initialValue={endDate}
        placeholder="End Date"
        customState={{ val: endDate, setter: setEndDate }}
        name="endDate"
        required={false}
      />
    </form>
  );
};

export default DateFilters;
