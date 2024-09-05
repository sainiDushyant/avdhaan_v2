import { useState } from 'react';
import InstantaneousGraph from './includes/InstantaneousGraph';
import ToggleView from '@/components/customUI/ToggleView';
import InstantaneousTable from './includes/InstantaneousTable';
import HesFilters from '@/components/customUI/hes/HesFilters';

const InstantaneousProfile = () => {

  const [view, setView] = useState<string>('graph');
 
  return (
    <div className="px-5 py-3 w-full">

      <HesFilters />
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">
              Instantaneous Profile
            </span>
          </h1>
          <ToggleView view={view} setView={setView} />
        </div>
        <div className="overflow-x-scroll">
          {view === 'table' && (
            <InstantaneousTable />
          )}
          {view === 'graph' && <InstantaneousGraph />}
        </div>
      </div>
    </div>
  );
};

export default InstantaneousProfile;
