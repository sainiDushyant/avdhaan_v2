import Button from "@/components/ui/button";
import { useCallback } from "react";
import { Table } from "@tanstack/react-table";

function Footer<T>({ table }: { table: Table<T>}) {

    const onGetNextPage = useCallback(() => {
        table.nextPage()
    }, [table]);

    const onGetPrevPage = useCallback(() => {
        table.previousPage()
    }, [table]);

    return (
        <div className="flex items-center justify-end gap-x-2 mt-4 select-none">
            <Button
                variant="ghost"
                className="secondary-vee-btn select-none"
                size="sm"
                onClick={onGetPrevPage}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>

            <Button
                variant="ghost"
                className="secondary-vee-btn select-none"
                size="sm"
                onClick={onGetNextPage}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>

        </div>
    )
}

export default Footer