import { FC, useCallback, useState, lazy, Suspense } from "react"
import BaseModal from "@/components/customUI/Modals";
import Spinner from "@/components/customUI/Loaders/Spinner";

const AddHeadGroupForm = lazy(() => import("@/components/customUI/vee/Forms/head-group/AddHeadGroup"));
interface AddHeadGroupModalProps {
  onSubmitCb?: () => void;
}

const AddHeadGroupModal: FC<AddHeadGroupModalProps> = ({ onSubmitCb }) => {

  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(() => {
    setOpen(false);
    if (onSubmitCb) onSubmitCb();
  }, [onSubmitCb, setOpen])

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      title="Add a head group"
      dialogTitle="Add a new head group"
      buttonClass="secondary-vee-btn min-w-[120px]"
    >
      <Suspense fallback={
        <div className='h-[50vh] flex items-center justify-center'>
          <Spinner />
        </div>
      }>
        <AddHeadGroupForm onSubmitCb={handleSubmit} />
      </Suspense>
    </BaseModal>
  )
}

export default AddHeadGroupModal