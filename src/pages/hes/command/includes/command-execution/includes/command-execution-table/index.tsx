import { FC } from 'react';
import { CommandExecutionTableProps } from './types';
import useGetTableColumns from '@/hooks/useGetTableColumns';
import DataTable from '@/components/customUI/DataTable';

type CommandExecutionProps = {
  data: CommandExecutionTableProps;
};

const CommandExecutionTable: FC<CommandExecutionProps> = ({ data }) => {
  // Join all pss_list values into a single string
  const pssListString = data.pss_list.join(', '); // Join pss_list with commas
  // Join all meters values into a single string
  const metersString = data.meters.join(', '); // Join meters with commas

  // Prepare the data to be displayed
  const modifiedDataForTable = [
    {
      pss_list: pssListString,
      meters: metersString
    }
  ];

  const columns = useGetTableColumns({ cols: modifiedDataForTable, query: [] });

  return (
    <div>
      <DataTable columns={columns} data={modifiedDataForTable} />
    </div>
  );
};

export default CommandExecutionTable;
