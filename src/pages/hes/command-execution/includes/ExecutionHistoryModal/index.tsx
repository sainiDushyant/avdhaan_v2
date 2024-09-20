import { FC, useMemo, useState } from 'react'
import BaseModal from '@/components/customUI/Modals';
import Eye from '@/components/svg/Eye';
import EyeClose from '@/components/svg/EyeClose';
import { useGetCommandExecutionHistoryQuery } from '@/store/hes/hesApi';
import { getCommandExecutionHistoryUrlSearchParams } from '../utils';
import useGetTableColumns, { ActionType } from '@/hooks/useGetTableColumns';
import DataTable from '@/components/customUI/DataTable';
import CommandHistoryHelper from './CommandHistoryHelper';
import CommandHistoryFilters from '../CommandHistoryFilters';
import CommandHistoryCursor from './CommandHistoryCursor';
import { DialogTitle } from '@radix-ui/react-dialog';
import Spinner from '@/components/customUI/Loaders/Spinner';
import {
    BatchCommandHistoryRecord,
    CommandHistoryQueryParams,
    CommandHistoryRecord
} from '@/store/hes/types/records/command-execution';
import BatchStatus from './BatchStatus';

interface ExecutionHistoryProps {
    data: BatchCommandHistoryRecord;
    cb?: () => void
}

const ExecutionHistory: FC<ExecutionHistoryProps> = ({ data }) => {

    const batchId = data.batchId;
    const [query, setQuery] = useState<CommandHistoryQueryParams>({});
    const [open, setOpen] = useState(false);

    const urlSearchParams = useMemo(() => {
        return getCommandExecutionHistoryUrlSearchParams({
            query, search: "", postFix:`batch_id=${batchId}&limit=5`
        });
    }, [query, batchId]);

    const {
        data: response, isLoading,
        isFetching, isError, error, refetch
    } = useGetCommandExecutionHistoryQuery({ searchParams: urlSearchParams },
        { refetchOnMountOrArgChange: true, skip: !open }
    );

    const batchCommandHistoryActions: ActionType<CommandHistoryRecord>[] = [
        { element: BatchStatus }
      ]

    const columns = useGetTableColumns({
        cols: response?.data.records || [],
        customId: "executionId",
        query: ["executionStatus", "colorCode", "args"],
        action: batchCommandHistoryActions,
        // getLink: (id) => `/hes/command-execution/${id}`,
    });

    if (!batchId) return <EyeClose />

    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            modalClass="max-w-[80vw] py-0 flex flex-col"
            ButtonLogo={Eye}
        >
            <DialogTitle className='font-semibold text-xl mt-5'>
                Command History
            </DialogTitle>

            <div className='w-full pt-5 flex justify-between'>
                <CommandHistoryFilters
                    hideNameFilter={true}
                    showDeviceIdentifier={true}
                    noSearchParams={true}
                    setQuery={setQuery}
                    refetchCommandExecutionHistory={refetch}
                />
                {isFetching && <Spinner />}
            </div>

            <CommandHistoryHelper 
                isLoading={isLoading} 
                isError={isError} error={error as object} 
            />

            {
                response && !isError &&
                <div className="flex flex-col max-w-[75vw] min-h-[50vh]">
                    <DataTable
                        columns={columns}
                        data={response.data.records}
                    />
                    <CommandHistoryCursor 
                        isFetching={isFetching}
                        cursor={response.data.cursor} 
                        setQuery={setQuery} 
                    />
                </div>
            }
        </BaseModal>
    )
}

export default ExecutionHistory