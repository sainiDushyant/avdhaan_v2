import CaretLeft from '@/components/svg/CaretLeft'
import CaretRight from '@/components/svg/CaretRight'
import Button from '@/components/ui/button';
import { CursorPaginationProps } from '@/store/vee/types/other';
import { FC, useCallback,  useState } from 'react';

const CursorPagination: FC<CursorPaginationProps> = ({ afterCursor, beforeCursor, prefetchCursor }) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ selectedFilters, _ ] = useState<CursorPaginationProps>({ 
        beforeCursor: null, afterCursor: null 
    });

    const prefetchOldRecords = useCallback((val: string | null) => {
        if (!val) return;
        if (!prefetchCursor) return;
        prefetchCursor({
            ...selectedFilters, afterCursor: val, beforeCursor: null
        }, { ifOlderThan: 35 });
    }, [prefetchCursor, selectedFilters])

    const getOldRecords = useCallback((val: string | null) => {
        console.log(val);
    }, []);

    const getNewRecords = useCallback((val: string | null) => {
        if (!val) return;
    }, [])

    return (
        <div>
            <Button
                variant="ghost"
                disabled={!beforeCursor}
                onClick={() => getNewRecords(beforeCursor)}
            >
                <CaretLeft />
            </Button>
            <Button
                variant="ghost"
                disabled={!afterCursor}
                onClick={() => getOldRecords(afterCursor)}
                onMouseEnter={() => prefetchOldRecords(afterCursor)}

            >
                <CaretRight />
            </Button>
        </div>
    )
}

export default CursorPagination