import { FC, useMemo, useState } from 'react';
import { useGetCommandExecutionHistoryQuery } from '@/store/hes/hesApi';
import {
  capitalizeFirstLetter,
  getCommandExecutionHistoryUrlSearchParams
} from '../utils';
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
  const columnPinning = {
    left: ['STATUS'], // This code will display the column with column ID on the leftmost side of the table but it will only work if the id is present in the element in the columns array. In this case there is ID present as it is an action item.
    right: []
  };

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
          {response.data.records[0].args &&
            Object.keys(response.data.records[0].args.value).filter((e) => e)
              .length > 0 && (
              <div className="mb-2 flex gap-2 items-center">
                <div className="font-bold text-[#7C818C]">
                  Command Arguments
                </div>
                <ul className="flex gap-2 text-sm">
                  {Object.entries(response.data.records[0].args.value).map(
                    ([key, value]) => (
                      <li className="" key={key}>
                        {`${capitalizeFirstLetter(key)} : ${value}`}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          <DataTable
            columns={columns}
            columnPinning={columnPinning}
            data={response.data.records}
          />
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
