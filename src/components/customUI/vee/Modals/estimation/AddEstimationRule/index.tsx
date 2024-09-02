import { FC, useCallback, useState, lazy, Suspense } from "react"
import BaseModal from "@/components/customUI/Modals"
import Spinner from "@/components/customUI/Loaders/Spinner";


const AddEstimationRule = lazy(() => import("@/components/customUI/vee/Forms/estimation/AddEstimationRule"));
interface AddEstimationRuleModalProps {
  onSubmitCb?: () => void;
}

const AddEstimationRuleModal: FC<AddEstimationRuleModalProps> = ({ onSubmitCb }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(() => {
    setOpen(false);
    if (onSubmitCb) onSubmitCb();
  }, [onSubmitCb, setOpen])

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      title="Add a estimation rule"
      dialogTitle="Add a new estimation rule"
      buttonClass="secondary-vee-btn min-w-[120px]"
    >
      <Suspense fallback={
        <div className='h-[50vh] flex items-center justify-center'>
          <Spinner />
        </div>
      }>
        <AddEstimationRule onSubmitCb={handleSubmit} />
      </Suspense>
    </BaseModal>
  )
}

export default AddEstimationRuleModal