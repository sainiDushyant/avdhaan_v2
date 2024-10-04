import DataTable from '@/components/customUI/DataTable';
import useGetTableColumns from '@/hooks/useGetTableColumns';
import { FC } from 'react';

type CommandResponseTableRecord = {
  [key: string]: string | number;
};

type CommandResponseTableProps = {
  data: CommandResponseTableRecord[] | CommandResponseTableRecord[][];
};

const CommandResponseTable: FC<CommandResponseTableProps> = ({ data }) => {
  // Check if the data is a 2D array
  if (Array.isArray(data[0])) {
    // If data is a 2D array, render multiple tables
    return (
      <>
        {(data as CommandResponseTableRecord[][]).map((subArray, index) => {
          const columns = useGetTableColumns({
            cols: subArray,
            query: ['dataType']
          });
          return <DataTable key={index} data={subArray} columns={columns} />;
        })}
      </>
    );
  } else {
    // If data is a flat array, render a single table
    const columns = useGetTableColumns({
      cols: data as CommandResponseTableRecord[],
      query: ['dataType']
    });
    return (
      <DataTable
        data={data as CommandResponseTableRecord[]}
        columns={columns}
      />
    );
  }
};

export default CommandResponseTable;
