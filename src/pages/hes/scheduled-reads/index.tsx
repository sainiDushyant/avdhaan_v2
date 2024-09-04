// ScheduledReads.tsx
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import GraphComponent from './includes/graphReports';
import { useGetScheduledReportsQuery } from '../../../store/hes/hesApi';
import ListReports from './includes/listReports';
import Button from '@/components/ui/button';
import ListView from '@/components/svg/ListView';
import GraphView from '@/components/svg/GraphView';
import Download from '@/components/svg/Download';


const ScheduledReads = () => {
  const { data } = useGetScheduledReportsQuery({ searchQuery: '' });
  const [searchParams] = useSearchParams();
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

  if (!data) return <div>Loading...</div>;




  return (
    <div className="px-5 py-3 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Reports</span>
          </h1>
          <div
            className='cursor-pointer'
            onClick={() => {
              setView(view === 'graph' ? 'table' : 'graph');
            }}
          >
            <div className='flex items-center gap-x-6'>

              <Link
                to="/"
                className="link-button tertiary-vee-btn px-2"
                target="_blank"
              >
                <Download />
              </Link>

              <div className='flex items-center gap-x-6 m-2'>

                {view === 'graph' ? (
                  <Button
                    variant="ghost"
                    className="secondary-vee-btn hover:bg-[none] hover:text-[none] flex gap-x-2 items-center"
                    onClick={() => setView("table")}
                  >
                    <ListView />
                    <span>List View</span>
                  </Button>

                ) : (
                  <Button
                    variant="ghost"
                    className="primary-vee-btn hover:bg-[none] hover:text-[none] flex gap-x-2 items-center"
                    onClick={() => setView("graph")}
                  >
                    <GraphView />

                    <span>Graph View</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>



        <div className="overflow-x-scroll">
          {view === 'table' ? (
            <ListReports search={mappedSearchParams.toString()} />
          ) : (<GraphComponent chartData={data.chartData} />)}
        </div>
      </div>
    </div>
  );
};

export default ScheduledReads;
