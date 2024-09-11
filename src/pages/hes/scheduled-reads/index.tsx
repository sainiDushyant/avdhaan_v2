
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import GraphComponent from './includes/GraphReports';
import ListReports from './includes/ListReports';
import Download from '@/components/svg/Download';
import ToggleView from '@/components/customUI/ToggleView';
import HesFilters from '@/components/customUI/hes/HesFilters';
import DateFilters from '@/components/customUI/hes/HesFilters/DateFilter.tsx';

const ScheduledReads = () => {
  const [view, setView] = useState<string>('graph');
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState<string>(searchParams.get('from') || '');
  const [endDate, setEndDate] = useState<string>(searchParams.get('to') || '');

  useEffect(() => {
    if (startDate) searchParams.set('from', startDate);
    if (endDate) searchParams.set('to', endDate);
    setSearchParams(searchParams);
  }, [startDate, endDate, setSearchParams, searchParams]);

  return (
    <div className="px-5 py-3 w-full">
      <HesFilters />
      <DateFilters 
        startDate={startDate} 
        setStartDate={setStartDate} 
        endDate={endDate} 
        setEndDate={setEndDate} 
      />
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Reports</span>
          </h1>
          <div className='flex items-center gap-x-6'>
            <Link to="/" className="link-button tertiary-vee-btn px-2" target="_blank">
              <Download />
            </Link>
            <ToggleView view={view} setView={setView} />
          </div>
        </div>
        <div className="overflow-x-scroll">
          {view === 'table' ? <ListReports /> : <GraphComponent />}
        </div>
      </div>
    </div>
  );
};

export default ScheduledReads;
