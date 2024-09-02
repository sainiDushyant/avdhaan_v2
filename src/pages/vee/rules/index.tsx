import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import VeeRuleSideBar from "@/components/customUI/vee/VeeRuleSideBar";
import useGetTableColumns, { ActionType } from "@/hooks/useGetTableColumns";
import { useGetAllRulesTableQuery } from "@/store/vee/veeApi";
import { useLocation } from "react-router-dom";
import VeeFilters from "@/components/customUI/vee/VeeFilters";
import DataTable from "@/components/customUI/DataTable";
import AddRuleModal from "@/components/customUI/vee/Modals/rule/AddRule";
import Spinner from "@/components/customUI/Loaders/Spinner";
import ToggleRuleActivation from "./includes/ToggleRuleActivation";
import RuleCondition from "@/components/customUI/vee/Modals/rule/RuleCondition";
import EditRule from "@/components/customUI/vee/Modals/rule/EditRule";
import DeleteRule from "@/components/customUI/vee/Modals/rule/DeleteRule";
import { RuleRecord } from "@/store/vee/types/records/rule";
import SearchPagination from "@/components/customUI/SearchPagination";

const Rules = () => {

  const { search } = useLocation();

  const {
    data: response, isLoading,
    isFetching, isError, error, refetch
  } = useGetAllRulesTableQuery({
    searchQuery: search
  });

  const ruleActions: ActionType<RuleRecord>[] = [
    {
      element: ToggleRuleActivation,
      colName: "IS ACTIVE",
    },
    { element: RuleCondition },
    {
      element: EditRule,
      actionCb: refetch
    },
    {
      element: DeleteRule,
      actionCb: refetch
    }
  ]
  
  const columns = useGetTableColumns({
    cols: response?.rules || [],
    query: ["condition", "is_active", "id"],
    action: ruleActions
  })

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response) return <EmptyScreen title="No rules found" />;

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col md:flex-row mt-8">
        <div className="flex-none w-auto lg:w-[18vw] relative ">
          <VeeRuleSideBar />
        </div>

        <div className="bg-white rounded-lg p-5 flex-1 overflow-x-scroll">

          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-medium text-[#0A3690] p-2">Show Rules</span>
          </h1>

          <div className='flex flex-col lg:flex-row w-full items-center'>
            <VeeFilters
              hideAcquiredDate={true}
              hideDate={true}
            >
              <AddRuleModal />
            </VeeFilters>
          </div>

          {
            !isFetching ?
              <>
                <DataTable columns={columns} data={response.rules} />
                {response.rules.length > 0 && response.pagination && (
                  <SearchPagination className="bg-white  p-2 flex-1 overflow-x-scroll justify-end"
                    totalCount={response.pagination.pageTotal * response.pagination.pageSize}
                    pageSize={response.pagination.pageSize}
                  />

                )}
              </>
              :
              <div className='min-h-[80vh] flex items-center justify-center'>
                <Spinner />
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Rules