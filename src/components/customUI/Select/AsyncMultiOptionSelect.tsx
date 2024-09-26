import { FC } from 'react';
import { MultiValue } from 'react-select';
import AsyncSelect from 'react-select/async'
import { Option } from '@/store/vee/types/other';
import { cn } from '@/lib/utils';
import SelectInput from './SelectInput';


interface AsyncMultiOptionSelectProps {
    loadOptions: (inputValue: string) => Promise<{ label: string; value: string; }[]>;
    handleChange: (selected: MultiValue<Option>) => void;
    value: MultiValue<Option>;
    loading: boolean;
    placeholder: string;
    isDisabled?: boolean;
    customCss?: string;
    required?: boolean;
    cacheOptions?: boolean;
    defaultOptions?: Option[];
}

const AsyncMultiOptionSelect: FC<AsyncMultiOptionSelectProps> = ({
    value, loading, placeholder, customCss, 
    required, cacheOptions, isDisabled, defaultOptions,
    loadOptions, handleChange
}) => {

    return (
        <AsyncSelect
            isMulti
            cacheOptions={cacheOptions !== undefined ? cacheOptions : true}
            defaultOptions={defaultOptions}
            loadOptions={loadOptions}
            value={value}
            onChange={handleChange}
            components={{ Input: SelectInput }}
            className={cn("md:min-w-[170px] flex-1", customCss)}
            placeholder={`Search ${placeholder}`}
            noOptionsMessage={({ inputValue }) =>
                <p className="text-left">{
                    !inputValue ? `Enter ${placeholder}` :
                        `No ${placeholder} with ${inputValue}`
                }
                </p>
            }
            isLoading={loading}
            required={required}
            isDisabled={isDisabled}
        />
    )
}

export default AsyncMultiOptionSelect