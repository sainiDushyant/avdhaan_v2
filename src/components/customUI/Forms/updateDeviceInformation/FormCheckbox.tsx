import Checkbox from "@/components/ui/checkbox";
import * as React from "react";

interface FormCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ label, checked, onChange, disabled = false }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
    </div>
  );
};

export default FormCheckbox;
