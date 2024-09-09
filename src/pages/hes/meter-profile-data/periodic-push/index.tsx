import HesFilters from '@/components/customUI/hes/HesFilters';
import ToggleCategory from '@/components/customUI/hes/ToggleSubCategory';
import PeriodicPushTable from './includes/PeriodicPushTable';

const PeriodicPush = () => {
  return (
    <div className="px-5 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Periodic Push</span>
          </h1>
        </div>
        <HesFilters />
        <div className="overflow-x-scroll">
          <>
            <ToggleCategory />
            <PeriodicPushTable />
          </>
        </div>
      </div>
    </div>
  );
};

export default PeriodicPush;
