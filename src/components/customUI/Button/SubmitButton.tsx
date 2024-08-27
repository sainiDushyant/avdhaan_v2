import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface SubmitButtonProps {
    disabled?: boolean;
    title?: string;
    customButtonCss?: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ disabled, title, customButtonCss }) => {
    return (
        <Button
            type="submit" variant="ghost"
            className={cn(
                "flex-1 md:flex-none px-5 hover:bg-[none] hover:text-[none] primary-vee-btn select-none", 
                customButtonCss
            )}
            disabled={disabled}
        >
            {title ? title : 'Submit'}
        </Button>

    )
}

export default SubmitButton