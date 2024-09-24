import { useToast } from "@/components/ui/use-toast";
import { useUpdateCommandInfoMutation } from "@/store/hes/hesApi";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import SubmitButton from "../Button/SubmitButton";
import { ConfigureCommandRecord, UpdateCommandPayload } from "@/store/hes/types/records/configure-command";
import SingleOptionSelect from "../Select/SingleOptionSelect";
import { CustomHesApiError } from "@/store/hes/types/other";

interface UpdateConfigureCommandProps {
    commandInfo: ConfigureCommandRecord;
    formCss?: string;
    onSubmitCb?: () => void;
}

const PRIORITY_OPTIONS = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Less", value: "less" },
];

const UpdateCommandForm: FC<UpdateConfigureCommandProps> = ({ commandInfo, formCss, onSubmitCb }) => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [updateCommandInfo, { isLoading }] = useUpdateCommandInfoMutation();

    const [priority, setPriority] = useState(PRIORITY_OPTIONS[0]);

    const [configCommandInfo, setCommandInfo] = useState({
        retryCount: commandInfo?.retryCount,
        timeout: commandInfo?.timeout,
    });

    const handleCommandInfoChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const { value } = e.target;
        setCommandInfo((prev) => ({ ...prev, [field]: value }));
    };


    const handleUpdateDevice = useCallback(async (apiPayload: UpdateCommandPayload) => {
        try {
            await updateCommandInfo(apiPayload).unwrap();
            toast({ variant: "default", description: "Commands updated successfully" });
            if (onSubmitCb) return onSubmitCb();
            navigate('/config-command');
        } catch (error) {
            const errorObj = error as CustomHesApiError;
            let errorMsg = "Failed to update command"
            if (errorObj.data && errorObj.data.error && errorObj.data.error.errorMsg) {
                errorMsg = errorObj.data.error.errorMsg;
            }
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMsg,
            })
        }
    }, [updateCommandInfo, toast, onSubmitCb, navigate])

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const updatePayload: UpdateCommandPayload = {
                // commandId: commandInfo?.commandId,
                // protocol: commandInfo?.protocol,
                retryCount: configCommandInfo?.retryCount,
                timeout: configCommandInfo?.timeout,
                commandId: "BILLING",
                protocol: "DLMS"
            };


            handleUpdateDevice(updatePayload);
        },
        [configCommandInfo, handleUpdateDevice]

    );
    return (

        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4 p-4", formCss)}>

            <div className="grid grid-cols-3 gap-4">
                <Input
                    placeholder="Retry Count"
                    value={configCommandInfo.retryCount || ''}
                    onChange={(e) => handleCommandInfoChange(e, "retryCount")}
                />
                <Input
                    placeholder="Timeout"
                    value={configCommandInfo.timeout || ''}
                    onChange={(e) => handleCommandInfoChange(e, "timeout")}
                />
                <SingleOptionSelect
                    value={priority}
                    data={PRIORITY_OPTIONS}
                    name="priority"
                    disabled={true}
                    handleChange={() => { }}
                    loading={false}
                    placeholder="Set Priority" />
            </div>
            <SubmitButton title="Update" disabled={isLoading} />
        </form>
    );
};

export default UpdateCommandForm
