import Button from '@/components/ui/button';
import { Option } from '@/store/hes/types/other';
import { FC } from 'react';
import { MultiValue } from 'react-select';

type ToggleStepProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  identifiers: MultiValue<Option>;
};

const ToggleStep: FC<ToggleStepProps> = ({
  currentStep,
  setCurrentStep,
  identifiers
}) => {
  return (
    <div className="flex gap-2">
      <Button
        className="date-filter-color"
        disabled={currentStep === 1}
        onClick={() => setCurrentStep(1)}
        type="button"
      >
        Back
      </Button>
      <Button
        className="bg-[#0A3690]"
        type="button"
        disabled={identifiers.length === 0}
        onClick={() => setCurrentStep(2)}
      >
        Next
      </Button>
    </div>
  );
};

export default ToggleStep;
