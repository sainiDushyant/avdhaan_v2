import HesFilters from "@/components/customUI/hes/HesFilters";
import DeviceInformation from "./include/DeviceTable";

const DeviceData = () => {
  return (
    <div className="px-5 w-full">
      <div className="flex relative flex-col mt-8">
        <div className="flex justify-between items-center mb-2 ">
          <h1 className="capitalize secondary-title lg:main-title">
            <span className="font-bold text-[#0A3690]">Block Load</span>
          </h1>
        </div>
        <HesFilters />
        <DeviceInformation />
      </div>
    </div>
  );
};

export default DeviceData;