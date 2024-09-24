import { FC, useCallback, useState, lazy, Suspense } from 'react'
import BaseModal from '@/components/customUI/Modals';
import Spinner from '@/components/customUI/Loaders/Spinner';
import { EstimationRuleRecord } from '@/store/vee/types/records/estimation-rules';

const AddEstimationRule = lazy(() => import("@/components/customUI/vee/Forms/estimation/AddEstimationRule"));
interface EditEstimationRuleProps {
    data: EstimationRuleRecord;
    cb?: () => void
}

const ButtonLogo = () => {
    return <img
        src="/assets/images/other/edit.png"
        alt="" height="auto"
        style={{ maxWidth: 20 }}
    />
};

const EditEstimationRule: FC<EditEstimationRuleProps> = ({ data, cb }) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = useCallback(() => {
        setOpen(false);
        if (cb) cb();
    }, [cb, setOpen])


    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            dialogTitle="Edit Estimation Rule Details"
            buttonClass="primary-vee-btn flex items-center justify-center w-[35px]"
            ButtonLogo={ButtonLogo}
        >
            <Suspense fallback={
                <div className='h-[50vh] flex items-center justify-center'>
                    <Spinner />
                </div>
            }>
                <AddEstimationRule
                    estimationRule={data}
                    onSubmitCb={handleSubmit}
                />
            </Suspense>
        </BaseModal>
    )
}

export default EditEstimationRule