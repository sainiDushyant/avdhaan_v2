import { FC, useState } from 'react';
import DateTime from './DateTime';
import { DateTimeProps } from '@/store/vee/types/other';

interface DateTimeRangeProps {
  start: DateTimeProps;
  end: DateTimeProps;
}

const DateTimeRange: FC<DateTimeRangeProps> = ({ start, end }) => {
  // Set internal state with fallback to start and end initialValue, if not provided by customState
  const [startDate, setStartDate] = useState(
    start.customState?.val || start.initialValue || ''
  );
  const [endDate, setEndDate] = useState(
    end.customState?.val || end.initialValue || ''
  );

  return (
    <>
      <DateTime
        {...start}
        placeholder={start.placeholder || 'Start Date Time'}
        name={start.name || 'from'}
        customState={{
          val: start.customState?.val || startDate,
          setter: start.customState?.setter || setStartDate
        }}
        min={start.min || ''}
        max={end.max || ''}
      />

      <DateTime
        {...end}
        placeholder={end.placeholder || 'End Date Time'}
        name={end.name || 'to'}
        customState={{
          val: end.customState?.val || endDate,
          setter: end.customState?.setter || setEndDate
        }}
        min={start.min || ''}
        max={end.max || ''}
      />
    </>
  );
};

export default DateTimeRange;
