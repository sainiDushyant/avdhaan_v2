import EditRuleGroupModal from "@/components/customUI/vee/Modals/rule-group/EditRuleGroup"
import DeleteRuleGroupModal from "@/components/customUI/vee/Modals/rule-group/DeleteRuleGroup"
import AddRuleToRuleGroup from "@/components/customUI/vee/Modals/rule-group/AddRuleToRuleGroup"

const TableHeader = () => {
  return (
    <div className='flex-1 flex flex-wrap w-full items-center justify-center md:justify-end py-4 gap-4'>
        <EditRuleGroupModal />
        <DeleteRuleGroupModal />
        <AddRuleToRuleGroup />
    </div>
  )
}

export default TableHeader