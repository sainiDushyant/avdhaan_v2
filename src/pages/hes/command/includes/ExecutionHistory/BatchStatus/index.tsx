import { FC } from 'react';
import {
  BatchCommandHistoryRecord,
  CommandHistoryRecord
} from '@/store/hes/types/records/command-execution';
import { lightenColor } from '../../utils';

interface BatchStatusProps {
  data: CommandHistoryRecord | BatchCommandHistoryRecord;
  cb?: () => void;
}

const BatchStatus: FC<BatchStatusProps> = ({
  data: { executionStatus, colorCode }
}) => {
  return (
    <div
      style={{
        borderColor: colorCode,
        borderRadius: '30px',
        backgroundColor: lightenColor(colorCode, 0.8),
        color: colorCode
      }}
      className="min-w-[150px] flex items-center justify-center  p-3 border-2 font-semibold"
    >
      {executionStatus.replaceAll('_', ' ')}
    </div>
  );
};

export default BatchStatus;
