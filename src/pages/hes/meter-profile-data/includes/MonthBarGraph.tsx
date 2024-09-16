import ErrorScreen from "@/components/customUI/ErrorScreen";
import Graph from "@/components/customUI/Graph";
import Spinner from "@/components/customUI/Loaders/Spinner";
import Button from "@/components/ui/button";
import { dateDiffInMonths, prepareChartData } from "@/lib/utils";
import { useState, useCallback, FC } from "react";
import { MeterProfileQueryParams, ModifiedGroup } from "@/store/hes/types/records/meter-profile-data-metrics";
import { SerializedError } from "@reduxjs/toolkit";
import MonthYearRange from "@/components/customUI/Date/MonthYearRange";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { useToast } from "@/components/ui/use-toast";


interface MonthBarGraphProps {
    data: ModifiedGroup | undefined;
    isFetching: boolean;
    isError: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    setQuery: React.Dispatch<React.SetStateAction<MeterProfileQueryParams>>;
}

const MonthBarGraph: FC<MonthBarGraphProps> = ({
    data, isFetching, isError, error,setQuery
}) => {

    const { toast } = useToast();
    const [startMonthYear, setStartMonthYear] = useState("");
    const [endMonthYear, setEndMonthYear] = useState("");

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const months = dateDiffInMonths(startMonthYear, endMonthYear)
        if(months > 7){
          return toast({
            variant: "default",
            title: "Invalid Month Range",
            description: "Start month - end date month should not be greater than 7 months",
          })
        }
        setQuery({
            from: startMonthYear + " 00:00:00",
            to: endMonthYear + " 00:00:00"
        });
    }, [startMonthYear, endMonthYear, setQuery, toast]);

    const resetFilters = useCallback(() => {
        setQuery({});
        setStartMonthYear("");
        setEndMonthYear("");
    }, [setQuery, setStartMonthYear, setEndMonthYear]);

    const max = new Date().toISOString().slice(0, 10);
    const chartData = data ? prepareChartData(data, 'bar', 'month') : null;

    return (
        <>
            <form
                className="flex gap-3 self-end mt-4"
                onSubmit={handleSubmit}
            >
                <MonthYearRange
                    start={{
                        name: "from",
                        max,
                        required: true,
                        customState: {
                            val: startMonthYear,
                            setter: setStartMonthYear
                        }
                    }}
                    end={{
                        name: "to",
                        max,
                        required: true,
                        customState: {
                            val: endMonthYear,
                            setter: setEndMonthYear
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
                        {chartData && (
                            <div className="p-5 rounded-lg bg-white h-[35vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh] graph-border my-4">
                                <Graph
                                    title={'Monthly Range'}
                                    type="bar"
                                    data={chartData}
                                />
                            </div>
                        )}                
                    </> :
                    <div className="h-auto flex items-center justify-center">
                        <Spinner />
                    </div>
                }
            </>
            }
        </>
    )
}

export default MonthBarGraph