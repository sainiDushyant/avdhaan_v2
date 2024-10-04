import { FC, useState } from 'react';
import BaseModal from '@/components/customUI/Modals';
import Eye from '@/components/svg/Eye';
<<<<<<< HEAD
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
=======
import { DialogTitle } from '@radix-ui/react-dialog';
>>>>>>> d90a1f9 (Refacotring Command execution according to the Figma)
import {
  CommandHistoryQueryParams,
  CommandHistoryRecord
} from '@/store/hes/types/records/command-execution';
import { useLocation, useParams } from 'react-router-dom';
<<<<<<< HEAD
import { useSelector } from '@/store';
=======
import { useSelector } from 'react-redux';
>>>>>>> d90a1f9 (Refacotring Command execution according to the Figma)
import { useMemo, useCallback } from 'react';
import {
  getCommandExecutionHistoryUrlSearchParams,
  groupEventDataByDataType
} from '../../utils';
import { useGetCommandExecutionHistoryDetailsQuery } from '@/store/hes/hesApi';
<<<<<<< HEAD
import HesFilters from '@/components/customUI/hes/HesFilters';
import CursorPagination from '@/components/customUI/CursorPagination';
import Spinner from '@/components/customUI/Loaders/Spinner';
import CommandResponseTable from './includes/CommandResponseTable';
import EyeClose from '@/components/svg/EyeClose';
=======
import useGetTableColumns from '@/hooks/useGetTableColumns';
import HesFilters from '@/components/customUI/hes/HesFilters';
import CursorPagination from '@/components/customUI/CursorPagination';
import Spinner from '@/components/customUI/Loaders/Spinner';
import DataTable from '@/components/customUI/DataTable';
import { ExecutionHistoryDetailsRecordModified } from '@/store/hes/types/records/command-execution';
>>>>>>> d90a1f9 (Refacotring Command execution according to the Figma)

type CommandDetailsModalProps = {
  data: CommandHistoryRecord;
};

const CommandDetailsModal: FC<CommandDetailsModalProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { search } = useLocation();
  const commandId = data.executionId;

  const [query, setQuery] = useState<CommandHistoryQueryParams>({});
  const mainFilterLoading = useSelector((state) => state.hes.mainFilterLoading);

  const urlSearchParams = useMemo(() => {
    return getCommandExecutionHistoryUrlSearchParams({
      query,
      search,
      postFix: `execution_id=${commandId}`
    });
  }, [query, search, commandId]);

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error
  } = useGetCommandExecutionHistoryDetailsQuery(
    { searchParams: urlSearchParams },
    { skip: mainFilterLoading || !open }
  );
<<<<<<< HEAD
  const newData = groupEventDataByDataType(response?.data.records || []);
=======
  const newData = groupEventDataByDataType(response?.data.records);
  console.log(newData, 'data');
  const tableData = response?.data.records || [];
  const columns = useGetTableColumns({
    cols: tableData,
    query: ['payload']
  });

>>>>>>> d90a1f9 (Refacotring Command execution according to the Figma)
  const getNewRecords = useCallback(
    (val?: string | null) => {
      if (!val) return;
      setQuery((prevParams) => {
        const params = { ...prevParams };
        params['before_cursor'] = val;
        if (params['after_cursor']) {
          delete params['after_cursor'];
        }
        return params;
      });
    },
    [setQuery]
  );

  const getOldRecords = useCallback(
    (val?: string | null) => {
      if (!val) return;
      setQuery((prevParams) => {
        const params = { ...prevParams };
        params['after_cursor'] = val;
        if (params['before_cursor']) {
          delete params['before_cursor'];
        }
        return params;
      });
    },
    [setQuery]
  );

<<<<<<< HEAD
  const handleModal = () => {
    if (allowedStatus.includes(data.executionStatus)) {
      setOpen(!open);
    }
  };

  return (
    <BaseModal
      open={open}
      setOpen={handleModal}
      modalClass="max-w-[80vw] max-h-[80vh]  py-0 flex flex-col"
      ButtonLogo={allowedStatus.includes(data.executionStatus) ? Eye : EyeClose}
    >
      <DialogTitle className="font-semibold text-xl mt-5 text-[#0A3690]">
        Command Response Payload
        <DialogDescription>
          <span className="text-[#708CC7] text-sm">{`Meter: ${data.deviceSerial}, Command: ${data.commandName}, Execution: ${data.startTime} `}</span>
        </DialogDescription>
      </DialogTitle>
      <div className="overflow-y-scroll w-full p-2 mb-2">
        <div className="flex flex-col gap-3">
          {!isFetching ? (
            newData?.map((ele, i) => {
              return (
                <CommandResponseTable
                  key={i}
                  data={Array.isArray(ele) ? ele : newData}
                />
              );
            })
=======
  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      modalClass="max-w-[80vw] max-h-[80vh] overflow-y-scroll py-0 flex flex-col"
      ButtonLogo={Eye}
    >
      <DialogTitle className="font-semibold text-xl mt-5 text-[#0A3690]">
        Command Response Payload
      </DialogTitle>

      <div className="px-5 py-3 w-full">
        <HesFilters />
        <div className="flex flex-col">
          {!isFetching ? (
            <DataTable columns={columns} data={tableData} />
>>>>>>> d90a1f9 (Refacotring Command execution according to the Figma)
          ) : (
            <div className="min-h-[80vh] flex items-center justify-center">
              <Spinner />
            </div>
          )}
          <CursorPagination
            afterCursor={response?.data?.cursor?.after}
            beforeCursor={response?.data?.cursor?.before}
            disabled={isFetching}
            customCss="self-end"
            getOldRecords={getOldRecords}
            getNewRecords={getNewRecords}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default CommandDetailsModal;
