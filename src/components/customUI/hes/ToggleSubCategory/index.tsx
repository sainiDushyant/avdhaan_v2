import { useGetDeviceSubCategoryQuery } from '@/store/hes/hesApi';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type MeterName = {
  '1P': string;
  '3P': string;
  LTCT: string;
  HTCT: string;
};

const ToggleCategory = () => {
  const { data, isFetching, isError } = useGetDeviceSubCategoryQuery({
    searchQuery: ''
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (id: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('subCategory', id);

    setSearchParams(newParams);

    setActiveTab(id);
  };

  const toggleName: MeterName = {
    '1P': 'One Phase Meter',
    '3P': 'Three Phase Meter',
    LTCT: 'LTCT Meter',
    HTCT: 'HTCT Meter'
  };

  return (
    <div>
      {isError && <div>Error in loading filters...</div>}
      {isFetching && <div>Loading filters...</div>}
      {!isFetching && (
        <div className="flex border-b border-gray-300 space-x-8 my-5">
          {data?.map((e) => (
            <div
              key={e.id}
              onClick={() => handleTabClick(e.id.toString())}
              className={`cursor-pointer text-lg pb-2 transition-colors duration-300 ${
                activeTab === e.id.toString()
                  ? 'text-[#0A3690] font-semibold border-b-2 border-[#0A3690]'
                  : 'text-gray-500'
              }`}
            >
              {/* Safely access the meter name from the toggleName object */}
              {toggleName[e.name as keyof MeterName] || e.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToggleCategory;
