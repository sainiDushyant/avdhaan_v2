import Button from '@/components/ui/button';
import { FC } from 'react';
import { HigherOrderFilterType } from '.';
import { cn } from '@/lib/utils';

interface FilterSelectorProps {
  selected: HigherOrderFilterType;
  setSelected: React.Dispatch<React.SetStateAction<HigherOrderFilterType>>;
}

const FilterSelector: FC<FilterSelectorProps> = ({ selected, setSelected }) => {
  return (
    <div className="flex border-b border-gray-300 space-x-8 my-5">
      <Button
        variant="ghost"
        onClick={() => setSelected('pss')}
        className={cn(
          'hover:bg-[none] hover:text-[#0A3690] font-lg font-medium text-[#464E5F] rounded-none',
          selected === 'pss' &&
            'text-[#0A3690] font-bold border-b-[3px] border-[#0A3690]'
        )}
      >
        Power Sub Station (PSS)
      </Button>
      <Button
        variant="ghost"
        onClick={() => setSelected('feeder')}
        className={cn(
          'hover:bg-[none] hover:text-[#0A3690] font-lg font-medium text-[#464E5F] rounded-none',
          selected === 'feeder' &&
            'text-[#0A3690] font-bold border-b-[3px] border-[#0A3690]'
        )}
      >
        Feeder
      </Button>
      <Button
        variant="ghost"
        onClick={() => setSelected('dtr')}
        className={cn(
          'hover:bg-[none] hover:text-[#0A3690] font-lg font-medium text-[#464E5F] rounded-none',
          selected === 'dtr' &&
            'text-[#0A3690] font-bold border-b-[3px] border-[#0A3690]'
        )}
      >
        DTR
      </Button>
      <Button
        variant="ghost"
        onClick={() => setSelected(null)}
        className={cn(
          'hover:bg-[none] hover:text-[#0A3690] font-lg font-medium text-[#464E5F] rounded-none',
          selected === null &&
            'text-[#0A3690] font-bold border-b-[3px] border-[#0A3690]'
        )}
      >
        Meter
      </Button>
    </div>
  );
};

export default FilterSelector;
