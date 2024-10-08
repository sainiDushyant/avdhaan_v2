import { useToast } from '@/components/ui/use-toast';
import { useExecuteCommandMutation } from '@/store/hes/hesApi';
import { useCallback } from 'react';
import { MultiValue } from 'react-select';
import { Option } from '@/store/vee/types/other';
import { getCommandArgsValue } from '@/lib/hes';
import {
  CommandInfoRecordTransformed,
  ExecuteCommandPayload
} from '@/store/hes/types/records/command-execution';
import { CustomHesApiError } from '@/store/hes/types/other';

interface useSubmitCommandExecutionProps {
  command: CommandInfoRecordTransformed;
  deviceIdentifiers: string[];
  resetCommandForm: () => void;
}

const useSubmitCommandExecution = ({
  command,
  deviceIdentifiers,
  resetCommandForm
}: useSubmitCommandExecutionProps) => {
  const { toast } = useToast();

  const [executeCommand, { isLoading }] = useExecuteCommandMutation();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const selectedCommand = command as CommandInfoRecordTransformed;
      const selectedCommandArg = selectedCommand.argsType;
      const selectedCommandParameter = selectedCommand.params;
      const formData = new FormData(e.target as HTMLFormElement);
      const argsValue = getCommandArgsValue(
        formData,
        selectedCommandArg,
        selectedCommandParameter
      );
      const apiPayload: ExecuteCommandPayload = {
        clientRequestID: (Math.random() + 1).toString(36).substring(7),
        deviceInfo: {
          category: 'Meter',
          identifierType: 'device_identifier',
          identifiers: deviceIdentifiers
        },
        commandInfo: {
          command: command.name,
          argsType: command.argsType,
          argsMode: command.argsMode,
          deviceCommands: null,
          args: argsValue
        }
      };
      try {
        await executeCommand(apiPayload).unwrap();
        toast({
          variant: 'default',
          description: 'Command executed successfully'
        });
        resetCommandForm();
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
          title: 'Uh oh! Something went wrong.',
          description: errorMsg
        });
      }
    },
    [command, deviceIdentifiers, toast, executeCommand, resetCommandForm]
  );

  return {
    isLoading,
    handleSubmit
  };
};

export default useSubmitCommandExecution;
