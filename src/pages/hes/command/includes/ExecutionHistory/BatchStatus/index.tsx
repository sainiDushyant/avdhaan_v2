import { FC } from "react";
import { CommandHistoryRecord } from "@/store/hes/types/records/command-execution";

interface BatchStatusProps {
    data: CommandHistoryRecord;
    cb?: () => void;
}

const BatchStatus: FC<BatchStatusProps> = ({ data: { executionStatus, colorCode } }) => {
  return (
    <div style={{ borderColor: colorCode }} className="min-w-[180px] flex items-center justify-center table-header p-3 rounded-md border-2 font-semibold">
        {executionStatus}
    </div>
  )
}

export default BatchStatus