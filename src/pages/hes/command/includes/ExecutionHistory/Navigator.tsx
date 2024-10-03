import Eye from '@/components/svg/Eye';
import EyeClose from '@/components/svg/EyeClose';
import { BatchCommandHistoryRecord } from '@/store/hes/types/records/command-execution';
import { Link } from 'react-router-dom';

interface NavigatorProps {
  data: BatchCommandHistoryRecord;
}
const Navigator = ({ data }: NavigatorProps) => {
  return (
    <>
      {data.batchId && (
        <Link
          to={'/hes/command/batch-command-execution-details'}
          state={data.batchId}
        >
          <Eye />
        </Link>
      )}
      {!data.batchId && <EyeClose />}
    </>
  );
};

export default Navigator;
