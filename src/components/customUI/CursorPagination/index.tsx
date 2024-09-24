import { FC } from 'react';
import CaretLeft from '@/components/svg/CaretLeft'
import CaretRight from '@/components/svg/CaretRight'
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CursorPaginationProps {
    afterCursor?: string | null;
    beforeCursor?: string | null;
    customCss?: string;
    disabled?: boolean;
    getOldRecords: (val?: string | null) => void;
    getNewRecords: (val?: string | null) => void;
  }

const CursorPagination: FC<CursorPaginationProps> = ({ 
    afterCursor, beforeCursor, 
    disabled, customCss,
    getOldRecords, getNewRecords
}) => {

    if(!afterCursor && !beforeCursor) return null;

    return (
        <div className={cn(customCss)}>
            <Button
                variant="ghost"
                disabled={!beforeCursor || disabled}
                onClick={() => getNewRecords(beforeCursor)}
            >
                <CaretLeft />
            </Button>
            <Button
                variant="ghost"
                disabled={!afterCursor || disabled}
                onClick={() => getOldRecords(afterCursor)}
            >
                <CaretRight />
            </Button>
        </div>
    )
}

export default CursorPagination