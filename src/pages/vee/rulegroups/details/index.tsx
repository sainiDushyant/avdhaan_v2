import EmptyScreen from '@/components/customUI/EmptyScreen'
import ErrorScreen from '@/components/customUI/ErrorScreen'
import FullScreen from '@/components/customUI/Loaders/FullScreen'
import { useGetRuleGroupDetailTableQuery } from '@/store/vee/veeApi'
import useGetTableColumns from '@/hooks/useGetTableColumns'
import { useParams } from 'react-router-dom';
import TableHeader from './includes/TableHeader'
import DataTable from '@/components/customUI/DataTable'

const RulegroupDetails = () => {

  const { ruleGroupId } = useParams();
  const {
    data: response, isLoading, isError, error } = useGetRuleGroupDetailTableQuery({
      id: ruleGroupId as string
    });

  const data = response ? response.rules : [];

  const columns = useGetTableColumns({
    cols: data,
    query: [ ],
  })

  if (isLoading) return <FullScreen hasSpinner={true} />;
  if (isError) return <ErrorScreen error={error} />
  if (!response) return <EmptyScreen title="No Groups Found" />;

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col md:flex-row mt-8">
        <div className="bg-white rounded-lg p-5 flex-1 overflow-x-scroll">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-medium text-[#0A3690] p-2">{response.group.name}</span>
          </h1>
          <TableHeader />
          {
            data.length > 0 ?
              <DataTable
                columns={columns}
                data={data}
                hasInternalPagination={true}
              /> :
              <div className='w-full min-h-[60vh] flex items-center justify-center'>
                <h3 className='secondary-title lg:main-title'>
                  No rules present in {response.group.name} rule group
                </h3>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default RulegroupDetails