import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import InstantaneousGraph from './includes/InstantaneousGraph';
import ToggleView from '@/components/customUI/ToggleView';
import InstantaneousTable from './includes/InstantaneousTable';
const InstantaneousProfile = () => {
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
    <div className="px-5 py-3 w-full">
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
            <InstantaneousTable
              groupName={'Block Load'}
              search={mappedSearchParams.toString()}
            />
          )}
          {view === 'graph' && <InstantaneousGraph />}
        </div>
      </div>
    </div>
  );
};

export default InstantaneousProfile;
