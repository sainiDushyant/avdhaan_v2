import { FC, useEffect, useState } from 'react';
import { HigherOrderFilterType } from '..';
import AssetSelection from './AssetSelection';
import { INITIAL_FILTERS } from '@/hooks/hes/useHesPrimaryFilterState';
import { HesFilterState } from '@/store/hes/types/records/device-management';
import CommandExecutionTable from '../../command-execution-table';
import ToggleStep from '../../command-execution-table/includes/ToggleStep';

interface CommandExecutionFormProps {
  currentStep: number;
  selectedFilter: HigherOrderFilterType;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const CommandExecutionForm: FC<CommandExecutionFormProps> = ({
  currentStep,
  selectedFilter,
  setCurrentStep
}) => {
  const [primaryFilters, setPrimaryFilters] =
    useState<HesFilterState>(INITIAL_FILTERS);

  const [assetsSelected, setAssetsSelected] = useState<HesFilterState>({
    pss_id: [],
    feeder_id: [],
    device_identifier: [],
    dtr_id: []
  });

  useEffect(() => {
    setPrimaryFilters(INITIAL_FILTERS);
  }, [selectedFilter, setPrimaryFilters]);

  useEffect(() => {
    setAssetsSelected({
      pss_id: [],
      feeder_id: [],
      device_identifier: [],
      dtr_id: []
    });
  }, [selectedFilter]);

  return (
    <>
      <form>
        <AssetSelection
          setAssetsSelected={setAssetsSelected}
          assetsSelected={assetsSelected}
          currentStep={currentStep}
          selectedFilter={selectedFilter}
          primaryFilters={primaryFilters}
          setPrimaryFilters={setPrimaryFilters}
        />
      </form>
      <CommandExecutionTable
        setPrimaryFilters={setPrimaryFilters}
        setAssets={setAssetsSelected}
        assetsSelected={assetsSelected}
        currentAsset={selectedFilter}
      />
      <div className="flex justify-end">
        <ToggleStep currentStep={1} setCurrentStep={setCurrentStep} />
      </div>
    </>
  );
};

export default CommandExecutionForm;
