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
  if (Array.isArray(data[0])) {
    return (
      <>
        {(data as CommandResponseTableRecord[][]).map((subArray, index) => {
          const columns = useGetTableColumns({
            cols: subArray,
            query: []
          });
          return <DataTable key={index} data={subArray} columns={columns} />;
        })}
      </>
    );
  } else {
    const columns = useGetTableColumns({
      cols: data as CommandResponseTableRecord[],
      query: []
    });
    return (
      <div className="graph-border">
        <DataTable
          data={data as CommandResponseTableRecord[]}
          columns={columns}
        />
      </div>
    );
  }
};

export default CommandResponseTable;
