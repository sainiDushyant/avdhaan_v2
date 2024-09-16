import TimeRangeBlockLoad from './TimeRangeBlockLoad';
import DayRangeBlockLoad from './DayRangeBlockLoad';

const BlockLoadGraph = () => {
  return (
    <div className="flex flex-col w-full">
      <TimeRangeBlockLoad />
      <DayRangeBlockLoad />
    </div>

  );
};

export default BlockLoadGraph;
