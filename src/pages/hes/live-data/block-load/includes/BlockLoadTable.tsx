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
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';


const BlockLoadTable = () => {

  const { search } = useLocation();
  const [pageCursor, setPageCursor] = useState('');

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: refresh
  } = useGetBlockLoadPushDataQuery({
    searchQuery: `${search ? `${search}&` : "?"}${pageCursor}`
  });

  const tableData = response?.records || [];
  const cursor = response?.cursor || {};

  const columns = useGetTableColumns({ cols: tableData, query: [] });

  const getNewRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`afterCursor=${val}`);
    },
    [setPageCursor]
  );

  const getOldRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`beforeCursor=${val}`);
    },
    [setPageCursor]
  );

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response) return ( <EmptyScreen title={`deviceMetaInfoMetricsResponse not available`} /> );
  

  return (
    <div className="flex-1 flex flex-col px-2 ">
      <div className="flex flex-1 min-h-[60vh]">
        {!isFetching ? (
          <div className="flex flex-col w-full">
            <div className="self-end">
              <Button
                variant={'ghost'}
                className="refresh-button"
                onClick={refresh}
              >
                <RefreshButton />
              </Button>
            </div>
            <div>
              <DataTable columns={columns} data={tableData} />
            </div>
          </div>
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
