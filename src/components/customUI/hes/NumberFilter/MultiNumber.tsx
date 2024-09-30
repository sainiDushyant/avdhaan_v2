import { FC, useCallback, useState } from 'react'
import { NumberParams } from '@/store/hes/types/records/command-execution';
import MultiOptionSelect from '@/components/customUI/Select/MultiOptionSelect';
import { Option } from '@/store/vee/types/other';
import { MultiValue } from 'react-select';
import { cn } from '@/lib/utils';

interface MultiNumberProps {
    params: NumberParams;
    customCss?: string;
}

const MultiNumber: FC<MultiNumberProps> = ({ params, customCss }) => {

    const data: Option[] = params.allowed_values.map(item => ({ 
        label: item.toString(), 
        value: item.toString() 
    }));

    const [number, setNumber] = useState<MultiValue<Option>>([]);

    const handleChangeNumber = useCallback((selected: MultiValue<Option>) => {
        setNumber(selected);
    }, []);

    return (
        <MultiOptionSelect 
            handleChange={handleChangeNumber} 
            value={number} 
            loading={false} 
            placeholder={'Number'} 
            data={data} 
            customCss={cn("flex-none md:min-w-[120px]", "multi-number", customCss)}
            name='selected-numbers'
            required={true}
            
        />
    )
}

export default MultiNumber