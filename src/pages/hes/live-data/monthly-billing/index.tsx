import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import BillingTable from './includes/BillingTable';
import BillingGraph from './includes/BillingGraph';
import ToggleView from '@/components/customUI/ToggleView';
const Billing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<string>('graph');
  const mapParams = (params: URLSearchParams) => {
    const mappedParams = new URLSearchParams();
    if (params.has('site_ids'))
      mappedParams.set('site_id', params.get('site_ids')!);
    if (params.has('pss_ids'))
      mappedParams.set('pss_id', params.get('pss_ids')!);
    if (params.has('feeder_ids'))
      mappedParams.set('feeder_id', params.get('feeder_ids')!);
    if (params.has('dtr_ids'))
      mappedParams.set('dtr_id', params.get('dtr_ids')!);
    return mappedParams;
  };
  const mappedSearchParams = mapParams(searchParams);

  return (
    <div
     
      className="px-5 py-3 w-full"
    >
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Monthly Billing</span>
          </h1>
         <ToggleView view={view} setView={setView}/>
        </div>
        <div className="overflow-x-scroll">
          {view === 'table' && (
            <BillingTable
              groupName={'Block Load'}
              search={mappedSearchParams.toString()}
            />
          )}
          {view === 'graph' && <BillingGraph />}
        </div>
      </div>
    </div>
  );
};

export default Billing;
