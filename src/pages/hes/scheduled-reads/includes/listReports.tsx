import { FC, useEffect, useState } from "react";
import DataTable from "@/components/customUI/DataTable";
import Spinner from "@/components/customUI/Loaders/Spinner";
import useGetTableColumns from "@/hooks/useGetTableColumns";
import BoxContainer from "@/components/customUI/BoxContainer";
import { useGetScheduledReportsQuery } from "@/store/hes/hesApi";
import { FlattenedCommandRecord } from "@/store/hes/types/records/reports";

interface TableProps {
  search: string,
}

const ListReports: FC<TableProps> = ({ search }) => {
  const [query, setQuery] = useState(search);

  const { data: response, isLoading, isFetching, isError, refetch: refresh } = useGetScheduledReportsQuery({
    searchQuery: `?${query}`
  });


  useEffect(() => {
    setQuery(search);
  }, [search]);

  const tableData: FlattenedCommandRecord[] = response?.transformedRecords || [];

  const columns = useGetTableColumns({
    cols: tableData,
    query: [],

  });

  if (isLoading) return (
    <BoxContainer>
      <Spinner />
    </BoxContainer>
  );

  if (isError) return (
    <BoxContainer>
      <strong>Something went wrong, please refresh the page! </strong>
    </BoxContainer>
  );

  return (
    <div className="flex-1 flex flex-col w-full px-2">
      <div className="flex flex-1 min-h-[50vh] items-center justify-center">
        {!isFetching ? (
          <DataTable
            columns={columns}
            data={tableData}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default ListReports;