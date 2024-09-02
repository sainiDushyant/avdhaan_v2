import { useCallback, useState } from "react"
import BaseModal from "@/components/customUI/Modals"
import Button from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useNavigate , useLocation} from "react-router-dom";
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CustomAPIError } from "@/store/vee/types";
import { useDeleteRuleGroupMutation } from "@/store/vee/veeApi";

const DeleteRuleGroupModal = () => {
  const { state: locationState } = useLocation();
  const { ruleGroupId } = useParams();
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();
  const [deleteRuleGroup, { isLoading }] = useDeleteRuleGroupMutation();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [ setOpen ]);

  const handleDeleteRuleGroup = useCallback(async () => {
    try {
        await deleteRuleGroup({ id: ruleGroupId as string});
        setOpen(false);
        const fromHeadGroup = locationState?.from === 'headgroup';
        if (fromHeadGroup) {
          const headGroupId = locationState?.headGroupId; 
          navigate(`/vee/headgroups/${headGroupId}`, { state: { refetch: true } });
        } else {
          navigate(`/vee/rulegroups/`);
        }
        toast({
            variant: "default",
            description: "Rule Group deleted successfully",
        })
    } catch (error) {
        const errorMsg = error as CustomAPIError;
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: errorMsg?.description || "Failed to delete group",
        })
    }
}, [ruleGroupId, setOpen, navigate, toast, deleteRuleGroup, locationState]);


  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      title="Delete rule group"
      buttonClass="tertiary-vee-btn min-w-[120px] flex-1 md:flex-none"
      modalClass="min-w-[10vw] py-12"
    >

      <DialogHeader>
        <img 
          src="/vee/assets/images/other/discovery.png" 
          height="auto" loading="lazy" 
          style={{ maxWidth: 70 }} 
          className="mx-auto"
        />
        <DialogTitle className='text-center font-semibold pt-5 text-[#464E5F]'>
          <p className="font-semibold mb-1">Are you sure?</p>
          <p className="font-semibold">You want to delete the rule group?</p>
        </DialogTitle>

      </DialogHeader>


      <div className="flex justify-around mt-6">
        <Button
          className="text-base py-2 min-w-[100px] primary-vee-btn hover:bg-[none] hover:text-[none]"
          type="button"
          variant="ghost"
          onClick={handleDeleteRuleGroup}
          disabled={isLoading}
        >
          Yes
        </Button>

        <Button
          className="text-base py-2 min-w-[100px] tertiary-vee-btn hover:bg-[none] hover:text-[none]"
          type="button"
          variant="ghost"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </BaseModal>
  )
}

export default DeleteRuleGroupModal