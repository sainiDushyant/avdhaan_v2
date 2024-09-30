import { FC } from 'react';
import AsyncSelect from 'react-select/async'
import { Option } from '@/store/vee/types/other';
import { cn } from '@/lib/utils';

interface AsyncSingleOptionSelectProps {
    loadOptions: (inputValue: string) => Promise<{ label: string; value: string; }[]>;
    handleChange: (selected: Option | null) => void;
    value: Option | null;
    loading: boolean;
    placeholder: string;
    customCss?: string;
    required?: boolean;
}

const AsyncSingleOptionSelect: FC<AsyncSingleOptionSelectProps> = ({
    value, loading, placeholder, customCss, required, loadOptions, handleChange
}) => {
    return (
        <AsyncSelect
            isMulti={false}
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
            required={required}
        />
    )
}

export default AsyncSingleOptionSelect