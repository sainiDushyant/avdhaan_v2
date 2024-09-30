import { FC } from 'react';
import { CommandInfoRecordTransformed } from '@/store/hes/types/records/command-execution';

interface DisabledFiltersProps {
    command: CommandInfoRecordTransformed;
}

const DisabledFilters: FC<DisabledFiltersProps> = ({ command }) => {
    return (
        <div className='flex-0 border border-[#ccc] rounded-md h-[38px] flex items-center gap-x-5 px-3 cursor-not-allowed'>
            <p className='font-light'>Retry: <span className='font-medium'>{command.retryCount}</span></p>
            <p className='font-light'>Delay: <span className='font-medium'>{command.timeout}</span></p>
        </div>
    )
}

export default DisabledFilters