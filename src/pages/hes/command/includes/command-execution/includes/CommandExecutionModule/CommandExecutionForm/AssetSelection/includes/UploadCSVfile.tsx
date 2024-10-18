import { FC, useState, useRef } from 'react';
import Button from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUploadFileWithProgressMutation } from '@/store/hes/hesApi';
import { HigherOrderFilterType } from '../../..';
import { setDeviceIdentifiers } from '@/store/hes';
import { useAppDispatch } from '@/store';
import { CustomHesApiError } from '@/store/hes/types/other';
import ProgressBar from './ProgressBar';
import CsvFileLogo from '@/components/svg/CsvFileLogo';
import { Dropzone } from '@/components/ui/dropzone';

type UploadCSVfileProps = {
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<HigherOrderFilterType>
  >;
  setOpenCsvModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const UploadCSVfile: FC<UploadCSVfileProps> = ({
  setSelectedFilter,
  setOpenCsvModal,
  setCurrentStep
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadCsvWithProgress, { isLoading }] =
    useUploadFileWithProgressMutation();
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  // Create a ref to store the AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large!',
          description: 'Please select a file with a max size of 2MB.'
        });
        event.target.files = null;
        return;
      }
      if (file.type !== 'text/csv') {
        toast({
          variant: 'destructive',
          title: 'Invalid file format',
          description: 'Please select a file with .csv format'
        });
        return;
      }
      setFile(file);
      const newFormData = new FormData();
      newFormData.append('csv_file', file);
      setFormData(newFormData);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setFormData(null);
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setFile(null);
    setFormData(null);
  };

  const handleUpload = async () => {
    if (!formData) {
      toast({
        variant: 'destructive',
        title: 'File not selected',
        description: `Please select a CSV file.`
      });
      return;
    }

    try {
      // Initialize the AbortController
      abortControllerRef.current = new AbortController();

      // Initiate the mutation with the AbortController's signal
      const response = await uploadCsvWithProgress({
        formData,
        onProgress: (progress: number) => {
          setProgress(progress);
        },
        signal: abortControllerRef.current.signal // Pass the abort signal here
      });

      if (response.data?.success) {
        const deviceIds = response.data?.data.records[0].deviceIdentifier;
        setSelectedFilter(null);
        dispatch(setDeviceIdentifiers(deviceIds));
        setOpenCsvModal(false);
        setCurrentStep(2);
        return;
      }
      toast({
        variant: 'destructive',
        title: 'Upload error!',
        description: 'There was an error while uploading the file.'
      });
    } catch (error: unknown) {
      // Check if the error is an AbortError
      if (error instanceof DOMException && error.name === 'AbortError') {
        toast({
          variant: 'destructive',
          title: 'Upload canceled',
          description: 'The file upload was canceled.'
        });
      } else {
        // Handle other errors
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
          title: 'Upload error!',
          description: errorMsg || 'An unexpected error occurred.'
        });
      }
    }
  };

  return (
    <div className="space-y-2">
      <Dropzone type="file" accept=".csv" onChange={handleFileChange} />
      <div className="flex justify-between text-sm text-[#A3B2CF] font-semibold">
        <span>Supported formats: CSV</span>
        <span>Maximum size: 2MB</span>
      </div>
      {file && (
        <div className="bg-[#F3F5F7] p-5 rounded-lg">
          <div className="flex justify-between mb-2">
            <div className="flex items-center space-x-2">
              <CsvFileLogo />
              <div className="flex flex-col">
                <span className="font-bold text-[#464E5F]">{file.name}</span>
                <span className="text-[#A3B2CF] text-sm">
                  {file.size < 1024
                    ? `${file.size} Bytes`
                    : file.size < 1024 * 1024
                    ? `${(file.size / 1024).toFixed(2)} KB`
                    : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                </span>
              </div>
            </div>
            <button
              onClick={handleRemove}
              disabled={isLoading}
              type="button"
              className="close-icon font-semibold"
            >
              x
            </button>
          </div>
          <ProgressBar progress={progress} />
        </div>
      )}
      <div className="flex gap-2 float-right">
        <Button
          className="bg-[#A3B2CF]"
          disabled={!isLoading}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-[#0A3690]"
          disabled={isLoading || !file}
          onClick={handleUpload}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};

export default UploadCSVfile;
