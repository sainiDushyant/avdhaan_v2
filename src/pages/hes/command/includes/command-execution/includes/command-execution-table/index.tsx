import { FC } from 'react';
import { HesFilterState } from '@/store/hes/types/records/device-management';
import { HigherOrderFilterType } from '../CommandExecutionModule';
import Button from '@/components/ui/button';

type CommandExecutionProps = {
  assetsSelected: HesFilterState;
  currentAsset: HigherOrderFilterType | null;
  setAssets: React.Dispatch<React.SetStateAction<HesFilterState>>;
  setPrimaryFilters: React.Dispatch<React.SetStateAction<HesFilterState>>;
};

const CommandExecutionTable: FC<CommandExecutionProps> = ({
  assetsSelected,
  currentAsset,
  setAssets,
  setPrimaryFilters
}) => {
  // Define the asset keys and labels in a structured way
  const toggleAssets: {
    [key: string]: { key: keyof HesFilterState; label: string };
  } = {
    pss: { key: 'pss_id', label: 'PSS' },
    feeder: { key: 'feeder_id', label: 'Feeder' },
    dtr: { key: 'dtr_id', label: 'DTR' }
  };

  // Check if currentAsset is valid
  if (!currentAsset || !toggleAssets[currentAsset]) {
    return (
      <div>
        <p>No valid asset selected.</p>
      </div>
    );
  }

  const currentStepKey = toggleAssets[currentAsset].key;
  const currentStepLabel = toggleAssets[currentAsset].label;

  // Check if the currentStep toggle has corresponding data
  const currentStepAssets = assetsSelected[currentStepKey] || [];

  return (
    <div className="table-container mb-5">
      <div className="flex justify-between">
        <span className="text-[#0A3690] text-lg">{`${currentStepLabel} and Meter`}</span>
        <div className="space-x-2">
          <span className="text-[#0A3690] text-lg">
            Total meters: {assetsSelected.device_identifier.length}
          </span>
          <Button
            className="bg-[#0A3690]"
            type="button"
            onClick={() => {
              setAssets({
                pss_id: [],
                feeder_id: [],
                device_identifier: [],
                dtr_id: []
              });
              setPrimaryFilters({
                pss_id: [],
                feeder_id: [],
                device_identifier: [],
                dtr_id: []
              });
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <table className="table-auto border-collapse w-full mt-4">
        <thead>
          <tr className="bg-blue-200">
            <th className="border px-4 py-2 text-[#0A3690] text-left">
              Device Identifier
            </th>
            <th className="border px-4 py-2 text-[#0A3690] text-left">
              {currentStepLabel}
            </th>
          </tr>
        </thead>
      </table>
      {/* Scrollable body */}
      <div className="overflow-y-auto max-h-64">
        <table className="table-auto border-collapse w-full">
          <tbody>
            {assetsSelected.device_identifier.map((device, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
              >
                <td className="border px-4 py-2">{device.value}</td>
                <td className="border px-4 py-2">
                  {currentStepAssets[index]?.label || '--'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommandExecutionTable;
