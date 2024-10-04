import { FC, useEffect, useState } from 'react';
import { HigherOrderFilterType } from '..';
import AssetSelection from './AssetSelection';
import { INITIAL_FILTERS } from '@/hooks/hes/useHesPrimaryFilterState';
import { HesFilterState } from '@/store/hes/types/records/device-management';
import { CommandExecutionTableProps } from '../../command-execution-table/types';
import CommandExecutionTable from '../../command-execution-table';

interface CommandExecutionFormProps {
  currentStep: number;
  selectedFilter: HigherOrderFilterType;
}

const CommandExecutionForm: FC<CommandExecutionFormProps> = ({
  currentStep,
  selectedFilter
}) => {
  const [primaryFilters, setPrimaryFilters] =
    useState<HesFilterState>(INITIAL_FILTERS);

  const [tableData, setTableData] = useState<CommandExecutionTableProps | {}>(
    {}
  );

  useEffect(() => {
    setPrimaryFilters(INITIAL_FILTERS);
  }, [selectedFilter, setPrimaryFilters]);

  return (
    <>
      <form>
        <AssetSelection
          setData={setTableData}
          currentStep={currentStep}
          selectedFilter={selectedFilter}
          primaryFilters={primaryFilters}
          setPrimaryFilters={setPrimaryFilters}
        />
      </form>
      <CommandExecutionTable data={tableData} />
    </>
  );
};

export default CommandExecutionForm;
