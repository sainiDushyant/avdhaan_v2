import EmptyScreen from "@/components/customUI/EmptyScreen";
import ErrorScreen from "@/components/customUI/ErrorScreen";
import FullScreen from "@/components/customUI/Loaders/FullScreen";
import { useGetSummaryGraphDetailsQuery } from "@/store/vee/veeApi";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import GroupsSideBar from "./includes/GroupsSideBar";
import GroupDataVisualizer from "./includes/GroupDataVisualizer";
import GroupDetailsHeader from "./includes/GroupDetailsHeader";
import Spinner from "@/components/customUI/Loaders/Spinner";
import VeeFilters from "@/components/customUI/vee/VeeFilters";
import useGetBasePath from "@/hooks/useGetBasePath";
import { LOAD_TYPE } from "@/lib/vee";

const VeeSummaryDetails = () => {

  const [currentGroup, setCurrentGroup] = useState(0);
  const { search } = useLocation();
  const basePath = useGetBasePath(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();
  const loadType = searchParams.get("load_type") || "BL";
  const selectedLoadType = LOAD_TYPE.filter(item => item.value === loadType);

  const {
    data: response, isLoading,
    isFetching, isError, error
  } = useGetSummaryGraphDetailsQuery({
    pathname: basePath,
    searchQuery: search
  });

  if ((basePath === 'estimation' || basePath === 'editing') && loadType !== "DL") {
    return (
      <EmptyScreen title={`${basePath} summary details not available for ${selectedLoadType[0].label}`} />
    )
  }

  if (isLoading || isFetching) return <FullScreen hasSpinner={true} />;

  if (isError) return <ErrorScreen error={error} />
  if (!response || response.length === 0) return (
    <EmptyScreen title={`${basePath} summary details not available for ${selectedLoadType[0].label}`} />
  );

  return (
    <div className="px-5 py-3 flex flex-col w-full h-full">
      <div className="flex flex-wrap-reverse items-center border-b mb-4 gap-x-12">
        <GroupDetailsHeader />
        <VeeFilters
          hideAcquiredDate={true}
          setLtMtDefault={true}
          containerCss="bg-transparent"
        />
      </div>

      {

        !isFetching ?
          <div className="flex flex-1 relative flex-col md:flex-row p-3">
            <GroupsSideBar
              data={response}
              currentGroup={currentGroup}
              setCurrentGroup={setCurrentGroup}
            />

            <GroupDataVisualizer
              data={response}
              currentGroup={currentGroup}
            />

          </div>
          :
          <div className='h-[70vh] flex items-center justify-center'>
            <Spinner />
          </div>
      }

    </div>
  )
}

export default VeeSummaryDetails