import { useState } from 'react';
import BillingTable from './includes/BillingTable';
import BillingGraph from './includes/BillingGraph';
import ToggleView from '@/components/customUI/ToggleView';

const Billing = () => {

  const [view, setView] = useState<string>('graph');

  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Monthly Billing</span>
          </h1>
          <ToggleView view={view} setView={setView} />
        </div>
        <div className="overflow-x-scroll">
          {view === 'table' && (
            <BillingTable />
          )}
          {view === 'graph' && <BillingGraph />}
        </div>
      </div>
    </div>
  );
};

export default Billing;
