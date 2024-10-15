import { FC, useEffect, useState } from 'react';
import { HigherOrderFilterType } from '..';
import AssetSelection from './AssetSelection';
import { INITIAL_FILTERS } from '@/hooks/hes/useHesPrimaryFilterState';
import { HesFilterState } from '@/store/hes/types/records/device-management';
import CommandExecutionTable from '../../command-execution-table';
import ToggleStep from '../../command-execution-table/includes/ToggleStep';
import CommandForm from '../../CommandForm';

interface CommandExecutionFormProps {
  currentStep: number;
  selectedFilter: HigherOrderFilterType;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<HigherOrderFilterType>
  >;
}

const CommandExecutionForm: FC<CommandExecutionFormProps> = ({
  currentStep,
  selectedFilter,
  setCurrentStep,
  setSelectedFilter
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
          setSelectedFilter={setSelectedFilter}
        />
      </form>
      {currentStep === 1 && (
        <CommandExecutionTable
          setPrimaryFilters={setPrimaryFilters}
          setAssets={setAssetsSelected}
          assetsSelected={assetsSelected}
          currentAsset={selectedFilter}
        />
      )}
      {currentStep === 2 && (
        <CommandForm
          identifiers={assetsSelected.device_identifier.map((e) => e.value)}
        />
      )}

      <div className="flex justify-end">
        <ToggleStep
          currentStep={currentStep}
          identifiers={assetsSelected.device_identifier}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </>
  );
};

export default CommandExecutionForm;
