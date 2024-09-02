import { FC, useState } from 'react';
import { useGetRuleDetailQuery } from '@/store/vee/veeApi';
import RuleDetails from '@/components/customUI/vee/Modals/rule/RuleCondition/RuleDetails';
import BaseModal from '@/components/customUI/Modals';
import { SummaryListRecord } from '@/store/vee/types/records/summary';
import Spinner from '@/components/customUI/Loaders/Spinner';

interface FailedValidationRule {
    data: SummaryListRecord;
}

const ButtonLogo = () => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        viewBox="0 0 24 24"
        fill={"none"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-1 cursor-pointer"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx={12} cy={12} r={3} />
    </svg>
    )
};


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
            ButtonLogo={ButtonLogo}
        >
            {isUninitialized && <h4 className='font-semibold text-lg'>Missing Check</h4>}
            {isLoading && <Spinner />}
            {isError && <p>Error loading rule details</p>}
            {data && <RuleDetails ruleDetails={data} />}
        </BaseModal>

    );
};
export default FailedValidationRule;



