import { FC, useCallback, useState } from 'react';
import RefreshButton from '@/components/svg/RefreshButton';
import Button from '@/components/ui/button';
import DateTimeRange from '@/components/customUI/Date/DateTimeRange';
import { useToast } from '@/components/ui/use-toast';
import { MeterProfileQueryParams } from '@/store/hes/types/records/meter-profile-data-metrics';
import MonthYearRange from '@/components/customUI/Date/MonthYearRange';
import DownloadData from '@/components/customUI/hes/DownloadData';

interface HeaderProps {
  parentName?: string;
  showDownloadButton?: boolean;
  query: MeterProfileQueryParams;
  dateStep?: string;
  filterType: 'monthyear' | 'datetime';
  setQuery: React.Dispatch<React.SetStateAction<MeterProfileQueryParams>>;
  refresh: () => void;
}

const Header: FC<HeaderProps> = ({
  parentName = '',
  query,
  dateStep,
  filterType,
  setQuery,
  refresh,
  showDownloadButton
}) => {
  const { toast } = useToast();
  const date = new Date().toISOString();
  const max = date.split('T')[0] + 'T00:00';

  const [startDateTime, setStartDateTime] = useState<string>(query.from || '');
  const [endDateTime, setEndDateTime] = useState<string>(query.to || '');

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fromVal =
        filterType === 'datetime'
          ? startDateTime.split('T').join(' ') + ':00'
          : startDateTime + ' 00:00:00';

      const toVal =
        filterType === 'datetime'
          ? endDateTime.split('T').join(' ') + ':00'
          : endDateTime + ' 00:00:00';

      setQuery((prevVal) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { after_cursor, before_cursor, ...rest } = prevVal;
        return {
          ...rest,
          from: fromVal,
          to: toVal
        };
      });
    },
    [startDateTime, endDateTime, filterType, setQuery, toast]
  );

  const resetFilters = useCallback(() => {
    setQuery({ sub_category: 1 });
    setStartDateTime('');
    setEndDateTime('');
  }, [setQuery, setStartDateTime, setEndDateTime]);

  return (
    <form
      className="flex flex-wrap gap-3 lg:justify-end  mt-3"
      onSubmit={handleSubmit}
    >
      {filterType === 'datetime' && (
        <DateTimeRange
          start={{
            step: dateStep,
            max,
            name: 'from',
            required: true,
            customState: {
              val: startDateTime,
              setter: setStartDateTime
            }
          }}
          end={{
            step: dateStep,
            max,
            name: 'to',
            required: true,
            customState: {
              val: endDateTime,
              setter: setEndDateTime
            }
          }}
          customCss={'flex-none xl:flex-none md:min-w-[220px]'}
        />
      )}

      {filterType === 'monthyear' && (
        <MonthYearRange
          start={{
            max,
            name: 'from',
            required: true,
            customState: {
              val: startDateTime,
              setter: setStartDateTime
            }
          }}
          end={{
            max,
            name: 'to',
            required: true,
            customState: {
              val: endDateTime,
              setter: setEndDateTime
            }
          }}
        />
      )}

      <Button type="submit" className="date-filter-color" variant={'secondary'}>
        Apply
      </Button>

      <Button
        type="button"
        className="destroy-filter-color"
        variant={'secondary'}
        onClick={resetFilters}
      >
        Clear
      </Button>

      <Button
        type="button"
        variant={'ghost'}
        className="refresh-button p-0 min-w-[35px]"
        onClick={refresh}
      >
        <RefreshButton />
      </Button>

      {showDownloadButton && (
        <DownloadData internalFilters={query} parentName={parentName} />
      )}
    </form>
  );
};

export default Header;
