import { FC, useCallback } from 'react';
import { meterCategoryData } from '@/lib/hes';
import { cn } from '@/lib/utils';
import { MeterProfileQueryParams } from '@/store/hes/types/records/meter-profile-data-metrics';
import { useGetDeviceSubCategoryQuery } from '@/store/hes/hesApi';
import Spinner from '@/components/customUI/Loaders/Spinner';

interface ToggleCategoryProps {
  query: MeterProfileQueryParams;
  setQuery: React.Dispatch<React.SetStateAction<MeterProfileQueryParams>>;
}

const ToggleCategory: FC<ToggleCategoryProps> = ({ query, setQuery }) => {

  const { data, isLoading } = useGetDeviceSubCategoryQuery();

  const handleTabClick = useCallback((id: number) => {
    setQuery(prevVal => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { after_cursor, before_cursor, ...rest } = prevVal;
      return { ...rest, sub_category: id }
    })
  }, [ setQuery ]);

  return (

        <div className="flex border-b border-gray-300 space-x-8 my-5">
          {isLoading && <Spinner />}
          {data && data.map(item => (
            <div
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={cn("cursor-pointer font-bold pb-2 transition-colors duration-300 text-gray-500",
                query.sub_category === item.id && "text-[#0A3690] font-semibold border-b-2 border-[#0A3690]")}
            >
              <p>{meterCategoryData.get(item.name)}</p>
            </div>
          ))}
    </div>
  );
};

export default ToggleCategory;
