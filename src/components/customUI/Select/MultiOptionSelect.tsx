import { FC } from 'react';
import Select, { MultiValue } from 'react-select';
import { Option } from '@/store/vee/types/other';
import { cn } from '@/lib/utils';

interface MultiOptionSelectProps {
    handleChange: (selected: MultiValue<Option>) => void;
    value: MultiValue<Option>;
    loading: boolean;
    placeholder: string;
    data: Option[];
    customCss?: string;
    name?: string;
    required?: boolean,
}

const MultiOptionSelect: FC<MultiOptionSelectProps> = ({
    value, loading, placeholder, 
    handleChange, data, customCss, 
    name, required
}) => {
    return (
        <Select
            isMulti
            className={cn("flex-1 md:min-w-[170px] h-auto", customCss)}
            placeholder={`Search ${placeholder}`}
            noOptionsMessage={({ inputValue }) => (
                <p className="text-left text-sm">
                    No ${placeholder} found with {inputValue}
                </p>
            )}
            isLoading={loading}
            isClearable={true}
            isSearchable={true}
            value={value}
            onChange={handleChange}
            options={data}
            name={name}
            required={required}
        />
    )
}

export default MultiOptionSelect