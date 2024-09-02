import EditHeadGroupModal from "@/components/customUI/vee/Modals/head-group/EditHeadGroup"
import DeleteHeadGroupModal from "@/components/customUI/vee/Modals/head-group/DeleteHeadGroup"
import AddRuleGroupToHeadGroup from "@/components/customUI/vee/Modals/head-group/AddRuleGroupToHeadGroup"
import AddRuleToHeadGroup from "@/components/customUI/vee/Modals/head-group/AddRuleToHeadGroup"

const TableHeader = () => {
  return (
    <div className='flex-1 flex flex-wrap w-full items-center justify-center md:justify-end py-4 gap-4'>
        <EditHeadGroupModal />
        <DeleteHeadGroupModal />
        <AddRuleGroupToHeadGroup />
        <AddRuleToHeadGroup />
    </div>
  )
}

export default TableHeader