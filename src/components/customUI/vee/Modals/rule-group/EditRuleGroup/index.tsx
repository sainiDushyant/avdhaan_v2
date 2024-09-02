import { useCallback, useState, lazy, Suspense } from "react";
import BaseModal from "@/components/customUI/Modals";
import { useGetRuleGroupDetailTableQuery } from "@/store/vee/veeApi";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "@/components/customUI/Loaders/Spinner";

const AddRuleGroupForm = lazy(() => import("@/components/customUI/vee/Forms/rule-group/AddRuleGroup"));

const EditRuleGroupModal = () => {

  const { ruleGroupId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetRuleGroupDetailTableQuery({ id: ruleGroupId as string });
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setOpen(false);
    } catch (error) {
      console.error("Error updating rule group:", error);
    }
  }, [navigate, setOpen]);

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      title="Edit rule group detail"
      dialogTitle="Update rule group detail"
      buttonClass="secondary-vee-btn min-w-[120px] flex-1 md:flex-none"
    >
      {!data ? <Spinner /> :
        <Suspense fallback={
          <div className='h-[50vh] flex items-center justify-center'>
            <Spinner />
          </div>
        }>
          <AddRuleGroupForm
            ruleGroup={data.group}
            onSubmitCb={handleSubmit}
          />
        </Suspense>

      }
    </BaseModal>
  );
};

export default EditRuleGroupModal;
