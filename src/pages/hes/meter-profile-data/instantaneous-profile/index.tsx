import { useState } from 'react';
import InstantaneousGraph from './includes/InstantaneousGraph';
import ToggleView from '@/components/customUI/ToggleView';
import InstantaneousTable from './includes/InstantaneousTable';
import HesFilters from '@/components/customUI/hes/HesFilters';
import ToggleCategory from '@/components/customUI/hes/ToggleSubCategory';

const InstantaneousProfile = () => {

  const [view, setView] = useState<string>('graph');
 
  return (
    <div className="px-5 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">
              Instantaneous Profile
            </span>
          </h1>
          <ToggleView view={view} setView={setView} />
        </div>
        <HesFilters />
        <div className="overflow-x-scroll">
          {view === 'table' && (
            <>
              <ToggleCategory />
              <InstantaneousTable />
            </>
          )}
          {view === 'graph' && <InstantaneousGraph />}
        </div>
      </div>
    </div>
  );
};

export default InstantaneousProfile;
