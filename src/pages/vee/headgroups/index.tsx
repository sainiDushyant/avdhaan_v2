import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import VeeRuleSideBar from "@/components/customUI/vee/VeeRuleSideBar";
import useGetTableColumns from "@/hooks/useGetTableColumns";
import { useGetAllHeadGroupsTableQuery } from "@/store/vee/veeApi";
import { useLocation } from "react-router-dom";
import VeeFilters from "@/components/customUI/vee/VeeFilters";
import DataTable from "@/components/customUI/DataTable";
import AddHeadGroupModal from "@/components/customUI/vee/Modals/head-group/AddHeadGroup";
import Spinner from "@/components/customUI/Loaders/Spinner";

const HeadGroups = () => {

  const { search } = useLocation();
  const {
    data: response, isLoading,
    isFetching, isError, error, refetch
  } = useGetAllHeadGroupsTableQuery({
    searchQuery: search
  });

  const columns = useGetTableColumns({
    cols: response?.head_groups || [],
    query: ["name"],
    getLink: (id) => `/vee/headgroups/${id}`,
  })

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response) return <EmptyScreen title="No head groups found" />;

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col md:flex-row mt-8">
        <div className="flex-none w-auto lg:w-[18vw] relative ">
          <VeeRuleSideBar />
        </div>

        <div className="bg-white rounded-lg p-5 flex-1 overflow-x-scroll">

          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-medium text-[#0A3690] p-2">Show Head Groups </span>
          </h1>
          
          <div className='flex flex-col lg:flex-row w-full items-center'>
            <VeeFilters
              hideAcquiredDate={true}
              hideDate={true}
            >
              <AddHeadGroupModal onSubmitCb={refetch} />
            </VeeFilters>
          </div>

          {
            !isFetching ?
              <DataTable 
                columns={columns} 
                data={response.head_groups} 
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

export default HeadGroups