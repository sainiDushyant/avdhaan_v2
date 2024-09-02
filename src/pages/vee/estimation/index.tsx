import DataTable from "@/components/customUI/DataTable";
import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import Spinner from "@/components/customUI/Loaders/Spinner";
import AddEstimationRuleModal from "@/components/customUI/vee/Modals/estimation/AddEstimationRule";
import VeeFilters from "@/components/customUI/vee/VeeFilters";
import VeeRuleSideBar from "@/components/customUI/vee/VeeRuleSideBar";
import useGetTableColumns, { ActionType } from "@/hooks/useGetTableColumns";
import { EstimationRuleRecord } from "@/store/vee/types/records/estimation-rules";
import { useGetAllEstimationRulesTableQuery } from "@/store/vee/veeApi";
import { useLocation, useSearchParams } from "react-router-dom";
import ToggleEstimationRuleActivation from "./includes/ToggleEstimationRuleActivation";
import EstimationRuleCondition from "@/components/customUI/vee/Modals/estimation/EstimationRuleCondition";
import DeleteEstimationRule from "@/components/customUI/vee/Modals/estimation/DeleteEstimationRule";
import EditEstimationRule from "@/components/customUI/vee/Modals/estimation/EditEstimationRule";
import { LOAD_TYPE } from "@/lib/vee";
import BoxContainer from "@/components/customUI/BoxContainer";

const EstimationRules = () => {
  const { search } = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();
  const loadType = searchParams.get("load_type");
  const selectedLoadType = LOAD_TYPE.filter(item => item.value === loadType);

  const {
    data: response, isLoading,
    isFetching, isError, error, refetch
  } = useGetAllEstimationRulesTableQuery({
    searchQuery: search
  });

  const ruleActions: ActionType<EstimationRuleRecord>[] = [
    {
      element: ToggleEstimationRuleActivation,
      colName: "IS DEFAULT",
    },
    { element: EstimationRuleCondition },
    {
      element: EditEstimationRule,
      actionCb: refetch
    },
    {
      element: DeleteEstimationRule,
      actionCb: refetch
    }
  ]

  const columns = useGetTableColumns({
    cols: response?.rules || [],
    query: ["name", "parameters", "is_default"],
    action: ruleActions
  })

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  // if (!response) return <EmptyScreen title="No rules found" />;
  if (!response) return (
    <EmptyScreen title={` summary details not available for`} />
  );

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col md:flex-row mt-8">
        <div className="flex-none w-auto lg:w-[18vw] relative ">
          <VeeRuleSideBar />
        </div>

        <div className="bg-white rounded-lg p-5 flex-1 overflow-x-scroll">

          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-medium text-[#0A3690] p-2">Show Estimation Rules</span>
          </h1>

          <div className='flex flex-col lg:flex-row w-full items-center'>
            <VeeFilters
              hideAcquiredDate={true}
              hideDate={true}
            >
              <AddEstimationRuleModal />
            </VeeFilters>
          </div>

          {
            isFetching ?

              <div className='min-h-[80vh] flex items-center justify-center'>
                <Spinner />
              </div> :


              <>
                {(loadType === "BL" || loadType === "ML") ?
                  <BoxContainer>
                    <h2 className="font-semibold text-2xl capitalize">
                      Estimation rules not available for {selectedLoadType[0].label}
                    </h2>
                  </BoxContainer>
                  :
                  <DataTable
                    columns={columns}
                    data={response.rules}
                    hasInternalPagination={true}
                  />
                }
                </>
          }
                </div>
              </div>
        </div>
        )
}

        export default EstimationRules