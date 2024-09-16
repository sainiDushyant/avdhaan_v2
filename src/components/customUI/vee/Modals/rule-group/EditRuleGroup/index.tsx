import { useCallback, useState, lazy, Suspense } from "react";
import BaseModal from "@/components/customUI/Modals";
import { useGetRuleGroupDetailTableQuery } from "@/store/vee/veeApi";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "@/components/customUI/Loaders/Spinner";
import { useToast } from "@/components/ui/use-toast";
import { CustomAPIError } from "@/store/vee/types";

const AddRuleGroupForm = lazy(() => import("@/components/customUI/vee/Forms/rule-group/AddRuleGroup"));

const EditRuleGroupModal = () => {

  const { toast } = useToast();
  
  const { ruleGroupId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetRuleGroupDetailTableQuery({ id: ruleGroupId as string });
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setOpen(false);
    } catch (error) {
      const errorMsg = error as CustomAPIError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg?.description || "Failed to add estimation rule",
      })
    }
  }, [navigate, setOpen, toast]);

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
