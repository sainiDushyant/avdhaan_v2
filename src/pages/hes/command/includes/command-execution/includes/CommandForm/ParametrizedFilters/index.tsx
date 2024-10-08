import { FC } from "react"
import { CommandInfoArgsType, CommandInfoParams } from "@/store/hes/types/records/command-execution";
import { getParametrizedComponent } from "./ParametrizedComponent";

interface ParametrizedFiltersProps {
  params: CommandInfoParams;
  argsType: CommandInfoArgsType;
}

const ParametrizedFilters: FC<ParametrizedFiltersProps> = ({ argsType, params }) => {
  const Component = getParametrizedComponent({argsType, params});
  return Component
}

export default ParametrizedFilters