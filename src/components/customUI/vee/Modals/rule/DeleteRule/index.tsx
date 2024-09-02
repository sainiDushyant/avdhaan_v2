import { FC, useCallback, useState } from 'react'
import BaseModal from '@/components/customUI/Modals';
import { RuleRecord } from '@/store/vee/types/records/rule';
import { useToast } from '@/components/ui/use-toast';
import { CustomAPIError } from '@/store/vee/types';
import { useDeleteRuleMutation } from '@/store/vee/veeApi';
import Button from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

interface DeleteRuleProps {
    data: RuleRecord;
    cb?: () => void
}

const ButtonLogo = () => {
    return <img 
        src="/vee/assets/images/other/trash.png" 
        alt="" height="auto" 
        style={{ maxWidth: 20 }} 
    />
};

const DeleteRule: FC<DeleteRuleProps> = ({ data, cb }) => {

    const ruleId = data.id;
    const [open, setOpen] = useState(false);

    const { toast } = useToast();
    const [deleteRule, { isLoading }] = useDeleteRuleMutation();

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const handleDeleteRule = useCallback(async () => {
        try {
            await deleteRule({ ruleId });
            setOpen(false);
            toast({
                variant: "default",
                description: "Rule deleted successfully",
            })
            if(cb) cb();
        } catch (error) {
            const errorMsg = error as CustomAPIError;
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMsg?.description || "Failed to delete rule",
            })
        }
    }, [ruleId, setOpen, toast, deleteRule, cb]);

    

    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            buttonClass="destructive-vee-btn flex items-center justify-center w-[35px]"
            modalClass="min-w-[10vw] py-12"
            ButtonLogo={ButtonLogo}
        >

            <DialogHeader>
                <img
                    src="/vee/assets/images/other/discovery.png"
                    height="auto" loading="lazy"
                    style={{ maxWidth: 70 }}
                    className="mx-auto"
                />
                <DialogTitle className='text-center font-semibold pt-5 text-[#464E5F]'>
                    <p className="font-semibold mb-1">Are you sure?</p>
                    <p className="font-semibold">You want to delete the rule?</p>
                </DialogTitle>

            </DialogHeader>


            <div className="flex justify-around mt-6">
                <Button
                    className="text-base py-2 min-w-[100px] primary-vee-btn hover:bg-[none] hover:text-[none]"
                    type="button"
                    variant="ghost"
                    onClick={handleDeleteRule}
                    disabled={isLoading}
                >
                    Yes
                </Button>

                <Button
                    className="text-base py-2 min-w-[100px] tertiary-vee-btn hover:bg-[none] hover:text-[none]"
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </div>
        </BaseModal>
    )
}

export default DeleteRule