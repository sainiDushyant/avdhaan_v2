import { FC, useState } from 'react'
import BaseModal from '@/components/customUI/Modals';
import { RuleRecord } from '@/store/vee/types/records/rule';
import RuleDetails from './RuleDetails';

interface RuleConditionProps {
    data: RuleRecord;
    cb?: () => void
}

const RuleCondition: FC<RuleConditionProps> = ({ data }) => {
    const [open, setOpen] = useState(false);

    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            title="Details"
            dialogTitle="Rule Details"
            buttonClass="tertiary-vee-btn"
        >
            
            <RuleDetails ruleDetails={data} />
        </BaseModal>
    )
}

export default RuleCondition