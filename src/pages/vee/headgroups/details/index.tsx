import { useParams } from "react-router-dom";
import EmptyScreen from '@/components/customUI/EmptyScreen';
import ErrorScreen from '@/components/customUI/ErrorScreen';
import FullScreen from '@/components/customUI/Loaders/FullScreen';
import { useGetHeadGroupDetailTableQuery } from '@/store/vee/veeApi';
import useGetTableColumns from '@/hooks/useGetTableColumns';
import DataTable from '@/components/customUI/DataTable';
import TableHeader from './includes/TableHeader';

const HeadgroupDetails = () => {
  const { headGroupId } = useParams();

  const { data: response, isLoading, isError, error } = useGetHeadGroupDetailTableQuery(
    { id: headGroupId as string },
    { skip: !headGroupId }
  );

  const rulesData = response?.rules || [];
  const ruleGroupData = response?.rule_groups || [];

  const ruleColumns = useGetTableColumns({
    cols: rulesData,
    query: [],
  });

  const ruleGroupColumns = useGetTableColumns({
    cols: ruleGroupData,
    query: [],
    getLink: (id) => ({
      pathname: `/rulegroups/${id}`,
      state: { from: 'headgroup', headGroupId: headGroupId },
    }),
  });

  if (isLoading) return <FullScreen hasSpinner={true} />;

  if (isError) return <ErrorScreen error={error} />;

  if (!response) return <EmptyScreen title="Head group details not found" />;

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex flex-col relative mt-8 bg-white rounded-lg p-5 gap-y-8 overflow-x-scroll">
        <div>
          <h1 className="capitalize secondary-title lg:main-title mb-3">
            <span className="font-medium text-[#0A3690] p-2">
              {response.head_group.name}
            </span>
          </h1>
          <TableHeader />
        </div>

        {ruleGroupData.length > 0 && (
          <>
            <h2 className="tertiary-title lg:main-title text-[#0A3690]">Rule Groups</h2>
            <DataTable
              columns={ruleGroupColumns}
              data={ruleGroupData}
              hasInternalPagination={true}
            />
          </>
        )}

        {rulesData.length > 0 && (
          <>
            <h3 className="tertiary-title lg:main-title text-[#0A3690]">Rules</h3>
            <DataTable
              columns={ruleColumns}
              data={rulesData}
              hasInternalPagination={true}
            />
          </>
        )}

        {ruleGroupData.length === 0 && rulesData.length === 0 && (
          <div className="w-full min-h-[60vh] flex items-center justify-center">
            <h3 className="secondary-title lg:main-title">
              No rule groups or rules present in {response.head_group.name}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadgroupDetails;
