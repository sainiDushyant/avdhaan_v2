import { useLazyDownloadCSVDataQuery } from '@/store/hes/hesApi';
import { useLocation } from 'react-router-dom';
import DownloadButton from '../../Button/DownloadButton';
import { useToast } from '@/components/ui/use-toast';
import { useCallback } from 'react';

type DownloadDataProps = {
  internalFilters: Record<string, string | number | boolean>;
  parentName: string;
};

const DownloadData = ({ internalFilters, parentName }: DownloadDataProps) => {
  const { search } = useLocation();
  const { toast } = useToast();
  const [triggerDownloadCSV, response] = useLazyDownloadCSVDataQuery();

  const handleDownloadCSV = useCallback(async () => {
    const searchParams = new URLSearchParams(search);

    Object.entries(internalFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const searchQuery = searchParams.toString();
    const result = await triggerDownloadCSV({
      params: { type: parentName, rest: searchQuery }
    });

    if (result.status === 'fulfilled') {
      window.open(result.data.url, '_blank');
    } else if (result.isError) {
      toast({
        variant: 'default',
        title: 'Failed to download CSV',
        description:
          'There was an error encountered while downloading the data.'
      });
    }
  }, [search, internalFilters, parentName, triggerDownloadCSV, toast]);

  return (
    <div>
      <DownloadButton
        downloadCSV={handleDownloadCSV}
        isLoading={response.isFetching}
      />
    </div>
  );
};

export default DownloadData;
