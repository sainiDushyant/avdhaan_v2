import { useCallback, useState } from 'react';
import { prepareChartData } from '@/lib/utils';
import Graph from '@/components/customUI/Graph';
import Spinner from '@/components/customUI/Loaders/Spinner';
import TimeRange from '@/components/customUI/Date/TimeRange';
import Button from '@/components/ui/button';
import { useGetLiveDataMetricsQuery } from '@/store/hes/hesApi';
import { useLocation } from 'react-router-dom';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import { MeterProfileQueryParams } from '@/store/hes/types/records/meter-profile-data-metrics';

const TimeRangeBlockLoad = () => {

    const { search } = useLocation();

    const [query, setQuery] = useState<MeterProfileQueryParams>({});
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const getUrlSearchParams = useCallback((params: MeterProfileQueryParams, preFix: string) => {
        return (search ? `${search}&` : `?`) + `${preFix}&from=${params.from || ""}&to=${params.to || ""}`
    }, [search])

    const {
        data: blockLoadData,
        isFetching,
        isError,
        error,
    } = useGetLiveDataMetricsQuery({
        searchQuery: getUrlSearchParams(query, "data_type=blockload")
    });

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const today = new Date().toISOString().slice(0, 10);
        setQuery({
            from: `${today} ${startTime}:00`,
            to: `${today} ${endTime}:00` 
        })
    }, [startTime, endTime, setQuery]);

    const resetFilters = useCallback(() => {
        setQuery({});
        setStartTime("");
        setEndTime("");
    }, [setQuery, setStartTime, setEndTime]);

    const max = new Date().toISOString().split('T')[0] + 'T23:59';
    const blockLoadChartData = blockLoadData ?
        prepareChartData(blockLoadData.blockLoadMetrics, 'line', 'time') : null;

    return (
        <>
            <form
                className="flex gap-3 self-end mt-4"
                onSubmit={handleSubmit}
            >
                <TimeRange
                    start={{
                        step: "900",
                        name: "from",
                        max,
                        required: true,
                        customState: {
                            val: startTime,
                            setter: setStartTime
                        }
                    }}
                    end={{
                        step: "900",
                        name: "to",
                        max,
                        required: true,
                        customState: {
                            val: endTime,
                            setter: setEndTime
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
                isError ? <ErrorScreen error={error} /> :
                    <>
                        {!isFetching ?
                            <>
                                {blockLoadChartData && (
                                    <div className="p-5 rounded-lg bg-white h-[35vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh] graph-border my-4">
                                        <Graph title={'Time Range'} data={blockLoadChartData} />
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

export default TimeRangeBlockLoad