import { useState } from 'react';
import { Link } from 'react-router-dom';
import GraphComponent from './includes/GraphReports';
import { useGetScheduledReportsQuery } from '@/store/hes/hesApi';
import ListReports from './includes/ListReports';
import Download from '@/components/svg/Download';
import ToggleView from '@/components/customUI/ToggleView';

const ScheduledReads = () => {

  const { data } = useGetScheduledReportsQuery({ searchQuery: '' });
  const [view, setView] = useState<string>('graph');
  if (!data) return <div>Loading...</div>;

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center">

          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Reports</span>
          </h1>

            <div className='flex items-center gap-x-6'>
              <Link
                to="/"
                className="link-button tertiary-vee-btn px-2"
                target="_blank"
              >
                <Download />
              </Link>
              <ToggleView view={view} setView={setView} />
            </div>
        </div>

        <div className="overflow-x-scroll">
          {view === 'table' ? 
            <ListReports /> : 
            <GraphComponent chartData={data.chartData} />
          }
        </div>
      </div>
    </div>
  );
};

export default ScheduledReads;
