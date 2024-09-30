import { lazy, Suspense, useState } from 'react';
import BillingGraph from './includes/BillingGraph';
import ToggleView from '@/components/customUI/ToggleView';
import HesFilters from '@/components/customUI/hes/HesFilters';

const BillingTable = lazy(() => import('./includes/BillingTable'));

const Billing = () => {

  const [view, setView] = useState<"graph" | "table">('graph');

  return (
    <div className="px-5 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Monthly Billing</span>
          </h1>
          <ToggleView view={view} setView={setView} />
        </div>
        <HesFilters />
        <div className="overflow-x-scroll">
          {view === 'table' &&
            <Suspense
              fallback={<div className='min-h-[60vh] flex items-center justify-center' />}
            >
              <BillingTable />
            </Suspense>
          }
          {view === 'graph' && <BillingGraph />}
        </div>
      </div>
    </div>
  );
};

export default Billing;
