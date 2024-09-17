import ErrorScreen from "@/components/customUI/ErrorScreen";
import Graph from "@/components/customUI/Graph";
import Spinner from "@/components/customUI/Loaders/Spinner";
import Button from "@/components/ui/button";
import { dateDiffInDays, prepareChartData } from "@/lib/utils";
import { useState, useCallback, FC } from "react";
import { MeterProfileQueryParams, ModifiedGroup } from "@/store/hes/types/records/meter-profile-data-metrics";
import { SerializedError } from "@reduxjs/toolkit";
import DateTimeRange from "@/components/customUI/Date/DateTimeRange";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useToast } from "@/components/ui/use-toast";


interface DateTimeBarGraphProps {
    data: ModifiedGroup | undefined;
    isFetching: boolean;
    isError: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    dateStep?: string;
    setQuery: React.Dispatch<React.SetStateAction<MeterProfileQueryParams>>;
}

const DateTimeBarGraph: FC<DateTimeBarGraphProps> = ({
    data, isFetching, isError, error, dateStep, setQuery
}) => {

    const { toast } = useToast();
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const days = dateDiffInDays(startDateTime, endDateTime)
        if(days > 7){
          return toast({
            variant: "default",
            title: "Invalid Date Time Range",
            description: "Start date - end date diff should not be greater than 7 days",
          })
        }
        setQuery({
            from: startDateTime.split("T").join(" ") + ":00",
            to: endDateTime.split("T").join(" ") + ":00"
        });
    }, [startDateTime, endDateTime, setQuery, toast]);

    const resetFilters = useCallback(() => {
        setQuery({});
        setStartDateTime("");
        setEndDateTime("");
    }, [setQuery, setStartDateTime, setEndDateTime]);

    const max = new Date().toISOString().slice(0, 19);
    const blockLoadDailyChartData = data ? prepareChartData(data, 'bar', 'days') : null;

    return (
        <>
            <form
                className="flex gap-3 self-end mt-4"
                onSubmit={handleSubmit}
            >
                <DateTimeRange
                    start={{
                        step: dateStep,
                        name: "from",
                        max,
                        required: true,
                        customState: {
                            val: startDateTime,
                            setter: setStartDateTime
                        }
                    }}
                    end={{
                        step: dateStep,
                        name: "to",
                        max,
                        required: true,
                        customState: {
                            val: endDateTime,
                            setter: setEndDateTime
                        }
                    }}
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
                    onClick={resetFilters}
                >
                    Clear
                </Button>
            </form>
            {
                isError ? <ErrorScreen error={error as object} /> :
            <>
                {!isFetching ?
                    <>
                        {blockLoadDailyChartData && (
                            <div className="p-5 rounded-lg bg-white h-[35vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh] graph-border my-4">
                                <Graph
                                    title={'Day Range'}
                                    type="bar"
                                    data={blockLoadDailyChartData}
                                />
                            </div>
                        )}                
                    </> :
                    <div className="h-[60vh] flex items-center justify-center">
                        <Spinner />
                    </div>
                }
            </>
            }
        </>
    )
}

export default DateTimeBarGraph