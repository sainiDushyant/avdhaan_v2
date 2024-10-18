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
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '75', value: '75' },
    { label: '100', value: '100' }
  ];

  return (
    <div className="mt-3 items-center text-[#384C77] flex gap-2">
      {title && title}
      <SingleOptionSelect
        data={data}
        isSearchable={false}
        value={currentValue}
        customCss="min-w-[4px]"
        loading={false}
        placeholder="Select rows"
        handleChange={handleChange}
      />
    </div>
  );
};

export default ToggleRows;
