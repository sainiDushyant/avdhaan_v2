import { FC, useCallback, useState, lazy, Suspense } from "react"
import BaseModal from "@/components/customUI/Modals"
import Spinner from "@/components/customUI/Loaders/Spinner";

const AddRuleGroupForm = lazy(() => import("@/components/customUI/vee/Forms/rule-group/AddRuleGroup"));
interface AddRuleGroupModalProps {
  onSubmitCb?: () => void;
}

const AddRuleGroupModal: FC<AddRuleGroupModalProps> = ({ onSubmitCb }) => {

  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(() => {
    if (onSubmitCb) onSubmitCb();
    setOpen(false);
  }, [onSubmitCb, setOpen])

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      title="Add a rule group"
      dialogTitle="Add a new rule group"
      buttonClass="secondary-vee-btn min-w-[120px]"
    >
      <Suspense fallback={
        <div className='h-[50vh] flex items-center justify-center'>
          <Spinner />
        </div>
      }>
        <AddRuleGroupForm onSubmitCb={handleSubmit} />
      </Suspense>
    </BaseModal>
  )
}

export default AddRuleGroupModal