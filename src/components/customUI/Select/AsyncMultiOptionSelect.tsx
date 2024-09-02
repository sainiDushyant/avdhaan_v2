import { FC } from 'react';
import { MultiValue } from 'react-select';
import AsyncSelect from 'react-select/async'
import { Option } from '@/store/vee/types/other';
import { cn } from '@/lib/utils';

interface AsyncMultiOptionSelectProps {
    loadOptions: (inputValue: string) => Promise<{ label: string; value: string; }[]>;
    handleChange: (selected: MultiValue<Option>) => void;
    value: MultiValue<Option>;
    loading: boolean;
    placeholder: string;
    customCss?: string;
}

const AsyncMultiOptionSelect: FC<AsyncMultiOptionSelectProps> = ({
    value, loading, placeholder, customCss,
    loadOptions, handleChange
}) => {
    return (
        <AsyncSelect
            isMulti
            cacheOptions
            loadOptions={loadOptions}
            value={value}
            onChange={handleChange}
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
        />
    )
}

export default AsyncMultiOptionSelect