import { FC, useState } from 'react'
import BaseModal from '@/components/customUI/Modals';
import Eye from '@/components/svg/Eye';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ExecutionHistoryDetailsRecordModified } from '@/store/hes/types/records/command-execution';
import EyeClose from '@/components/svg/EyeClose';

interface ExecutionHistoryProps {
    data: ExecutionHistoryDetailsRecordModified;
    cb?: () => void
}

const ExecutionPayloadModal: FC<ExecutionHistoryProps> = ({ data: { payload } }) => {

    const [open, setOpen] = useState(false);

    const payloadData = payload || {};

    const headers = Object.keys(payloadData);
    const tableData = Object.values(payloadData);

    if (!payload) return <EyeClose />

    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            modalClass="max-w-[80vw] py-0 flex flex-col"
            ButtonLogo={Eye}
        >
            <DialogTitle className='font-semibold text-xl mt-5'>
                Command Response Payload
            </DialogTitle>

            <div className='w-full overflow-x-scroll'>
                <table className='table-fixed pt-5'>
                    <thead>
                        <tr>
                            {headers.map(header => (
                                <th className='border-2 border-black' key={header}>
                                    <span className='uppercase px-3 py-2'>{header}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {tableData.map((tData, index) => (
                                <td className='border-2 border-black' key={`${tData}_${index}`}>
                                    <span className='uppercase px-3 py-2'>{tData}</span>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </BaseModal>
    )
}

export default ExecutionPayloadModal