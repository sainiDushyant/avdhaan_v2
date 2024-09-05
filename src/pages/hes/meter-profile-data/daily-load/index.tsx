import { useState } from 'react';
import DailyLoadTable from './includes/DailyLoadTable';
import DailyLoadGraph from './includes/DailyLoadGraph';
import ToggleView from '@/components/customUI/ToggleView';
import HesFilters from '@/components/customUI/hes/HesFilters';
import ToggleCategory from '@/components/customUI/hes/ToggleSubCategory';

const DailyLoad = () => {
  const [view, setView] = useState<string>('graph');
  return (
    <div className="px-5 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Daily Load</span>
          </h1>
          <ToggleView view={view} setView={setView} />
        </div>
        <HesFilters />
        <div className="overflow-x-scroll">
          {view === 'table' && (
            <>
              <ToggleCategory />
              <DailyLoadTable />
            </>
          )}
          {view === 'graph' && <DailyLoadGraph />}
        </div>
      </div>
    </div>
  );
};

export default DailyLoad;
