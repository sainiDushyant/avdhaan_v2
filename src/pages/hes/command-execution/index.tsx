import { useCallback, useMemo, useState } from "react";
import HesFilters from "@/components/customUI/hes/HesFilters"
import CommandForm from "./includes/CommandForm"
import { useGetBatchCommandExecutionHistoryQuery } from "@/store/hes/hesApi"
import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import useGetTableColumns, { ActionType } from "@/hooks/useGetTableColumns";
import Spinner from "@/components/customUI/Loaders/Spinner";
import DataTable from "@/components/customUI/DataTable";
import CommandHistoryFilters from "./includes/CommandHistoryFilters";
import { useLocation } from "react-router-dom";
import { getCommandExecutionHistoryUrlSearchParams } from "./includes/utils";
import ExecutionHistoryModal from "./includes/ExecutionHistoryModal";
import SearchPagination from "@/components/customUI/SearchPagination";
import { 
  BatchCommandHistoryRecord, CommandHistoryQueryParams 
} from "@/store/hes/types/records/command-execution";

const CommandExecution = () => {

  const { search } = useLocation();
  const [query, setQuery] = useState<CommandHistoryQueryParams>({});

  const urlSearchParams = useMemo(() => {
    return getCommandExecutionHistoryUrlSearchParams({ query, search });
  }, [ query, search ]);

  const {
    data: commandExecutionHistoryResponse,
    isLoading: commandExecutionHistoryLoading,
    isFetching: commandExecutionHistoryFetching,
    isError: commandExecutionHistoryHasError,
    error: commandExecutionHistoryError,
    refetch: refetchCommandExecutionHistory
  } = useGetBatchCommandExecutionHistoryQuery({ 
    searchParams: urlSearchParams 
  }, { });

  const commandHistoryActions: ActionType<BatchCommandHistoryRecord>[] = [
    { element: ExecutionHistoryModal, colName: "" },
  ]

  const columns = useGetTableColumns({
    cols: commandExecutionHistoryResponse?.data.records || [],
    query: [],
    action: commandHistoryActions
  });

  if (commandExecutionHistoryLoading) return <FullScreen hasSpinner={true} />;
  if (commandExecutionHistoryHasError) return <ErrorScreen error={commandExecutionHistoryError} />
  if (!commandExecutionHistoryResponse) return (<EmptyScreen title={`command history not available`} />);

  return (
    <div className="px-5 py-3 w-full">
      <HesFilters />
      <CommandForm refetch={refetchCommandExecutionHistory} />
      <div className="flex flex-col py-4">
        <CommandHistoryFilters
          setQuery={setQuery}
          refetchCommandExecutionHistory={refetchCommandExecutionHistory}
        />

        {
          !commandExecutionHistoryFetching ?
            <DataTable
              columns={columns}
              data={commandExecutionHistoryResponse.data.records}
            />
            :
            <div className='min-h-[80vh] flex items-center justify-center'>
              <Spinner />
            </div>
        }

        {commandExecutionHistoryResponse.data.totalCount > 1 && 
          <SearchPagination className="bg-white  p-2 flex-1 overflow-x-scroll justify-end"
            totalCount={commandExecutionHistoryResponse.data.totalCount}
            pageSize={commandExecutionHistoryResponse.data.pageSize}
            pageKey="page"
          />
        }

      </div>
    </div>
  )
}

export default CommandExecution