import EmptyScreen from '@/components/customUI/EmptyScreen'
import ErrorScreen from '@/components/customUI/ErrorScreen'
import FullScreen from '@/components/customUI/Loaders/FullScreen'
import Overview from './includes/Overview'
import { useGetGeneralSummaryDataQuery } from '@/store/vee/veeApi'
import useGetTableColumns from '@/hooks/useGetTableColumns'
import SummaryHeader from './includes/SummaryHeader'
import { useLocation, useSearchParams } from 'react-router-dom';
import { useState } from 'react'
import Spinner from '@/components/customUI/Loaders/Spinner'
import VeeFilters from '@/components/customUI/vee/VeeFilters'
import useGetBasePath from '@/hooks/useGetBasePath'
import SummaryTableHeader from './includes/SummaryTableHeader'
import DataTable from '@/components/customUI/DataTable'
import { LOAD_TYPE } from '@/lib/vee'
import BoxContainer from '@/components/customUI/BoxContainer'

const VeeSummary = () => {

  const [showLogs, setShowLogs] = useState(false);

  const { search } = useLocation();
  const basePath = useGetBasePath();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();
  const loadType = searchParams.get("load_type") || "BL";
  const selectedLoadType = LOAD_TYPE.filter(item => item.value === loadType);

  const {
    data: response, isLoading,
    isFetching, isError, error,
  } = useGetGeneralSummaryDataQuery({
    pathname: basePath,
    searchQuery: search
  });

  const tableData = response ? response.table : []

  const columns = useGetTableColumns({ 
    cols: tableData, query: ["failed_rules", "estimated_rules", "estimated_parameters"] 
  });

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response) return <EmptyScreen title={`${basePath} summary not available`} />;

  return (
    <div className="px-5 py-3 w-full">
      <SummaryHeader
        showLogs={showLogs}
        setShowLogs={setShowLogs}
      />

      <VeeFilters setLtMtDefault={true}/>

      {
        ((basePath === 'estimation' || basePath === 'editing') && loadType !== "DL") ?
        <BoxContainer>
          <h2 className='font-semibold text-2xl capitalize'>
            {basePath} summary details not available for {selectedLoadType[0].label}
          </h2>
        </BoxContainer>
        :

        !isFetching ?

            <div className="flex relative flex-col md:flex-row">
    
              <div className="flex-none w-auto lg:w-[18vw] relative">
                <Overview
                  data={response.summary}
                />
              </div>
    
              <div className="bg-white rounded-lg p-5 flex-1 overflow-x-scroll">
                <SummaryTableHeader />
                <DataTable
                  columns={columns}
                  data={tableData}
                />
              </div>
    
            </div> :
    
            <div className='min-h-[80vh] flex items-center justify-center'>
              <Spinner />
            </div>      

      }

    </div>
  )
}

export default VeeSummary