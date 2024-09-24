import { FC, useState } from 'react';
import { useGetRuleDetailQuery } from '@/store/vee/veeApi';
import RuleDetails from '@/components/customUI/vee/Modals/rule/RuleCondition/RuleDetails';
import BaseModal from '@/components/customUI/Modals';
import { SummaryListRecord } from '@/store/vee/types/records/summary';
import Spinner from '@/components/customUI/Loaders/Spinner';
import Eye from '@/components/svg/Eye';

interface FailedValidationRule {
    data: SummaryListRecord;
}

const FailedValidationRule: FC<FailedValidationRule> = ({ data: { rule_id } }) => {
    
    const [open, setOpen] = useState(false);
    const { data, isLoading, isError, isUninitialized } = useGetRuleDetailQuery(
        { id: rule_id ?? '' },
        { skip: !open || !rule_id }
    );

    return (
        <BaseModal
            open={open}
            setOpen={setOpen}
            dialogTitle="Failed Rule"
            ButtonLogo={Eye}
        >
            {isUninitialized && <h4 className='font-semibold text-lg'>Missing Check</h4>}
            {isLoading && <Spinner />}
            {isError && <p>Error loading rule details</p>}
            {data && <RuleDetails ruleDetails={data} />}
        </BaseModal>

    );
};
export default FailedValidationRule;



