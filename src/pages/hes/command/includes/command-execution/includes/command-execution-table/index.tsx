import { FC } from 'react';
import { HesFilterState } from '@/store/hes/types/records/device-management';
import Button from '@/components/ui/button';

type CommandExecutionProps = {
  assetsSelected: HesFilterState;
  setAssets: React.Dispatch<React.SetStateAction<HesFilterState>>;
  setPrimaryFilters: React.Dispatch<React.SetStateAction<HesFilterState>>;
};

const CommandExecutionTable: FC<CommandExecutionProps> = ({
  assetsSelected,
  setAssets,
  setPrimaryFilters
}) => {
  return (
    <div className="table-container mb-5">
      <div className="flex justify-between">
        <span className="text-[#0A3690] text-lg">Meters</span>
        <div className="space-x-2">
          <span className="text-[#0A3690] text-lg">
            Total meters: {assetsSelected.device_identifier.length}
          </span>
          <Button
            className="bg-[#0A3690]"
            type="button"
            disabled={assetsSelected.device_identifier.length === 0}
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
      {assetsSelected.device_identifier.length > 0 ? (
        <table className="table-auto border-collapse w-full mt-4">
          <thead>
            <tr className="table-header">
              <th className="border px-4 py-2 text-[#0A3690] text-left">
                Device Identifier
              </th>
            </tr>
          </thead>
        </table>
      ) : (
        <div className="w-100 text-center mt-2 graph-border">
          <span className="text-sm"> No device identifiers selected... </span>
        </div>
      )}

      <div className="overflow-y-auto max-h-64">
        <table className="table-auto border-collapse w-full">
          <tbody>
            {assetsSelected.device_identifier.map((device, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-[#F3F9F9]' : 'bg-white'}
              >
                <td className="border px-4 py-2">{device.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommandExecutionTable;
