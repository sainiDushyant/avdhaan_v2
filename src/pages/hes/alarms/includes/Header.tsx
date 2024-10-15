import { FC, useCallback, useState } from 'react';
import RefreshButton from '@/components/svg/RefreshButton';
import Button from '@/components/ui/button';
import DateTimeRange from '@/components/customUI/Date/DateTimeRange';
import { useToast } from '@/components/ui/use-toast';
import MonthYearRange from '@/components/customUI/Date/MonthYearRange';
import DownloadData from '@/components/customUI/hes/DownloadData';
import { AlarmsQueryParams } from '@/store/hes/types/records/alarms';
import {
  formatDateInLocalStr,
  getDateRangesFor7Days
} from '@/lib/utils';

interface HeaderProps {
  parentName?: string;
  showDownloadButton?: boolean;
  query: AlarmsQueryParams;
  showDate: boolean;
  dateStep?: string;
  filterType: 'monthyear' | 'datetime';
  setQuery: React.Dispatch<React.SetStateAction<AlarmsQueryParams>>;
  refresh: () => void;
}

const Header: FC<HeaderProps> = ({
  parentName = '',
  query,
  dateStep,
  filterType,
  showDate,
  setQuery,
  refresh,
  showDownloadButton
}) => {
  const { toast } = useToast();
  
  const today = new Date();
  const currentDate = today.toISOString().slice(0, 10);
  const localeTime = today.toLocaleTimeString()
  const max = `${currentDate}T${localeTime.slice(0, 8)}`

  const { todayStart, sevenDaysAgoStart } = getDateRangesFor7Days();

  const [startDateTime, setStartDateTime] = useState<string>(query?.from || '');
  const [endDateTime, setEndDateTime] = useState<string>(query?.to || '');

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
    setQuery({});
    setStartDateTime('');
    setEndDateTime('');
  }, [setQuery, setStartDateTime, setEndDateTime]);

  return (
    <div className="flex items-center justify-between">
      {showDate && (
        <span className="text-[#708CC7]">
          {`Date:
          ${formatDateInLocalStr(
            query.from ? query.from : sevenDaysAgoStart
          )} to ${formatDateInLocalStr(query.to ? query.to : todayStart)}`}
        </span>
      )}
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

        <Button
          type="submit"
          className="date-filter-color"
          variant={'secondary'}
        >
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
    </div>
  );
};

export default Header;
