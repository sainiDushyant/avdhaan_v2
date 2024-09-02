import { DEFAULT_LOAD_TYPE, DEFAULT_METER_TYPE, LOAD_TYPE_REV, METER_TYPE_REV } from '@/lib/vee';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Download from '@/components/svg/Download';
import useGetBasePath from '@/hooks/useGetBasePath';

const SummaryTableHeader = () => {
  const { search } = useLocation();
  const basePath = useGetBasePath();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();

  const load_type_param = searchParams.get("load_type") || DEFAULT_LOAD_TYPE;
  const load_type = LOAD_TYPE_REV.get(load_type_param);

  const meter_type_param = searchParams.get("meter_type") || DEFAULT_METER_TYPE;
  const meter_type = METER_TYPE_REV.get(meter_type_param)

  return (
    <div className='flex flex-wrap w-full items-center justify-between gap-y-3 px-2 py-3'>
      
      <h1 className="capitalize secondary-title lg:main-title">
        <span className="font-medium text-[#0A3690]">{basePath} summary - </span> 
        <span className="ml-2">{load_type} ({meter_type})</span>
      </h1>

      <div className='flex items-center gap-x-6'>

        <Link 
          to="/" 
          className="link-button tertiary-vee-btn px-2"
          target="_blank"
        >
          <Download />
        </Link>

        <Link 
          to={`/vee/${basePath}/details/${search}`} 
          className="link-button secondary-vee-btn"
        >
          View detailed summary
        </Link>
      </div>
    </div>
  )
}

export default SummaryTableHeader