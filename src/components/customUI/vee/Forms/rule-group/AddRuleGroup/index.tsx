import BaseForm from "../../BaseForm"
import SubmitButton from "@/components/customUI/Button/SubmitButton"
import { FC, useCallback } from "react";
import { RuleGroupRecord } from "@/store/vee/types/records/rule-groups";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAddRuleGroupMutation, useUpdateRuleGroupDetailsMutation } from "@/store/vee/veeApi";
import { CustomAPIError } from "@/store/vee/types";
import { BaseObj, BaseObjWithoutId } from "@/store/vee/types/records";
import { cn } from "@/lib/utils";
import useBaseForm from "@/hooks/vee/useBaseForm";

interface AddRuleGroupFormProps {
  ruleGroup?: RuleGroupRecord;
  formCss?: string;
  onSubmitCb?: () => void;
}

const AddRuleGroupForm: FC<AddRuleGroupFormProps> = ({ ruleGroup, formCss, onSubmitCb }) => {

  const ruleGroupId = ruleGroup ? ruleGroup.id : null;

  const { baseState, setBaseState } = useBaseForm({ 
    name: ruleGroup?.name, description: ruleGroup?.description 
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const [addRuleGroup, { isLoading }] = useAddRuleGroupMutation()
  const [updateRuleGroupDetails, { isLoading: editLoading }] = useUpdateRuleGroupDetailsMutation();

  const handleAddRulegroup = useCallback(async (apiPayload: BaseObjWithoutId) => {
    try {
      await addRuleGroup(apiPayload);
      toast({
        variant: "default",
        description: "Rule Group added successfully",
      })
      if (onSubmitCb) return onSubmitCb();
      navigate(`/rulegroups/`);
    } catch (error) {
      const errorMsg = error as CustomAPIError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg?.description || "Failed to add rule group",
      })
    }
  }, [ addRuleGroup, toast, onSubmitCb, navigate ]);

  const handleEditRuleGroup = useCallback(async (apiPayload: BaseObj) => {
    try {
      await updateRuleGroupDetails(apiPayload);
      toast({
          variant: "default",
          description: "Rule Group updated successfully",
      });
      if (onSubmitCb) return onSubmitCb();
      navigate(`/rulegroups`);
  } catch (error) {
      const errorMsg = error as CustomAPIError;
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMsg?.description || "Failed to update rule group",
      })
  }
  }, [ updateRuleGroupDetails, toast, onSubmitCb, navigate ])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(ruleGroupId) return handleEditRuleGroup({
      ...baseState,
      id: ruleGroupId
    })
    handleAddRulegroup(baseState)

  }, [ 
    baseState, ruleGroupId,
    handleEditRuleGroup, handleAddRulegroup
  ]);

  return (
    <form className={cn("flex flex-col gap-4", formCss)} 
      onSubmit={handleSubmit}
    >
      <BaseForm 
        name="rule-group"
        baseState={baseState}
        setBaseState={setBaseState}
      />
      <SubmitButton 
          title={ ruleGroupId ? "Update Detail" : "Save Detail" }
          disabled={isLoading || editLoading} 
      />
    </form>
  )
}

export default AddRuleGroupForm