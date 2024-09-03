import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  TableState,
  useReactTable,
  type SortingState
} from "@tanstack/react-table";
import Header from "./includes/Header";
import MainTable from "./includes/MainTable";
import { type DataTableProps } from "./types";
import { useMemo, useState } from "react";
import Footer from "./includes/Footer";

function DataTable<T>({
  data, columns,
  showFilter,
  filterBy,
  refresh,
  refreshFn,
  search,
  selectComponent: SelectComponent,
  hasInternalPagination,
  onSelectSubmit,
}: DataTableProps<T>) {

  filterBy = filterBy || ["name"];
  const showSelectedInfo = SelectComponent !== undefined;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const selectedItems = useMemo(() => {
    return Object.keys(rowSelection).map((dataIndex) => {
      const dataItem = data.at(Number(dataIndex)) as T;
      return dataItem;
    });
  }, [data, rowSelection]);

  const tableState: Partial<TableState> = {
    sorting,
    rowSelection
  }

  if (!hasInternalPagination) {
    tableState['pagination'] = {
      pageIndex: 0,
      pageSize: data.length,
    }
  }

  const table = useReactTable({
    data, columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: tableState
  });

  return (
    <>
      <div className="overflow-scroll flex-1 relative scrollable-content">
        {
          table &&
          <Header
            search={search}
            dataLength={data.length}
            showFilter={showFilter}
            filterBy={filterBy}
            table={table}
            refresh={refresh}
            refreshFn={refreshFn}
          />
        }

        {showSelectedInfo &&
          <div className="relative h-[50px] w-full">
            <SelectComponent
              selected={selectedItems}
              onSelectSubmit={onSelectSubmit}
            />
          </div>
        }

        <MainTable
          table={table}
          columns={columns}
        />
      </div>
      {hasInternalPagination &&
        data.length > 10 && <Footer table={table} />
      }
    </>
  )
}

export default DataTable;
