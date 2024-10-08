import { useCallback, useState } from 'react';
import { useGetConfigureCommandInfoQuery } from '@/store/hes/hesApi';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import useGetTableColumns, { ActionType } from '@/hooks/useGetTableColumns';
import Spinner from '@/components/customUI/Loaders/Spinner';
import DataTable from '@/components/customUI/DataTable';
import { useLocation } from 'react-router-dom';
import CursorPagination from '@/components/customUI/CursorPagination';
import { ConfigureCommandRecord } from '@/store/hes/types/records/configure-command';
import UpdateCommands from './include/UpdateCommands';

const ConfigureCommand = () => {
  const { search } = useLocation();
  const [pageCursor, setPageCursor] = useState('');
  const searchQuery = `${search ? `${search}&` : '?'}${pageCursor}`;

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = useGetConfigureCommandInfoQuery({ searchQuery: searchQuery });

  const getNewRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`before_cursor=${val}`);
    },
    [setPageCursor]
  );

  const getOldRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`after_cursor=${val}`);
    },
    [setPageCursor]
  );

  const deviceActions: ActionType<ConfigureCommandRecord>[] = [
    { element: UpdateCommands, actionCb: refetch }
  ];

  const tableData = response?.data?.records || [];
  const columns = useGetTableColumns({
    cols: tableData,
    query: [
      'argsType',
      'argsMode',
      'params',
      'commandType',
      'timeout',
      'retryCount',
      'commandID'
    ],
    action: deviceActions
  });

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />;
  if (!response) return <EmptyScreen title={`commands not available`} />;

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex flex-col py-4">
        <h1 className="capitalize secondary-title lg:main-title">
          <span className="font-bold text-[#0A3690]">Configure Command</span>
        </h1>

        {!isFetching ? (
          <DataTable columns={columns} data={tableData} />
        ) : (
          <div className="min-h-[80vh] flex items-center justify-center">
            <Spinner />
          </div>
        )}

        {!isFetching && !isError && (
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
    </div>
  );
};

export default ConfigureCommand;
