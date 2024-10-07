import Button from '@/components/ui/button';
import { FC } from 'react';

type ToggleStepProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const ToggleStep: FC<ToggleStepProps> = ({ currentStep, setCurrentStep }) => {
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
        onClick={() => setCurrentStep(2)}
      >
        Next
      </Button>
    </div>
  );
};

export default ToggleStep;
