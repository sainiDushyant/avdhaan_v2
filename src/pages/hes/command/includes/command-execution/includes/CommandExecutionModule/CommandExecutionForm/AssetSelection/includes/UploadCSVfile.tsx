import { FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUploadCSVfileMutation } from '@/store/hes/hesApi';

const UploadCSVfile: FC = () => {
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
          console.log(response.data.data.records);
        } else if (response.data?.error) {
          toast({
            variant: 'default',
            title: 'Upload error!',
            description: response.data.error.errorMsg
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
