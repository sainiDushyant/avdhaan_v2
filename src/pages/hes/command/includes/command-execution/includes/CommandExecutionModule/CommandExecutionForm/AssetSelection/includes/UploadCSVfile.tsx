import { FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUploadCSVfileMutation } from '@/store/hes/hesApi';
import { HesFilterState } from '@/store/hes/types/records/device-management';
import { HigherOrderFilterType } from '../../..';

type UploadCSVfileProps = {
  setAssetsSelected: React.Dispatch<React.SetStateAction<HesFilterState>>;
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<HigherOrderFilterType>
  >;
  setOpenCsvModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadCSVfile: FC<UploadCSVfileProps> = ({
  setAssetsSelected,
  setSelectedFilter,
  setOpenCsvModal
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [uploadCSV, uploadCSVResponse] = useUploadCSVfileMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv') {
        alert('Please upload a valid CSV file.');
        return;
      }
      const newFormData = new FormData();
      newFormData.append('csv_file', file);
      setFormData(newFormData);
    }
  };

  const { toast } = useToast();

  const handleUpload = async () => {
    if (!formData) {
      toast({
        variant: 'default',
        title: 'File not selected',
        description: `Please select a CSV file.`
      });
      return;
    } else {
      try {
        const response = await uploadCSV(formData);
        if (response.data?.success) {
          setSelectedFilter(null);
          setAssetsSelected((prev) => {
            return {
              ...prev,
              device_identifier:
                response?.data?.data.records[0].deviceIdentifier.map(
                  (e: string) => {
                    return { label: e, value: e };
                  }
                )
            };
          });
          setOpenCsvModal(false);
        } else if (response.error) {
          toast({
            variant: 'default',
            title: 'Upload error!',
            description: 'There was an error while uploading the file.'
          });
        }
      } catch (error) {
        toast({
          variant: 'default',
          title: 'Upload error!',
          description: 'An unecpected error occured.'
        });
      }
    }
  };

  return (
    <div className="space-y-2">
      <Input type="file" accept=".csv" onChange={handleFileChange} />{' '}
      <Button
        className="bg-[#0A3690]"
        disabled={uploadCSVResponse.isLoading}
        onClick={handleUpload}
      >
        {uploadCSVResponse.isLoading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
};

export default UploadCSVfile;
