import { FC, useState } from 'react';
import BaseModal from '@/components/customUI/Modals';
import Eye from '@/components/svg/Eye';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import {
  CommandHistoryQueryParams,
  CommandHistoryRecord
} from '@/store/hes/types/records/command-execution';
import { useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from '@/store';
import { useMemo, useCallback } from 'react';
import {
  getCommandExecutionHistoryUrlSearchParams,
  groupEventDataByDataType
} from '../../utils';
import { useGetCommandExecutionHistoryDetailsQuery } from '@/store/hes/hesApi';
import CursorPagination from '@/components/customUI/CursorPagination';
import Spinner from '@/components/customUI/Loaders/Spinner';
import CommandResponseTable from './includes/CommandResponseTable';
import EyeClose from '@/components/svg/EyeClose';

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

  const { data: response, isFetching } =
    useGetCommandExecutionHistoryDetailsQuery(
      { searchParams: urlSearchParams },
      { skip: mainFilterLoading || !open }
    );

  const allowedStatus = [
    'PARTIAL_SUCCESS',
    'PARTIAL_SUCCESS_AFTER_TIMEOUT',
    'SUCCESS',
    'SUCCESS_AFTER_TIMEOUT',
    'PENDING'
  ];
  const newData = groupEventDataByDataType(
    response?.data.records || [],
    data.commandName
  );
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
            Array.isArray(newData) && Array.isArray(newData[0]) ? (
              newData.map((ele, i) => (
                <CommandResponseTable
                  key={i}
                  data={Array.isArray(ele) ? ele : []}
                />
              ))
            ) : (
              <CommandResponseTable
                data={
                  Array.isArray(newData) && !Array.isArray(newData[0])
                    ? newData
                    : []
                }
              />
            )
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
