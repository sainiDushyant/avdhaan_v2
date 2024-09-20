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
            <DialogTitle className='font-semibold text-xl mt-5 text-[#0A3690]'>
                Command Response Payload
            </DialogTitle>

            <div className='w-full overflow-x-scroll scrollable-content'>
                <table className='pt-5 w-[100%]'>
                    <thead>
                        <tr className='table-header drop-shadow-md'>
                            {headers.map(header => (
                                <th key={header} className='text-nowrap px-3 py-2 text-center'>
                                    <span className='uppercase font-bold text-[#0A3690] text-xs'>
                                        {header}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-white'>
                            {tableData.map((tData, index) => (
                                <td key={`${tData}_${index}`} className='bg-[#F3F9F9] text-nowrap px-3 py-2 text-center'>
                                    <span className='text-xs lg:text-sm text-nowrap text-[#464E5F]'>{tData}</span>
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