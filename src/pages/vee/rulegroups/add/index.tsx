import VeeAddRuleSideBar from "@/components/customUI/vee/VeeAddRuleSideBar"
import AddRuleGroupForm from "@/components/customUI/vee/Forms/rule-group/AddRuleGroup"

const AddRuleGroups = () => {
    return (
        <div className="px-5 py-3 w-full">
            <div className="flex relative flex-col md:flex-row mt-8">
                <div className="flex-none w-auto lg:w-[18vw] relative ">
                    <VeeAddRuleSideBar />
                </div>

                <div className="bg-white rounded-lg px-12 py-8 flex-1 overflow-x-scroll">
                    <AddRuleGroupForm formCss="md:block md:space-y-8"  />
                </div>
            </div>
        </div>
    )
}

export default AddRuleGroups