import { useCallback, useState } from "react"
import BaseModal from "@/components/customUI/Modals"
import AsyncMultiOptionSelect from "@/components/customUI/Select/AsyncMultiOptionSelect";
import Button from "@/components/ui/button";
import { MultiValue } from "react-select";
import { Option } from "@/store/vee/types/other";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { 
  useGetHeadGroupDetailTableQuery, 
  useAddRuleToHeadGroupMutation,
  useLazyGetAllRulesByNameQuery
} from "@/store/vee/veeApi";
import pDebounce from "p-debounce";
import { CustomAPIError } from "@/store/vee/types";

const AddRuleToHeadGroup = () => {

  const [open, setOpen] = useState(false);

  const { headGroupId } = useParams();
  const { toast } = useToast();

  const { isLoading: headGroupLoading, refetch } = useGetHeadGroupDetailTableQuery({ id: headGroupId as string });
  const [getRules, { isLoading: tableLoading }] = useLazyGetAllRulesByNameQuery();
  const [addRuleToHeadGroup, { isLoading  }] = useAddRuleToHeadGroupMutation();

  const [rules, setRules] = useState<MultiValue<Option>>([]);

  const searchRulesAPI = useCallback(async (value: { searchQuery: string }) => {
    const response = await getRules(value);
    const data = response.data;
    return data;
  }, [ getRules ]);

  const searchRulesAPIDebounced = pDebounce(searchRulesAPI, 250);

  const ruleOptions = useCallback(async (inputValue: string) => {
    const searchData = await searchRulesAPIDebounced({ searchQuery: `?q=${inputValue}` });
    if (!searchData) return [];
    const options = searchData.rules.map(rule => ({ ...rule, label: rule.description, value: rule.id }));
    return options;
  }, [ searchRulesAPIDebounced ]);

  const handleChangeRules = useCallback((selected: MultiValue<Option>) => {
    setRules(selected);
  }, []);

  const handleSubmit = useCallback(async() => {
    const selectedRules = rules.map(group => group.value);
    if(selectedRules.length === 0) return;
    try {
      await addRuleToHeadGroup({ 
        headGroupId: headGroupId as string,
        ruleIds: selectedRules
      });
      refetch();
      setOpen(false);
      setRules([]);
      toast({
        variant: "default",
        description: "Rule added to Head Group successfully"
      })
    } catch (error) {
      const errorMsg = error as CustomAPIError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg?.description || "Failed to add rule to head group",
      })
    }
  }, [
    headGroupId, rules, 
    addRuleToHeadGroup, toast, refetch, setOpen, setRules
  ])

  return (
    <BaseModal
        open={open} 
        setOpen={setOpen}
        title="Add a rule to head group"
        dialogTitle="Add a rule to head group"
        buttonClass="primary-vee-btn min-w-[120px] flex-1 md:flex-none"
    >
      <AsyncMultiOptionSelect
        handleChange={handleChangeRules}
        value={rules}
        loading={false}
        placeholder={"Search for rule"}
        loadOptions={ruleOptions}
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

export default AddRuleToHeadGroup