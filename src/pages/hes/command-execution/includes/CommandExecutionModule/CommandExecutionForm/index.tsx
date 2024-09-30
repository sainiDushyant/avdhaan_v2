import { FC, useEffect, useState } from "react"
import { HigherOrderFilterType } from ".."
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AssetSelection from "./AssetSelection";
import { INITIAL_FILTERS } from "@/hooks/hes/useHesPrimaryFilterState";
import { HesFilterState } from "@/store/hes/types/records/device-management";

interface CommandExecutionFormProps {
  currentStep: number;
  selectedFilter: HigherOrderFilterType;
}

const CommandExecutionForm: FC<CommandExecutionFormProps> = ({
  currentStep,
  selectedFilter
}) => {

  const [primaryFilters, setPrimaryFilters] = useState<HesFilterState>(INITIAL_FILTERS);

  useEffect(() => {
    setPrimaryFilters(INITIAL_FILTERS)
  }, [selectedFilter, setPrimaryFilters])

  return (
    <form>
      <AssetSelection
        currentStep={currentStep}
        selectedFilter={selectedFilter}
        primaryFilters={primaryFilters}
        setPrimaryFilters={setPrimaryFilters}
      />
    </form>
  )
}

export default CommandExecutionForm