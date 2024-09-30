import { useToast } from "@/components/ui/use-toast";
import { useUpdateDeviceInfoMutation } from "@/store/hes/hesApi";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../Button/SubmitButton";
import { Input } from "@/components/ui/input";
import FormCheckbox from "./FormCheckbox";
import { DeviceDetailRecord, UpdateDevicePayload } from "@/store/hes/types/records/device-information";
import { cn } from "@/lib/utils";
import { CustomHesApiError } from "@/store/hes/types/other";

interface UpdateDeviceFormProps {
  deviceInfo: DeviceDetailRecord;
  formCss?: string;
  onSubmitCb?: () => void;
}
const UpdateDeviceForm: FC<UpdateDeviceFormProps> = ({ deviceInfo, formCss, onSubmitCb }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [updateDeviceInfo, { isLoading }] = useUpdateDeviceInfoMutation();

  const [simInfo, setSimInfo] = useState({
    primary: {
      ipv6Address: deviceInfo?.simInformation?.[0]?.ipv6Address || '',
      simNo: deviceInfo?.simInformation?.[0]?.simNo || ''
    },
    secondary: {
      ipv6Address: deviceInfo?.simInformation?.[1]?.ipv6Address || '',
      simNo: deviceInfo?.simInformation?.[1]?.simNo || ''
    },
  });

  const [isSimEnabled, setIsSimEnabled] = useState({
    primary: true,
    secondary: true,
  });

  const handleCheckboxChange = (simType: 'primary' | 'secondary') => {
    setIsSimEnabled((prev) => ({
      ...prev,
      [simType]: !prev[simType],
    }));
  };

  const handleSimInfoChange = (e: React.ChangeEvent<HTMLInputElement>, simType: 'primary' | 'secondary', field: string) => {
    const { value } = e.target;
    setSimInfo((prev) => ({
      ...prev,
      [simType]: {
        ...prev[simType],
        [field]: value,
      },
    }));
  };

  const handleUpdateDevice = useCallback(async (apiPayload: UpdateDevicePayload) => {
    try {
      await updateDeviceInfo(apiPayload).unwrap();
      toast({ variant: 'default', description: 'Device updated successfully' });
      if (onSubmitCb) onSubmitCb();
      else navigate('/device-management');
    } catch (error) {
      const errorObj = error as CustomHesApiError;
      const errorMsg = errorObj?.data?.error?.errorMsg || 'Failed to update device';
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: errorMsg,
      });
    }
  }, [updateDeviceInfo, toast, onSubmitCb, navigate]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatePayload: UpdateDevicePayload = {
      simDetails: {
        primarySimInfo: isSimEnabled.primary ? {
          ...deviceInfo.simInformation?.[0],
          simNo: simInfo.primary.simNo,
          ipv6Address: simInfo.primary.ipv6Address,
          port: deviceInfo?.connectionInfo?.port || 0,
        } : null,
        secondarySimInfo: isSimEnabled.secondary ? {
          ...deviceInfo.simInformation?.[1],
          simNo: simInfo.secondary.simNo,
          ipv6Address: simInfo.secondary.ipv6Address,
          port: deviceInfo?.connectionInfo?.port || 0,
        } : null,
      },
      communicationProtocol: deviceInfo.communicationProtocol,
      deviceIdentifier: deviceInfo.deviceIdentifier,
    };

    handleUpdateDevice(updatePayload);
  }, [isSimEnabled, simInfo, deviceInfo, handleUpdateDevice]);

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-4 p-4', formCss)}>
      <FormCheckbox
        label="Primary SIM"
        checked={isSimEnabled.primary}
        onChange={() => handleCheckboxChange('primary')}
      />
      {isSimEnabled.primary && (
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Primary SIM IPv6 Address"
            value={simInfo.primary.ipv6Address}
            onChange={(e) => handleSimInfoChange(e, 'primary', 'ipv6Address')}
            required
          />
          <Input
            type="number"
            placeholder="Primary SIM Serial No."
            value={simInfo.primary.simNo}
            onChange={(e) => handleSimInfoChange(e, 'primary', 'simNo')}
            required
          />
        </div>
      )}

      <FormCheckbox
        label="Secondary SIM"
        checked={isSimEnabled.secondary}
        onChange={() => handleCheckboxChange('secondary')}
      />
      {isSimEnabled.secondary && (
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Secondary SIM IPv6 Address"
            value={simInfo.secondary.ipv6Address}
            onChange={(e) => handleSimInfoChange(e, 'secondary', 'ipv6Address')}
            required
          />
          <Input
            type="number"
            placeholder="Secondary SIM Serial No."
            value={simInfo.secondary.simNo}
            onChange={(e) => handleSimInfoChange(e, 'secondary', 'simNo')}
            required
          />
        </div>
      )}

      <SubmitButton title="Update" disabled={isLoading} />
    </form>
  );
};

export default UpdateDeviceForm;