import { Input } from '@/components/ui/input'
import { ChangeEvent, FC, useCallback } from 'react';

interface BaseFormProps {
    baseState: {
        name: string;
        description: string;
    }
    setBaseState: React.Dispatch<React.SetStateAction<{
        name: string;
        description: string;
    }>>
    name: string;
}

const BaseForm: FC<BaseFormProps> = ({ baseState, setBaseState, name }) => {

    const title = name.split("-").join(" ");

    const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setBaseState(prevData => ({ ...prevData, "name": e.target.value }));
    }, [ setBaseState ])

    const handleChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setBaseState(prevData => ({ ...prevData, "description": e.target.value }));
    }, [ setBaseState ])

    return (
        <>
            <div>
                <label
                    htmlFor={`${name}-name`}
                    className='capitalize mb-1'
                >
                    {title} name
                </label>
                <Input
                    name={`${name}-name`}
                    value={baseState.name}
                    onChange={handleChangeName}
                    className='outline-none'
                    required
                />
            </div>

            <div>
                <label
                    htmlFor={`${name}-desc`}
                    className='capitalize mb-1'
                >
                    {title} description
                </label>
                <textarea
                    className="w-full border border-input p-2 rounded-sm outline-none"
                    rows={3}
                    name={`${name}-desc`}
                    required
                    value={baseState.description}
                    onChange={handleChangeDescription}
                />
            </div>
        </>
    )
}

export default BaseForm