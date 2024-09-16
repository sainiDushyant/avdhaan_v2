import { type FC, type Dispatch, type SetStateAction, type ReactNode, type ComponentType } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface BaseModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title?: string;
    dialogTitle?: string;
    children?: ReactNode;
    buttonClass?: string;
    modalClass?: string;
    ButtonLogo?: ComponentType<object>;
}

const BaseModal: FC<BaseModalProps> = ({
    open, title, ButtonLogo, dialogTitle, 
    buttonClass, modalClass, children, setOpen
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
                className={cn(
                    "text-xs lg:text-base h-[38px] text-ellipsis overflow-hidden p-1 py-0 px-3 rounded-md select-none",
                    buttonClass
                )}
            >
                {title && title}
                {ButtonLogo && <ButtonLogo />}
            </DialogTrigger>
            <DialogContent className={cn("min-w-[40vw]", modalClass)}>
                {dialogTitle &&
                    <DialogHeader>
                        <DialogTitle className='text-start text-[#0A3690] font-semibold mb-5'>{dialogTitle}</DialogTitle>
                    </DialogHeader>
                }
                {children && children}
            </DialogContent>
        </Dialog>
    )
}

export default BaseModal