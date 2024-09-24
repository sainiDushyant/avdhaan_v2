import { useState, useMemo, useCallback } from 'react';
import DataTable from '@/components/customUI/DataTable';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import HesFilters from '@/components/customUI/hes/HesFilters'
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import Spinner from '@/components/customUI/Loaders/Spinner';
import useGetTableColumns, { ActionType } from '@/hooks/useGetTableColumns';
import { useGetCommandExecutionHistoryDetailsQuery } from '@/store/hes/hesApi';
import { useLocation, useParams } from 'react-router-dom';
import { getCommandExecutionHistoryUrlSearchParams } from '../includes/utils';
import { useSelector } from '@/store';
import CursorPagination from '@/components/customUI/CursorPagination';
import ExecutionPayloadModal from './includes/ExecutionPayloadModal';
import { 
  CommandHistoryQueryParams, ExecutionHistoryDetailsRecordModified 
} from '@/store/hes/types/records/command-execution';

const CommandExecutionDetails = () => {

  const { search } = useLocation();
  const { commandId } = useParams()

  const [query, setQuery] = useState<CommandHistoryQueryParams>({  });
  const mainFilterLoading = useSelector(state => state.hes.mainFilterLoading);

  const urlSearchParams = useMemo(() => {
    return getCommandExecutionHistoryUrlSearchParams({ 
      query, search, postFix: `execution_id=${commandId}` 
    });
  }, [ query, search, commandId ]);

  const {
    data: response, isLoading, isFetching, isError, error,
  } = useGetCommandExecutionHistoryDetailsQuery(
    { searchParams: urlSearchParams },
    { skip: mainFilterLoading }
  )

  const commandResponseActions: ActionType<ExecutionHistoryDetailsRecordModified>[] = [
    { element: ExecutionPayloadModal, colName: "PAYLOAD" },
  ]

  const tableData = response?.data.records || [];
  const columns = useGetTableColumns({
    cols: tableData,
    query: ["payload"],
    action: commandResponseActions
  });

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

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response) return (<EmptyScreen title={`command response not available`} />);

  return (
    <div className="px-5 py-3 w-full">
      <HesFilters />
      <div className='flex flex-col'>
      {
        !isFetching ?
          <DataTable
            columns={columns}
            data={tableData}
          />
          :
          <div className='min-h-[80vh] flex items-center justify-center'>
            <Spinner />
          </div>
      }
      <CursorPagination 
            afterCursor={response.data.cursor.after} 
            beforeCursor={response.data.cursor.before} 
            disabled={isFetching}
            customCss="self-end"
            getOldRecords={getOldRecords} 
            getNewRecords={getNewRecords} 
      />
      </div>
    </div>
  )
}

export default CommandExecutionDetails