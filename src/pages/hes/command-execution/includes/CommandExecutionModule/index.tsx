import { useState } from 'react'
import FilterSelector from './FilterSelector';
import CommandExecutionForm from './CommandExecutionForm';

export type HigherOrderFilterType = "pss" | "feeder" | "dtr" | null;

const CommandExecutionModule = () => {

    const [step, setStep] = useState(1);
    const [higherOrderFilter, setHigherOrderFilter] = useState<HigherOrderFilterType>("pss")

    return (
        <div>

            <FilterSelector 
                selected={higherOrderFilter}
                setSelected={setHigherOrderFilter}
            />

            <CommandExecutionForm 
                currentStep={step}
                selectedFilter={higherOrderFilter} 
            />

        </div>
    )
}

export default CommandExecutionModule