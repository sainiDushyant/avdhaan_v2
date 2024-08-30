
import { flexRender } from "@tanstack/react-table"
import {
    Table, TableBody,
    TableCell, TableHead,
    TableHeader, TableRow,
} from "@/components/ui/table";
import { type MainTableProps } from "../types";
import { cn } from "@/lib/utils";

function MainTable<T>({
    table, columns
}: MainTableProps<T>) {
    return (
        <Table className="">
            <TableHeader className="table-header">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow 
                        key={headerGroup.id}
                    >
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id} className="text-nowrap font-bold text-[#0A3690] text-xs h-[38px]">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody className="bg-white">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row, index) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className={cn("hover:bg-[none]", index % 2 !== 0 && "bg-[#F3F9F9]")}
                        >
                            {row.getVisibleCells().map((cell, ) => (
                                <TableCell key={cell.id} className="h-[52px] text-xs lg:text-sm text-nowrap text-[#464E5F]">
                                    {
                                        cell.getValue() === "" ? "--" :
                                            flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>

        </Table>
    )
}

export default MainTable