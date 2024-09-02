import { FC } from 'react';
import AsyncSelect from 'react-select/async'
import { Option } from '@/store/vee/types/other';

interface AsyncSingleOptionSelectProps {
    loadOptions: (inputValue: string) => Promise<{ label: string; value: string; }[]>;
    handleChange: (selected: Option | null) => void;
    value: Option | null;
    loading: boolean;
    placeholder: string;
}

const AsyncSingleOptionSelect: FC<AsyncSingleOptionSelectProps> = ({
    value, loading, placeholder, loadOptions, handleChange
}) => {
    return (
        <AsyncSelect
            isMulti={false}
            cacheOptions
            loadOptions={loadOptions}
            value={value}
            onChange={handleChange}
            className="md:min-w-[170px] flex-1"
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

export default AsyncSingleOptionSelect