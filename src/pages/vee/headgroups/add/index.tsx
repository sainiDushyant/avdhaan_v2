import VeeAddRuleSideBar from "@/components/customUI/vee/VeeAddRuleSideBar"
import AddHeadGroupForm from "@/components/customUI/vee/Forms/head-group/AddHeadGroup"

const AddHeadGroups = () => {
  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col md:flex-row mt-8">
        <div className="flex-none w-auto lg:w-[18vw] relative ">
          <VeeAddRuleSideBar />
        </div>

        <div className="bg-white rounded-lg px-12 py-8 flex-1 min-h-[80vh] overflow-x-scroll">
          <AddHeadGroupForm formCss="md:block md:space-y-8"  />
        </div>
      </div>
    </div>
  )
}

export default AddHeadGroups