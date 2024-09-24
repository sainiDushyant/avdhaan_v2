import UpdateCommandForm from '@/components/customUI/Forms/updateConfigureCommand';
import Spinner from '@/components/customUI/Loaders/Spinner';
import BaseModal from '@/components/customUI/Modals';
import { ConfigureCommandRecord } from '@/store/hes/types/records/configure-command';
import { FC, useCallback, useState, Suspense } from 'react'

interface UpdateCommand {
    data: ConfigureCommandRecord;
    cb?: () => void
}

const ButtonLogo = () => {
    return <img
        src="/assets/images/other/edit.png"
        alt="" height="auto"
        style={{ maxWidth: 20 }}
    />
};

const UpdateCommand: FC<UpdateCommand> = ({ data, cb }) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = useCallback(() => {
        setOpen(false);
        if (cb) cb();
    }, [cb, setOpen])


    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            dialogTitle={`Set Load Limit`}
            buttonClass="primary-vee-btn flex items-center justify-center w-[35px]"
            ButtonLogo={ButtonLogo}
        >
            <Suspense fallback={
                <div className='h-[50vh] flex items-center justify-center'>
                    <Spinner />
                </div>
            }>
                <UpdateCommandForm
                    commandInfo={data}
                    onSubmitCb={handleSubmit}
                />
            </Suspense>
        </BaseModal>
    )
}

export default UpdateCommand