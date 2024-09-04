import { FC, useCallback, useEffect, useState } from 'react';
import DataTable from '@/components/customUI/DataTable';
import Spinner from '@/components/customUI/Loaders/Spinner';
import useGetTableColumns from '@/hooks/useGetTableColumns';
import CaretLeft from '@/components/svg/CaretLeft';
import CaretRight from '@/components/svg/CaretRight';
import Button from '@/components/ui/button';
import BoxContainer from '@/components/customUI/BoxContainer';
import { useGetDailyLoadPushDataQuery } from '@/store/hes/hesApi';
import RefreshButton from '@/components/svg/RefreshButton';
interface TableProps {
  groupName: string;
  search: string;
}

const DailyLoadTable: FC<TableProps> = ({ search }) => {
  const [query, setQuery] = useState(search);
  const [pageCursor, setPageCursor] = useState('');

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    refetch: refresh
  } = useGetDailyLoadPushDataQuery({
    searchQuery: `?${query}${pageCursor}`
  });

  const tableData = response?.records || [];
  const cursor = response?.cursor || {};

  const columns = useGetTableColumns({ cols: tableData, query: [] });

  const getNewRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`&afterCursor=${val}`);
    },
    [setPageCursor]
  );

  const getOldRecords = useCallback(
    (val: string | null | undefined) => {
      if (!val) return;
      setPageCursor(`&beforeCursor=${val}`);
    },
    [setPageCursor]
  );

  if (isLoading)
    return (
      <BoxContainer>
        <Spinner />
      </BoxContainer>
    );

  if (isError)
    return (
      <BoxContainer>
        <strong>Something went wrong, please refresh the page! </strong>
      </BoxContainer>
    );

  return (
    <div className="flex-1 flex flex-col w-full px-2 ">
      <div className="flex flex-1 min-h-[60vh] items-center justify-center">
        {!isFetching ? (
          <div className="w-full flex flex-col">
            <div className="self-end">
              <Button
                variant={'ghost'}
                className="refresh-button"
                onClick={refresh}
              >
                <RefreshButton />
              </Button>
            </div>
            <DataTable columns={columns} data={tableData} />{' '}
          </div>
        ) : (
          <Spinner />
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

export default DailyLoadTable;
