import { FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUploadFileWithProgressMutation } from '@/store/hes/hesApi';
import { HigherOrderFilterType } from '../../..';
import { setDeviceIdentifiers } from '@/store/hes';
import { useAppDispatch } from '@/store';
import { CustomHesApiError } from '@/store/hes/types/other';
import { Progress } from "@/components/ui/progress"

type UploadCSVfileProps = {
  setSelectedFilter: React.Dispatch<React.SetStateAction<HigherOrderFilterType>>;
  setOpenCsvModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const UploadCSVfile: FC<UploadCSVfileProps> = ({
  setSelectedFilter,
  setOpenCsvModal,
  setCurrentStep
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [progress, setProgress] = useState(0)
  const [uploadCsvWithProgress, { isLoading }] = useUploadFileWithProgressMutation()

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: 'default',
          title: 'File too large!',
          description: 'Please select a file with a max size of 2MB.'
        });
        event.target.files = null;
        return;
      }
      if (file.type !== 'text/csv') {
        toast({
          variant: 'default',
          title: 'Invalid file format',
          description: 'Please select a file with .csv format'
        });
        return;
      }
      const newFormData = new FormData();
      newFormData.append('csv_file', file);
      setFormData(newFormData);
    }
  };

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
        const response = await uploadCsvWithProgress({
          formData,
          onProgress: function (progress: number): void {
            setProgress(progress)
          }
        })
        if (response.data?.success) {
          const deviceIds = response.data?.data.records[0].deviceIdentifier;
          setSelectedFilter(null);
          dispatch(setDeviceIdentifiers(deviceIds));
          setOpenCsvModal(false);
          setCurrentStep(2);
          return
        }
        toast({
          variant: 'default',
          title: 'Upload error!',
          description: 'There was an error while uploading the file.'
        });

      } catch (error) {
        const errorObj = error as CustomHesApiError;
        let errorMsg = 'Failed to execute command';
        if (
          errorObj.data &&
          errorObj.data.error &&
          errorObj.data.error.errorMsg
        ) {
          errorMsg = errorObj.data.error.errorMsg;
        }
        toast({
          variant: 'destructive',
          title: 'Uh oh! Upload Error',
          description: errorMsg
        });
      }
    }
  };

  return (
    <div className="space-y-2">
      <Input type="file" accept=".csv" onChange={handleFileChange} />{' '}
      <Button
        className="bg-[#0A3690]"
        disabled={isLoading}
        onClick={handleUpload}
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </Button>
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
};

export default UploadCSVfile;
