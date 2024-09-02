import { useCallback, useState, lazy, Suspense } from "react"
import BaseModal from "@/components/customUI/Modals"
import { useGetHeadGroupDetailTableQuery } from "@/store/vee/veeApi";
import { useParams } from "react-router-dom";
import Spinner from "@/components/customUI/Loaders/Spinner";

const AddHeadGroupForm = lazy(() => import("@/components/customUI/vee/Forms/head-group/AddHeadGroup"));

const EditHeadGroupModal = () => {

  const { headGroupId } = useParams();
  const { data, refetch } = useGetHeadGroupDetailTableQuery({ id: headGroupId as string });
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(() => {
    refetch()
    setOpen(false);
  }, [refetch, setOpen])

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      title="Edit head group detail"
      dialogTitle="Update head group detail"
      buttonClass="secondary-vee-btn min-w-[120px] flex-1 md:flex-none"
    >
      {!data ? <Spinner /> :
        <Suspense fallback={
          <div className='h-[50vh] flex items-center justify-center'>
            <Spinner />
          </div>
        }>
          <AddHeadGroupForm
            headGroup={data.head_group}
            onSubmitCb={handleSubmit}
          />
        </Suspense>
      }
    </BaseModal>
  )
}

export default EditHeadGroupModal