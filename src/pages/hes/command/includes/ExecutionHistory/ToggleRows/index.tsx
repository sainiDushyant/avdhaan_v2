import { useState, Dispatch, SetStateAction } from 'react';
import SingleOptionSelect from '@/components/customUI/Select/SingleOptionSelect';

type Option = {
  label: string;
  value: string;
};

type ToggleRowsProps = {
  limit: string;
  setLimit: Dispatch<SetStateAction<string>>;
  title?: string;
};

const ToggleRows = ({ limit, setLimit, title }: ToggleRowsProps) => {
  const [currentValue, setCurrentValue] = useState<Option>({
    label: limit,
    value: limit
  });

  const handleChange = (value: Option | null): void => {
    if (value) {
      setCurrentValue(value);
      setLimit(value.value);
    } else {
      setCurrentValue({ label: '10', value: '10' });
      setLimit('10');
    }
  };

  const data = [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '30', value: '30' },
    { label: '40', value: '40' }
  ];

  return (
    <div className="mt-3 items-center text-[#384C77] flex gap-2">
      {title && title}
      <SingleOptionSelect
        data={data}
        value={currentValue}
        customCss="min-w-[4px]"
        loading={false}
        placeholder="Select rows"
        handleChange={handleChange} // Now accepts Option | null
      />
    </div>
  );
};

export default ToggleRows;
