import { lazy, Suspense, useState } from 'react';
import InstantaneousGraph from './includes/InstantaneousGraph';
import ToggleView from '@/components/customUI/ToggleView';
import HesFilters from '@/components/customUI/hes/HesFilters';

const InstantaneousTable = lazy(() => import('./includes/InstantaneousTable'));

const InstantaneousProfile = () => {

  const [view, setView] = useState<"graph" | "table">('graph');

  return (
    <div className="px-5 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Instantaneous Profile</span>
          </h1>
          <ToggleView view={view} setView={setView} />
        </div>
        <HesFilters />
        <div className="overflow-x-scroll">
          {view === 'table' &&
            <Suspense
              fallback={<div className='min-h-[60vh] flex items-center justify-center' />}
            >
              <InstantaneousTable />
            </Suspense>
          }
          {view === 'graph' && <InstantaneousGraph />}
        </div>
      </div>
    </div>
  );
};

export default InstantaneousProfile;
