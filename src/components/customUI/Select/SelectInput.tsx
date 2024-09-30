import { InputProps, GroupBase, components } from "react-select";
import { Option } from '@/store/vee/types/other';

const SelectInput = (props: InputProps<Option, true, GroupBase<Option>>) => {
    return (
      <components.Input {...props} maxLength={40}>
        {props.children}
      </components.Input>
    );
}

export default SelectInput