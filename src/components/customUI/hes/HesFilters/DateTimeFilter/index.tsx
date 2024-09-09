import DateTimeRange from '@/components/customUI/Date/DateTimeRange';
import Button from '@/components/ui/button';
import { formatDateTimeForSearchParams } from '@/lib/utils';
import { useState } from 'react';

type DateTimeFilterProps = {
  start?: { min?: string; max?: string };
  end?: { min?: string; max?: string };
  queryUpdater: React.Dispatch<React.SetStateAction<string>>;
};

const DateTimeFilter = ({ start, end, queryUpdater }: DateTimeFilterProps) => {
  const [startValue, setStartValue] = useState<string>('');
  const [endValue, setEndValue] = useState<string>('');

  const handleApply = () => {
    let updatedQuery = '';

    if (startValue) {
      updatedQuery += `&from=${formatDateTimeForSearchParams(startValue)}`;
    }
    if (endValue) {
      updatedQuery += `&to=${formatDateTimeForSearchParams(endValue)}`;
    }

    queryUpdater(updatedQuery);
  };

  const handleClear = () => {
    queryUpdater('');
    setStartValue('');
    setEndValue('');
  };

  const startObj = {
    min: start?.min || '',
    max: start?.max || '',
    customState: {
      val: startValue,
      setter: setStartValue
    }
  };

  const endObj = {
    ...end,
    min: end?.min || '',
    max: end?.max || '',
    customState: {
      val: endValue,
      setter: setEndValue
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <DateTimeRange start={startObj} end={endObj} />
      <Button
        className="date-filter-color"
        variant={'secondary'}
        onClick={handleApply}
      >
        Apply
      </Button>
      <Button
        className="date-filter-color"
        variant={'secondary'}
        onClick={handleClear}
      >
        Clear
      </Button>
    </div>
  );
};

export default DateTimeFilter;
