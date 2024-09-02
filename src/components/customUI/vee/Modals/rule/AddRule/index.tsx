import { FC, useCallback, useState, lazy, Suspense } from "react"
import BaseModal from "@/components/customUI/Modals"
import Spinner from "@/components/customUI/Loaders/Spinner";

const AddRuleForm = lazy(() => import("@/components/customUI/vee/Forms/rule/AddRule"));
interface AddRuleModalProps {
  onSubmitCb?: () => void;
}

const AddRuleModal: FC<AddRuleModalProps> = ({ onSubmitCb }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(() => {
    setOpen(false);
    if (onSubmitCb) onSubmitCb();
  }, [onSubmitCb, setOpen])

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      title="Add a rule"
      dialogTitle="Add a new rule"
      buttonClass="secondary-vee-btn min-w-[120px]"
    >
      <Suspense fallback={
        <div className='h-[50vh] flex items-center justify-center'>
          <Spinner />
        </div>
      }>
        <AddRuleForm onSubmitCb={handleSubmit} />
      </Suspense>
    </BaseModal>
  )
}

export default AddRuleModal