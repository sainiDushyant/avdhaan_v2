import { FC } from 'react';
import Button from '@/components/ui/button';
import { DownloadButtonProps } from '@/store/hes/types/other';
import Download from '@/components/svg/Download';

const DownloadButton: FC<DownloadButtonProps> = ({
  downloadCSV,
  isLoading
}) => {
  return (
    <Button
      type="button"
      variant="default"
      className="border border-input gap-3 p-2 bg-[#0A3690] w-[150px] text-white flex justify-center items-center"
      onClick={downloadCSV}
      disabled={isLoading}
    >
      <Download /> {isLoading ? 'Downloading...' : 'Download'}
    </Button>
  );
};

export default DownloadButton;
