import { FC, useCallback, useEffect } from "react";
import CursorPagination from "@/components/customUI/CursorPagination";
import DataTable from "@/components/customUI/DataTable";
import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import Spinner from "@/components/customUI/Loaders/Spinner";
import useGetTableColumns from "@/hooks/useGetTableColumns";
import ToggleCategory from "./ToggleSubCategory";
import { MeterProfileDataTableNewResponse } from "@/store/hes/types";
import Header from "./Header";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { MeterProfileQueryParams } from "@/store/hes/types/records/meter-profile-data-metrics";
import { useSelector } from "@/store";

interface MetricProfileTableProps {
    response: MeterProfileDataTableNewResponse | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    query: MeterProfileQueryParams;
    dateStep?: string;
    filterType: "datetime" | "monthyear";
    setQuery: React.Dispatch<React.SetStateAction<MeterProfileQueryParams>>;
    refresh: () => void;
}

const MetricProfileTable: FC<MetricProfileTableProps> = ({
    response, isLoading, isFetching, 
    isError, error, query, dateStep, filterType,
    setQuery, refresh
}) => {

    const mainFilterLoading = useSelector(state => state.hes.mainFilterLoading);
    const tableData = response?.data.records || [];
    const columns = useGetTableColumns({ cols: tableData, query: [] });
  
    const getNewRecords = useCallback((val?: string | null) => {
      if (!val) return;
      setQuery(prevParams => {
        const params = { ...prevParams };
        params["before_cursor"] = val;
        if (params["after_cursor"]) {
          delete params['after_cursor']
        }
        return params;
      })
    }, [setQuery]);
  
    const getOldRecords = useCallback((val?: string | null) => {
      if (!val) return;
      setQuery(prevParams => {
        const params = { ...prevParams };
        params["after_cursor"] = val;
        if (params["before_cursor"]) {
          delete params['before_cursor']
        }
        return params;
      })
    }, [setQuery]);

    useEffect(() => {
      if(mainFilterLoading){
        setQuery(prevData  => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { after_cursor, before_cursor, ...rest } = prevData;
          return rest
        })
      }
    }, [ mainFilterLoading, setQuery ])
  
    if (isLoading) return <FullScreen hasSpinner={true} />;
    if (isError) return <ErrorScreen error={error as object} />;
    if (!response) return <EmptyScreen title={`Meter profile data not available`} />
  
    return (
      <div className="flex-1 flex flex-col w-full mt-10">
  
        <ToggleCategory query={query} setQuery={setQuery} />
        <Header  
          filterType={filterType}
          dateStep={dateStep} 
          query={query} 
          setQuery={setQuery} 
          refresh={refresh} 
        />
  
        {!isFetching ?
          <DataTable columns={columns} data={tableData} /> :
          <div className="flex flex-1 min-h-[60vh] justify-center items-center">
            <Spinner />
          </div>
        }
  
        {!isError && (
          <CursorPagination
            afterCursor={response.data.cursor.after}
            beforeCursor={response.data.cursor.before}
            disabled={isFetching}
            customCss="self-end"
            getOldRecords={getOldRecords}
            getNewRecords={getNewRecords}
          />
        )}
      </div>
    );
}

export default MetricProfileTable