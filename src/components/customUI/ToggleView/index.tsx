import ListViewButton from '@/components/svg/ListViewButton';
import GraphViewButton from '@/components/svg/GraphViewButton';
import React from 'react';

interface ToggleViewProps {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const ToggleView: React.FC<ToggleViewProps> = ({ view, setView }) => {
  return (
    <div className="cursor-pointer" onClick={() => setView(view === 'graph' ? 'table' : 'graph')}>
      {view === 'graph' && <ListViewButton/>}
      {view === 'table' && <GraphViewButton/>}
    </div>
  );
};

export default ToggleView;
