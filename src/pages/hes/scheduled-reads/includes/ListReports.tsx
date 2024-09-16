import { FC } from "react";
import DataTable from "@/components/customUI/DataTable";
import useGetTableColumns from "@/hooks/useGetTableColumns";
import { FlattenedScheduledCommandRecord } from "@/store/hes/types/records/reports";

interface ListReportsProps {
  data: FlattenedScheduledCommandRecord[];
}

const ListReports: FC<ListReportsProps> = ({ data }) => {

  const columns = useGetTableColumns({ cols: data, query: ["totalCommands"] });
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
};

export default ListReports;