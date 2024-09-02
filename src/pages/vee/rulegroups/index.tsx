import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import VeeRuleSideBar from "@/components/customUI/vee/VeeRuleSideBar";
import useGetTableColumns from "@/hooks/useGetTableColumns";
import { useGetAllRuleGroupsTableQuery } from "@/store/vee/veeApi";
import { useLocation } from "react-router-dom";
import VeeFilters from "@/components/customUI/vee/VeeFilters";
import DataTable from "@/components/customUI/DataTable";
import AddRuleGroupModal from "@/components/customUI/vee/Modals/rule-group/AddRuleGroup";
import Spinner from "@/components/customUI/Loaders/Spinner";

const RuleGroups = () => {

  const { search } = useLocation();
  const {
    data: response, isLoading,
    isFetching, isError, error, refetch
  } = useGetAllRuleGroupsTableQuery({
    searchQuery: search
  });

  const columns = useGetTableColumns({
    cols: response?.groups || [],
    query: [],
    getLink: (id) => `/rulegroups/${id}`,
  })

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response) return <EmptyScreen title="No rule groups found" />;

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col md:flex-row mt-8">
        <div className="flex-none w-auto lg:w-[18vw] relative ">
          <VeeRuleSideBar />
        </div>

        <div className="bg-white rounded-lg p-5 flex-1 overflow-x-scroll">

          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-medium text-[#0A3690] p-2">Show Rule Groups</span>
          </h1>
          
          <div className='flex flex-col lg:flex-row w-full items-center'>
            <VeeFilters
              hideAcquiredDate={true}
              hideDate={true}
            >
              <AddRuleGroupModal onSubmitCb={refetch} />
            </VeeFilters>
          </div>

          {
            !isFetching ?
              <DataTable 
                columns={columns} 
                data={response.groups} 
                hasInternalPagination={true}
              />
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

export default RuleGroups