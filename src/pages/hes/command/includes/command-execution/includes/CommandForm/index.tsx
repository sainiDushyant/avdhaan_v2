import { FC, useCallback, useState, useTransition } from 'react';
import SubmitButton from '@/components/customUI/Button/SubmitButton';
import { Option } from '@/store/vee/types/other';
import useCommandOptions from '@/hooks/hes/useCommandOptions';
import { CommandInfoRecordTransformed } from '@/store/hes/types/records/command-execution';
import ParametrizedFilters from './ParametrizedFilters';
import DisabledFilters from './DisabledFilters';
import useSubmitCommandExecution from '@/hooks/hes/useSubmitCommandExecution';
import SingleOptionSelect from '@/components/customUI/Select/SingleOptionSelect';
import { useSelector } from '@/store';

interface CommandFormProps {
  identifiers: string[];
}

const CommandForm: FC<CommandFormProps> = ({ identifiers }) => {
  const csvParsedDeviceIdentifiers = useSelector(
    (state) => state.hes.deviceIdentifiers
  );
  const [deviceIdentifiers, setSelectedDeviceIdentifier] = useState<string[]>(
    identifiers.length > 0 ? identifiers : csvParsedDeviceIdentifiers
  );

  const [command, setCommand] = useState<CommandInfoRecordTransformed | null>(
    null
  );

  const [isPending, startTransition] = useTransition();

  const { commandData, commandLoading } = useCommandOptions();

  const handleChangeCommand = useCallback(
    (selected: CommandInfoRecordTransformed | null) => {
      startTransition(() => {
        setCommand(selected);
      });
    },
    []
  );

  const resetCommandForm = useCallback(() => {
    setCommand(null);
  }, [setSelectedDeviceIdentifier, setCommand]);

  const { isLoading, handleSubmit } = useSubmitCommandExecution({
    command: command as CommandInfoRecordTransformed,
    deviceIdentifiers,
    resetCommandForm
  });

  return (
    <form
      className="p-5 rounded-lg bg-white my-3 flex-1 flex flex-wrap gap-x-5 gap-y-5"
      onSubmit={handleSubmit}
    >
      <SingleOptionSelect
        handleChange={handleChangeCommand as (selected: Option | null) => void}
        value={command}
        loading={commandLoading}
        placeholder={'command'}
        data={commandData}
        required
        customCss="flex-none md:min-w-[220px]"
      />

      {!isPending && command && command.argsType !== '' && (
        <ParametrizedFilters
          argsType={command.argsType}
          params={command.params}
        />
      )}

      {!isPending && command && <DisabledFilters command={command} />}
      <SubmitButton
        title="Execute Command"
        disabled={isLoading}
        customButtonCss="date-filter-color"
      />
    </form>
  );
};

export default CommandForm;
