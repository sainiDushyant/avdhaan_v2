import { FC, useCallback } from "react";
import { CommandHistoryQueryParams } from "@/store/hes/types/records/command-execution";
import CursorPagination from "@/components/customUI/CursorPagination";

interface CommandHistoryCursorProps {
    isFetching: boolean;
    cursor: {
        after: string | null;
        before: string | null;
    };
    setQuery: React.Dispatch<React.SetStateAction<CommandHistoryQueryParams>>;
}

const CommandHistoryCursor: FC<CommandHistoryCursorProps> = ({
    isFetching, cursor, setQuery,
}) => {

    const getNewRecords = useCallback((val?: string | null) => {
        if (!val) return;
        setQuery(prevParams => {
            const params = { ...prevParams };
            params["before_cursor"] = val;
            if (params["after_cursor"]) {
                delete params['after_cursor']
            }
            return params;
        })
    }, [setQuery]);

    const getOldRecords = useCallback((val?: string | null) => {
        if (!val) return;
        setQuery(prevParams => {
            const params = { ...prevParams };
            params["after_cursor"] = val;
            if (params["before_cursor"]) {
                delete params['before_cursor']
            }
            return params;
        })
    }, [setQuery]);

    return (
        <CursorPagination 
            afterCursor={cursor.after} 
            beforeCursor={cursor.before} 
            disabled={isFetching}
            customCss="self-end"
            getOldRecords={getOldRecords} 
            getNewRecords={getNewRecords} 
        />
    )
}

export default CommandHistoryCursor