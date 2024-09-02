import { useCallback, useState } from "react"
import BaseModal from "@/components/customUI/Modals"
import AsyncMultiOptionSelect from "@/components/customUI/Select/AsyncMultiOptionSelect";
import { Option } from "@/store/vee/types/other";
import { MultiValue } from "react-select";
import Button from "@/components/ui/button";
import pDebounce from "p-debounce";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { 
  useAddRuleGroupToHeadGroupMutation, 
  useGetHeadGroupDetailTableQuery, 
  useLazyGetAllRulesGroupsByNameQuery 
} from "@/store/vee/veeApi";
import { CustomAPIError } from "@/store/vee/types";

const AddRuleGroupToHeadGroup = () => {

  const [open, setOpen] = useState(false);

  const { headGroupId } = useParams();
  const { toast } = useToast();

  const { isLoading: headGroupLoading, refetch } = useGetHeadGroupDetailTableQuery({ id: headGroupId as string });
  const [getRuleGroups, { isLoading: tableLoading }] = useLazyGetAllRulesGroupsByNameQuery();
  const [addRuleGroupToHeadGroup, { isLoading  }] = useAddRuleGroupToHeadGroupMutation();

  const [ruleGroups, setRuleGroups] = useState<MultiValue<Option>>([]);

  const searchRuleGroupsAPI = useCallback(async (value: { searchQuery: string }) => {
    const response = await getRuleGroups(value);
    const data = response.data;
    return data;
  }, [ getRuleGroups ]);

  const searchRuleGroupsAPIDebounced = pDebounce(searchRuleGroupsAPI, 250);

  const ruleGroupOptions = useCallback(async (inputValue: string) => {
    const searchData = await searchRuleGroupsAPIDebounced({ searchQuery: `?q=${inputValue}` });
    if (!searchData) return [];
    const options = searchData.groups.map(group => ({ ...group, label: group.description, value: group.id }));
    return options;
  }, [ searchRuleGroupsAPIDebounced ]);

  const handleChangeRuleGroups = useCallback((selected: MultiValue<Option>) => {
    setRuleGroups(selected);
  }, []);

  const handleSubmit = useCallback(async() => {
    const selectedRuleGroups = ruleGroups.map(group => group.value);
    if(selectedRuleGroups.length === 0) return;
    try {
      await addRuleGroupToHeadGroup({ 
        headGroupId: headGroupId as string,
        ruleGroupIds: selectedRuleGroups
      });
      refetch();
      setOpen(false);
      setRuleGroups([]);
      toast({
        variant: "default",
        description: "Rule group added to Head Group successfully"
      })
    } catch (error) {
      const errorMsg = error as CustomAPIError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg?.description || "Failed to add rule group to head group",
      })
    }

  }, [
    headGroupId, ruleGroups, 
    addRuleGroupToHeadGroup, toast, refetch, setOpen, setRuleGroups
  ])

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      title="Add a rule group to head group"
      dialogTitle="Add a rule groups to head group"
      buttonClass="primary-vee-btn min-w-[120px] flex-1 md:flex-none"
    >
      <AsyncMultiOptionSelect
        handleChange={handleChangeRuleGroups}
        value={ruleGroups}
        loading={false}
        placeholder={"Search for rule group"}
        loadOptions={ruleGroupOptions}
      />
      <Button
        type="submit" variant="ghost"
        className="flex-1 md:flex-none px-5 hover:bg-[none] hover:text-[none] primary-vee-btn select-none"
        onClick={handleSubmit}
        disabled={isLoading || headGroupLoading || tableLoading}
      >
        Update Head Group
      </Button>
    </BaseModal>
  )
}

export default AddRuleGroupToHeadGroup