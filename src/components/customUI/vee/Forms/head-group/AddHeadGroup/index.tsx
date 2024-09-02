import { FC, useCallback, useState } from "react";
import BaseForm from "../../BaseForm"
import { METER_TYPE, LOAD_TYPE, LoadTypeOption, MeterTypeOption } from "@/lib/vee";
import SubmitButton from "@/components/customUI/Button/SubmitButton";
import { AddHeadGroup, EditHeadGroup, HeadGroupRecord } from "@/store/vee/types/records/head-groups";
import { useToast } from "@/components/ui/use-toast";
import { useAddHeadGroupMutation, useUpdateHeadGroupDetailsMutation } from "@/store/vee/veeApi";
import { useNavigate } from "react-router-dom";
import { CustomAPIError } from "@/store/vee/types";
import { cn } from "@/lib/utils";
import useBaseForm from "@/hooks/vee/useBaseForm";
import MTLTForm from "../../MTLTForm";

interface AddHeadGroupFormProps {
  headGroup?: HeadGroupRecord;
  formCss?: string;
  onSubmitCb?: () => void;
}

const AddHeadGroupForm: FC<AddHeadGroupFormProps> = ({ headGroup, formCss, onSubmitCb }) => {

  const headGroupId = headGroup ? headGroup.id : null;
  const selectedMeterType = METER_TYPE.filter(item => item.value === headGroup?.meter_type);
  const selectedLoadType = LOAD_TYPE.filter(item => item.value === headGroup?.load_type);

  const { toast } = useToast();
  const navigate = useNavigate();
  const [addHeadGroup, { isLoading }] = useAddHeadGroupMutation()
  const [updateHeadGroupDetails, { isLoading: editLoading }] = useUpdateHeadGroupDetailsMutation();

  const { baseState, setBaseState } = useBaseForm({ 
    name: headGroup?.name, description: headGroup?.description 
  });

  const [meterType, setMeterType] = useState<MeterTypeOption | null>(
    selectedMeterType.length > 0 ? selectedMeterType[0] : null
  );
  const [loadType, setLoadType] = useState<LoadTypeOption | null>(
    selectedLoadType.length > 0 ? selectedLoadType[0] : null
  );

  const handleChangeMeterType = useCallback((selected: MeterTypeOption | null) => {
    setMeterType(selected);
  }, []);

  const handleChangeLoadType = useCallback((selected: LoadTypeOption | null) => {
    setLoadType(selected);
  }, []);

  const handleAddHeadgroup = useCallback(async (apiPayload: AddHeadGroup) => {
    try {
      await addHeadGroup(apiPayload);
      toast({
        variant: "default",
        description: "Head Group added successfully",
      })
      if (onSubmitCb) return onSubmitCb();
      navigate(`/headgroups/`);
    } catch (error) {
      const errorMsg = error as CustomAPIError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg?.description || "Failed to add head group",
      })
    }
  }, [ addHeadGroup, toast, onSubmitCb, navigate ]);

  const handleEditHeadGroup = useCallback(async (apiPayload: EditHeadGroup) => {
    try {
      await updateHeadGroupDetails(apiPayload);
      toast({
          variant: "default",
          description: "Head Group updated successfully",
      });
      if (onSubmitCb) return onSubmitCb();
      navigate(`/headgroups`);
  } catch (error) {
      const errorMsg = error as CustomAPIError;
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMsg?.description || "Failed to update head group",
      })
  }
  }, [ updateHeadGroupDetails, toast, onSubmitCb, navigate ])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    if (!meterType || !loadType) return;
    e.preventDefault();
    if(headGroupId) return handleEditHeadGroup({
      ...baseState,
      meter_type: meterType.value,
      load_type: loadType.value,
      id: headGroupId
    })
    handleAddHeadgroup({
      ...baseState,
      meter_type: meterType.value,
      load_type: loadType.value
    })
  }, [
    baseState, meterType, loadType, headGroupId,
    handleAddHeadgroup, handleEditHeadGroup,
  ]);

  return (
    <form className={cn("flex flex-col gap-4", formCss)} 
      onSubmit={handleSubmit}
    >
      <MTLTForm 
        meterType={meterType} 
        loadType={loadType} 
        handleChangeMeterType={handleChangeMeterType} 
        handleChangeLoadType={handleChangeLoadType} 
      />

      <BaseForm
        name="head-group"
        baseState={baseState}
        setBaseState={setBaseState}
      />

      <SubmitButton 
        title={ headGroupId ? "Update Detail" : "Save Detail" }
        disabled={isLoading || editLoading} 
      />
    </form>
  )
}

export default AddHeadGroupForm