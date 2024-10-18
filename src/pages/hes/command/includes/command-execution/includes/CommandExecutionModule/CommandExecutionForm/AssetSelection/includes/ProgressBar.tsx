import { Progress } from '@/components/ui/progress';
import { FC } from 'react';

type ProgressBarProps = {
  progress: number;
};

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Progress value={progress} className="w-[100%] h-[12px]" />
        <span className="text-[#708CC7]">{progress}%</span>
      </div>
    </>
  );
};

export default ProgressBar;
