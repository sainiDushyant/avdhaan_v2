import Button from '@/components/ui/button';
import { useAppDispatch } from '@/store';
import { setDeviceIdentifiers } from '@/store/hes';
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
  const dispatch = useAppDispatch();
  const handleBack = () => {
    setCurrentStep(1);
    dispatch(setDeviceIdentifiers([]));
  };
  return (
    <div className="flex gap-2">
      <Button
        className="date-filter-color"
        disabled={currentStep === 1}
        onClick={handleBack}
        type="button"
      >
        Back
      </Button>
      {currentStep === 1 && (
        <Button
          className="bg-[#0A3690]"
          type="button"
          disabled={identifiers.length === 0}
          onClick={() => setCurrentStep(2)}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default ToggleStep;
