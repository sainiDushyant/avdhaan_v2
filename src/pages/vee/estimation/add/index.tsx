import VeeAddRuleSideBar from "@/components/customUI/vee/VeeAddRuleSideBar"
import AddEstimationRule from "@/components/customUI/vee/Forms/estimation/AddEstimationRule"

const AddEstimationRules = () => {
  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col md:flex-row mt-8">
        <div className="flex-none w-auto lg:w-[18vw] relative ">
          <VeeAddRuleSideBar />
        </div>

        <div className="bg-white rounded-lg px-12 py-8 flex-1 min-h-[80vh] overflow-x-scroll">
          <AddEstimationRule formCss="md:block md:space-y-8"  />
        </div>
      </div>
    </div>
  )
}

export default AddEstimationRules