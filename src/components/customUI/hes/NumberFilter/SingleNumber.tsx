import { FC, useCallback, useState } from 'react'
import { NumberParams } from '@/store/hes/types/records/command-execution';
import SingleOptionSelect from '@/components/customUI/Select/SingleOptionSelect';
import { Option } from '@/store/vee/types/other';
import { cn } from '@/lib/utils';

interface SingleNumberProps {
    params: NumberParams;
    customCss?: string;
}

const SingleNumber: FC<SingleNumberProps> = ({ params, customCss }) => {

    const data: Option[] = params.allowed_values.map(item => ({ 
        label: item.toString(), 
        value: item.toString() 
    }));

    const [number, setNumber] = useState<Option | null>(null);

    const handleChangeNumber = useCallback((value: Option | null) => {
        setNumber(value);
    }, []);

    return (
        <SingleOptionSelect 
            handleChange={handleChangeNumber} 
            value={number} 
            loading={false} 
            placeholder={'Number'} 
            data={data} 
            customCss={cn("flex-none md:min-w-[120px]", customCss)}
            required={true}
            name='from'
        />
    )
}

export default SingleNumber