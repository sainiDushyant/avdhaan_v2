import { FC, useCallback, useState, useTransition } from 'react'
import SubmitButton from '@/components/customUI/Button/SubmitButton'
import { MultiValue } from 'react-select'
import { Option } from '@/store/vee/types/other'
import useCommandOptions from '@/hooks/hes/useCommandOptions'
import { CommandInfoRecordTransformed } from '@/store/hes/types/records/command-execution'
import ParametrizedFilters from './ParametrizedFilters'
import DisabledFilters from './DisabledFilters'
import useSubmitCommandExecution from '@/hooks/hes/useSubmitCommandExecution'
import SingleOptionSelect from '@/components/customUI/Select/SingleOptionSelect'
import DeviceIdentifier from '@/components/customUI/hes/HesFilters/PrimaryFilters/DeviceIdentifier'

interface CommandFormProps {
    refetch: () => void;
}

const CommandForm: FC<CommandFormProps> = ({ refetch }) => {

    const [deviceIdentifiers, setSelectedDeviceIdentifier] = useState<MultiValue<Option>>([]);
    const [command, setCommand] = useState<CommandInfoRecordTransformed | null>(null);

    const [isPending, startTransition] = useTransition();

    const { commandData, commandLoading } = useCommandOptions()

    const handleChangeDeviceIdentifier = useCallback((selected: MultiValue<Option>) => {
        setSelectedDeviceIdentifier(selected);
    }, []);

    const handleChangeCommand = useCallback((selected: CommandInfoRecordTransformed | null) => {
        startTransition(() => {
            setCommand(selected);
        })
    }, []);

    const resetCommandForm = useCallback(() => {
        setSelectedDeviceIdentifier([]);
        setCommand(null);
        refetch();
    }, [ setSelectedDeviceIdentifier, setCommand, refetch ])

    const { isLoading, handleSubmit } = useSubmitCommandExecution({ 
        command: command as CommandInfoRecordTransformed, 
        deviceIdentifiers,
        resetCommandForm
    })

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

        {
            !isPending && command && command.argsType !== "" && (
                <ParametrizedFilters
                    argsType={command.argsType}
                    params={command.params}
                />
            )
        }

        <DeviceIdentifier 
            primaryFilters={{ device_identifier: deviceIdentifiers }} 
            deviceIdentifier={deviceIdentifiers} 
            required={true}
            onChange={handleChangeDeviceIdentifier} 
        />

        {
            !isPending && command && 
                <DisabledFilters command={command} />
        }
        <SubmitButton 
            title='Execute Command' disabled={isLoading} 
            customButtonCss="date-filter-color"
        />
    </form>
  )
}

export default CommandForm