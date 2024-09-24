import { FC, useCallback, useState, lazy, Suspense } from 'react'
import BaseModal from '@/components/customUI/Modals';
import { RuleRecord } from '@/store/vee/types/records/rule';
import Spinner from '@/components/customUI/Loaders/Spinner';

const AddRuleForm = lazy(() => import("@/components/customUI/vee/Forms/rule/AddRule"));
interface EditRuleProps {
    data: RuleRecord;
    cb?: () => void
}

const ButtonLogo = () => {
    return <img
        src="/assets/images/other/edit.png"
        alt="" height="auto"
        style={{ maxWidth: 20 }}
    />
};

const EditRule: FC<EditRuleProps> = ({ data, cb }) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = useCallback(() => {
        setOpen(false);
        if (cb) cb();
    }, [cb, setOpen])


    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            dialogTitle="Edit Rule Details"
            buttonClass="primary-vee-btn flex items-center justify-center w-[35px]"
            ButtonLogo={ButtonLogo}
        >
            <Suspense fallback={
                <div className='h-[50vh] flex items-center justify-center'>
                    <Spinner />
                </div>
            }>
                <AddRuleForm
                    rule={data}
                    onSubmitCb={handleSubmit}
                />
            </Suspense>
        </BaseModal>
    )
}

export default EditRule