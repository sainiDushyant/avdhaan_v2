import { FC, useCallback, useState } from "react";
import DateTime from "../../../Date/DateTime";
import { QueryType } from "@/pages/hes/scheduled-reads";
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface DateFiltersProps {
  setQuery: React.Dispatch<React.SetStateAction<QueryType>>;
}

const DateFilters: FC<DateFiltersProps> = ({ setQuery }) => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("")

  const clearFilters = useCallback(() => {
    setQuery({ "from": "", "to": "" })
    setStartDate("")
    setEndDate("")
  }, [setQuery, setStartDate, setEndDate]);


  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const start = new Date(startDate);
      const end = new Date(endDate);

      const diffInDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
      if (diffInDays > 7) {
        toast({
          variant: "destructive",
          description: "End date must be within 7 days from the start date.",
        })
        return;
      }
      setQuery({ from: startDate, to: endDate });
    },
    [setQuery, startDate, endDate]
  );


  return (
    <form
      className="p-5 rounded-lg bg-white my-3 flex-1 flex flex-wrap gap-x-5 gap-y-5"
      onSubmit={handleSubmit}
    >

      <DateTime
        placeholder="Start Date"
        customState={{
          val: startDate,
          setter: setStartDate
        }}
        name="startDate"
        required={false}
        customCss="flex-none md:min-w-[240px]"

      />
      <DateTime
        placeholder="End Date"
        customState={{
          val: endDate,
          setter: setEndDate
        }}
        name="endDate"
        min={startDate}
        required={false}
        customCss="flex-none md:min-w-[240px]"
      />

      <Button
        className="date-filter-color"
        variant={'secondary'}
        type="submit"
      >
        Apply
      </Button>
      <Button
        className="date-filter-color"
        variant={'secondary'}
        type="button"
        onClick={clearFilters}
      >
        Clear
      </Button>
    </form>
  );
};

export default DateFilters;
