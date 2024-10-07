import { ChangeEvent, FC, useCallback, useState } from 'react';
import MultiOptionSelect from '@/components/customUI/Select/MultiOptionSelect'
import RefreshButton from '@/components/svg/RefreshButton'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MultiValue } from 'react-select';
import { Option } from "@/store/vee/types/other";
import { CommandHistoryQueryParams } from '@/store/hes/types/records/command-execution';
import { executionStatusData } from '@/lib/hes';
import DeviceIdentifier from '@/components/customUI/hes/HesFilters/PrimaryFilters/DeviceIdentifier';
import { useSearchParams } from 'react-router-dom';

interface CommandHistoryFiltersProps {
    hideNameFilter?: boolean;
    showDeviceIdentifier?: boolean;
    noSearchParams?: boolean;
    setQuery: React.Dispatch<React.SetStateAction<CommandHistoryQueryParams>>;
    refetchCommandExecutionHistory?: () => void;
}

const CommandHistoryFilters: FC<CommandHistoryFiltersProps> = ({
    hideNameFilter, showDeviceIdentifier, noSearchParams,
    setQuery, refetchCommandExecutionHistory
}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentStatus, setCurrentStatus] = useState<MultiValue<Option>>([]);
    const [deviceIdentifier, setDeviceIdentifier] = useState<MultiValue<Option>>([]);
    const [commandName, setCommandName] = useState("");

    const handleChangeExecutionStatus = useCallback((selected: MultiValue<Option>) => {
        setCurrentStatus(selected);
    }, [setCurrentStatus])

    const handleChangeDeviceIdentifier = useCallback((selected: MultiValue<Option>) => {
        setDeviceIdentifier(selected);
    }, [setDeviceIdentifier])

    const applySearchFilters = useCallback(() => {
        const statusQuery = currentStatus.map(item => item.value);
        const deviceQuery = deviceIdentifier.map(item => item.value);
        if(!noSearchParams){
            const page = searchParams.get('page');
            if(page && Number(page) !== 1){
                searchParams.delete("page")
                setSearchParams(searchParams)
            }
        }
        setQuery({ 
            command_name: commandName, 
            command_status: statusQuery, 
            device_identifier: deviceQuery 
        });
    }, [
        currentStatus, deviceIdentifier, commandName, 
        searchParams, noSearchParams, setQuery 
    ]);

    const handleChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCommandName(event.target.value);
    }, [setCommandName]);

    const resetFilters = useCallback(() => {
        setQuery({});
        setCommandName("");
        setCurrentStatus([]);
        setDeviceIdentifier([]);
        if(!noSearchParams){
            const page = searchParams.get('page');
            if(page && Number(page) !== 1){
                searchParams.delete("page")
                setSearchParams(searchParams)
            }
        }
    }, [
        searchParams, noSearchParams, setQuery, 
        setCommandName, setCurrentStatus, setSearchParams
    ])


    return (
        <div className="flex gap-4 items-center justify-between mb-5">
            <div className="flex-1 flex gap-3 items-center flex-wrap">

                <MultiOptionSelect
                    loading={false}
                    placeholder={"Execution status"}
                    data={executionStatusData}
                    handleChange={handleChangeExecutionStatus}
                    value={currentStatus}
                    customCss="flex-none xl:flex-none md:min-w-[170px]"
                />

                {!hideNameFilter &&
                    <Input
                        className="flex-1 outline-blue-500 border border-[#ccc] rounded-md h-[38px] min-w-[170px] md:max-w-[220px]"
                        placeholder="Search name"
                        value={commandName}
                        onChange={handleChangeName}
                    />
                }

                {
                    showDeviceIdentifier &&
                    <DeviceIdentifier
                        primaryFilters={{ device_identifier: deviceIdentifier }}
                        deviceIdentifier={deviceIdentifier}
                        onChange={handleChangeDeviceIdentifier}
                    />
                }

                <Button
                    className="date-filter-color"
                    variant={'secondary'}
                    onClick={applySearchFilters}
                >
                    Apply
                </Button>

                <Button
                    className="destroy-filter-color"
                    variant={'secondary'}
                    onClick={resetFilters}
                >
                    Clear
                </Button>

            </div>

            {refetchCommandExecutionHistory &&
                <div className="flex gap-3 items-center">
                    <Button
                        variant={'ghost'}
                        className="refresh-button p-0 min-w-[35px]"
                        onClick={refetchCommandExecutionHistory}
                    >
                        <RefreshButton />
                    </Button>
                </div>
            }
        </div>
    )
}

export default CommandHistoryFilters