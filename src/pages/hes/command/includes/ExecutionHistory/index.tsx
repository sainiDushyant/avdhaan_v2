import { FC, useMemo, useState } from 'react';
import { useGetCommandExecutionHistoryQuery } from '@/store/hes/hesApi';
import { getCommandExecutionHistoryUrlSearchParams } from '../utils';
import useGetTableColumns, { ActionType } from '@/hooks/useGetTableColumns';
import DataTable from '@/components/customUI/DataTable';
import CommandHistoryHelper from './CommandHistoryHelper';
import CommandHistoryFilters from '../CommandHistoryFilters';
import CommandHistoryCursor from './CommandHistoryCursor';
import Spinner from '@/components/customUI/Loaders/Spinner';
import {
  CommandHistoryQueryParams,
  CommandHistoryRecord
} from '@/store/hes/types/records/command-execution';
import BatchStatus from './BatchStatus';
import { useLocation } from 'react-router-dom';
import BreadCrumbs from './BreadCrumbs';
import ToggleRows from './ToggleRows';
import CommandDetailsModal from './CommandDetailsModal';

const ExecutionHistory: FC = () => {
  const { state } = useLocation();
  const [limit, setLimit] = useState<string>('10');
  const batchId = state;
  const [query, setQuery] = useState<CommandHistoryQueryParams>({});

  const urlSearchParams = useMemo(() => {
    return getCommandExecutionHistoryUrlSearchParams({
      query,
      search: '',
      postFix: `batch_id=${batchId}&limit=${limit}`
    });
  }, [query, batchId, limit]);

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = useGetCommandExecutionHistoryQuery(
    { searchParams: urlSearchParams },
    { refetchOnMountOrArgChange: true }
  );

  const batchCommandHistoryActions: ActionType<CommandHistoryRecord>[] = [
    { element: BatchStatus, colName: 'STATUS' },
    { element: CommandDetailsModal }
  ];

  const columns = useGetTableColumns({
    cols: response?.data.records || [],
    customId: 'executionId',
    query: ['executionStatus', 'colorCode', 'args'],
    action: batchCommandHistoryActions
  });

  return (
    <div className="flex flex-col min-h-[74vh] w-full overflow-x-scroll px-3">
      <BreadCrumbs />
      <div className="w-full  pt-5 flex justify-between">
        <CommandHistoryFilters
          hideNameFilter={true}
          showDeviceIdentifier={true}
          noSearchParams={true}
          setQuery={setQuery}
          refetchCommandExecutionHistory={refetch}
        />
        {isFetching && <Spinner />}
      </div>

      <CommandHistoryHelper
        isLoading={isLoading}
        isError={isError}
        error={error as object}
      />

      {response && !isError && (
        <div className="flex flex-col w-full ">
          <DataTable columns={columns} data={response.data.records} />
          <div className="flex items-center justify-between">
            <ToggleRows limit={limit} setLimit={setLimit} title="Row Count" />
            <CommandHistoryCursor
              isFetching={isFetching}
              cursor={response.data.cursor}
              setQuery={setQuery}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutionHistory;
