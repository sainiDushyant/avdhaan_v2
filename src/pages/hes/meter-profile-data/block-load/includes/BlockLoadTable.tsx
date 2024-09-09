import { useCallback, useState } from 'react';
import DataTable from '@/components/customUI/DataTable';
import Spinner from '@/components/customUI/Loaders/Spinner';
import useGetTableColumns from '@/hooks/useGetTableColumns';
import CaretLeft from '@/components/svg/CaretLeft';
import CaretRight from '@/components/svg/CaretRight';
import Button from '@/components/ui/button';
import { useGetBlockLoadPushDataQuery } from '@/store/hes/hesApi';
import RefreshButton from '@/components/svg/RefreshButton';
import { useLocation } from 'react-router-dom';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import EmptyScreen from '@/components/customUI/EmptyScreen';
import DateTimeFilter from '@/components/customUI/hes/HesFilters/DateTimeFilter';

const BlockLoadTable = () => {
  const [pageCursor, setPageCursor] = useState('');
  const { search } = useLocation();
  const [query, setQuery] = useState<string>('');
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: refresh
  } = useGetBlockLoadPushDataQuery({
    searchQuery: `${search ? search : '?'}${query}${pageCursor}`
  });

  const tableData = response?.records || [];
  const cursor = response?.cursor || {};

  const columns = useGetTableColumns({ cols: tableData, query: [] });

  const getNewRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`after_cursor=${val}`);
    },
    [setPageCursor]
  );

  const getOldRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`before_cursor=${val}`);
    },
    [setPageCursor]
  );

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />;
  if (!response)
    return (
      <EmptyScreen title={`deviceMetaInfoMetricsResponse not available`} />
    );

  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="flex flex-col min-h-[60vh]">
        {!isFetching ? (
          <>
            <div className="self-end flex gap-2 items-center">
              <div>
                <DateTimeFilter queryUpdater={setQuery} />
              </div>
              <Button
                variant={'ghost'}
                className="refresh-button"
                onClick={refresh}
              >
                <RefreshButton />
              </Button>
            </div>

            <DataTable columns={columns} data={tableData} />
          </>
        ) : (
          <div className="flex flex-1 min-h-[60vh] justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
      {!isError && (
        <div className="self-end">
          <Button
            variant="ghost"
            disabled={!cursor.before}
            onClick={() => getOldRecords(cursor.before)}
          >
            <CaretLeft />
          </Button>
          <Button
            variant="ghost"
            disabled={!cursor.after}
            onClick={() => getNewRecords(cursor.after)}
          >
            <CaretRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlockLoadTable;
