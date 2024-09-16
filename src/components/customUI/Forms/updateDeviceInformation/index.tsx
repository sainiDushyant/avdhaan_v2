import { useToast } from "@/components/ui/use-toast";
import { useUpdateDeviceInfoMutation } from "@/store/hes/hesApi";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../Button/SubmitButton";
import { Input } from "@/components/ui/input";
import { CustomAPIError } from "@/store/hes/types";
import FormCheckbox from "./FormCheckbox";
import { DeviceDetailRecord, UpdateDevicePayload } from "@/store/hes/types/records/device-information";
import { cn } from "@/lib/utils";

interface UpdateDeviceFormProps {
  deviceInfo: DeviceDetailRecord;
  formCss?: string;
  onSubmitCb?: () => void;
}

const UpdateDeviceForm: FC<UpdateDeviceFormProps> = ({ deviceInfo, formCss, onSubmitCb }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [updateDeviceInfo, { isLoading }] = useUpdateDeviceInfoMutation();

  const [isPrimarySimChecked, setIsPrimarySimChecked] = useState(true);
  const [isSecondarySimChecked, setIsSecondarySimChecked] = useState(true);

  const [primarySimInfo, setPrimarySimInfo] = useState({
    ipv6Address: deviceInfo?.simInformation?.[0]?.ipv6Address,
    simNo: deviceInfo?.simInformation?.[0]?.simNo,
  });

  const [secondarySimInfo, setSecondarySimInfo] = useState({
    ipv6Address: deviceInfo?.simInformation?.[1]?.ipv6Address,
    simNo: deviceInfo?.simInformation?.[1]?.simNo,
  });

  const handleCheckboxChange = (simType: "primary" | "secondary") => {
    if (simType === "primary") {
      setIsPrimarySimChecked((prev) => !prev);
    } else {
      setIsSecondarySimChecked((prev) => !prev);
    }
  };

  const handleSimInfoChange = (e: React.ChangeEvent<HTMLInputElement>, simType: "primary" | "secondary", field: string) => {
    const { value } = e.target;
    if (simType === "primary") {
      setPrimarySimInfo((prev) => ({ ...prev, [field]: value }));
    } else {
      setSecondarySimInfo((prev) => ({ ...prev, [field]: value }));
    }
  };


  const handleUpdateDevice = useCallback(async (apiPayload: UpdateDevicePayload) => {
    try {
      await updateDeviceInfo(apiPayload);
      toast({ variant: "default", description: "Device updated successfully" });
      if (onSubmitCb) return onSubmitCb();
      navigate('/device-management');
    } catch (error) {
      const errorMsg = error as CustomAPIError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg?.description || "Failed to update rule",
      })
    }
  }, [updateDeviceInfo, toast, onSubmitCb, navigate])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const updatePayload: UpdateDevicePayload = {
        simDetails: {
          primarySimInfo: isPrimarySimChecked
            ? {
              tspName: deviceInfo?.simInformation?.[0]?.tspName || "",
              simNo: primarySimInfo.simNo || "DEFAULT_SIM_NO",
              imsiNumber: deviceInfo?.simInformation?.[0]?.imsiNumber || "",
              iccid: deviceInfo?.simInformation?.[0]?.iccid || "",
              ipv6Address: primarySimInfo.ipv6Address || "",
              port: deviceInfo?.connectionInfo?.port || 0,
            }
            : null,
          secondarySimInfo: isSecondarySimChecked
            ? {
              tspName: deviceInfo?.simInformation?.[1]?.tspName || "",
              simNo: secondarySimInfo.simNo || "DEFAULT_SIM_NO",
              imsiNumber: deviceInfo?.simInformation?.[1]?.imsiNumber || "",
              iccid: deviceInfo?.simInformation?.[1]?.iccid || "",
              ipv6Address: secondarySimInfo.ipv6Address || "",
              port: deviceInfo?.connectionInfo?.port || 0,
            }
            : null,
        },
        communicationProtocol: "TAP",
        deviceIdentifier: "POL99987709",
      };


      handleUpdateDevice(updatePayload);
    },
    [isPrimarySimChecked, primarySimInfo, isSecondarySimChecked, secondarySimInfo, handleUpdateDevice]

  );
  return (

    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4 p-4", formCss)}>
      <FormCheckbox
        label="Primary SIM"
        checked={isPrimarySimChecked}
        onChange={() => handleCheckboxChange("primary")}
      />
      {isPrimarySimChecked && (
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Primary SIM IPv6 Address"
            value={primarySimInfo.ipv6Address || ''}
            onChange={(e) => handleSimInfoChange(e, "primary", "ipv6Address")}
            disabled={!isPrimarySimChecked}
          />
          <Input
            placeholder="Primary SIM Serial No."
            value={primarySimInfo.simNo || ''}
            onChange={(e) => handleSimInfoChange(e, "primary", "simNo")}
            disabled={!isPrimarySimChecked}
          />
        </div>
      )}

      <FormCheckbox
        label="Secondary SIM "
        checked={isSecondarySimChecked}
        onChange={() => handleCheckboxChange("secondary")}
      />
      {isSecondarySimChecked && (
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Secondary SIM IPv6 Address"
            value={secondarySimInfo.ipv6Address || ''}
            onChange={(e) => handleSimInfoChange(e, "secondary", "ipv6Address")}
            disabled={!isSecondarySimChecked}
          />
          <Input
            placeholder="Secondary SIM Serial No."
            value={secondarySimInfo.simNo || ''}
            onChange={(e) => handleSimInfoChange(e, "secondary", "simNo")}
            disabled={!isSecondarySimChecked}
          />
        </div>
      )}

      <SubmitButton title="Update" disabled={isLoading} />
    </form>
  );
};

export default UpdateDeviceForm
