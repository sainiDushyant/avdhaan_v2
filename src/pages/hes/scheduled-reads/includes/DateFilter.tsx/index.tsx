import { FC, useCallback, useState } from "react";
import { QueryType } from "@/pages/hes/scheduled-reads";
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { dateDiffInDays } from "@/lib/utils";
import DateRange from "@/components/customUI/Date/DateRange";
import RefreshButton from "@/components/svg/RefreshButton";

interface DateFiltersProps {
  setQuery: React.Dispatch<React.SetStateAction<QueryType>>;
  refresh: () => void;
}

const DateFilters: FC<DateFiltersProps> = ({ setQuery, refresh }) => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("")

  const date = new Date().toISOString();
  const max = date.split("T")[0];

  const clearFilters = useCallback(() => {
    setQuery({ "from": "", "to": "" })
    setStartDate("")
    setEndDate("")
  }, [setQuery, setStartDate, setEndDate]);


  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const diffInDays =  dateDiffInDays(startDate, endDate)
      if (diffInDays > 7) {
        return toast({
          variant: "default",
          title: "Invalid Date Range",
          description: "Start date - end date diff should not be greater than 7 days",
        })
      }
      setQuery({ from: `${startDate} 00:00:00`, to: `${endDate} 00:00:00` });
    },
    [setQuery, startDate, endDate]
  );


  return (
    <form
      className='flex flex-wrap gap-3 lg:justify-end mt-5'
      onSubmit={handleSubmit}
    >

        <DateRange 
          start={{
            max,
            name: "from",
            required: true,
            customState: {
              val: startDate,
              setter: setStartDate
            }
          }}
          end={{
            max,
            name: "to",
            required: true,
            customState: {
              val: endDate,
              setter: setEndDate
            }
          }}
          customCss={"flex-none xl:flex-none md:min-w-[220px]"}
        />

      <Button
        type="submit"
        className="date-filter-color"
        variant={'secondary'}
      >
        Apply
      </Button>
      <Button
        type="button"
        className="destroy-filter-color"
        variant={'secondary'}
        onClick={clearFilters}
      >
        Clear
      </Button>

      <Button
        type="button"
        variant={'ghost'}
        className="refresh-button p-0 min-w-[35px]"
        onClick={refresh}
      >
        <RefreshButton />
      </Button>
    </form>
  );
};

export default DateFilters;
