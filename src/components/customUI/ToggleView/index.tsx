import ListView from '@/components/svg/ListView';
import GraphView from '@/components/svg/GraphView';
import React from 'react';
import Button from '@/components/ui/button';

interface ToggleViewProps {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const ToggleView: React.FC<ToggleViewProps> = ({ view, setView }) => {
  return (
    <div className="cursor-pointer" >
       <Button variant='ghost' onClick={() => setView(view === 'graph' ? 'table' : 'graph')} className='p-0 m-0 toggle-view-btn'>
       <div className='flex justify-center items-center gap-5 p-5 text-white '>{view === 'graph' ?  <ListView/>:
       <GraphView/>}<span>{view === 'graph'?'List View':'Graph View'}</span></div>
       </Button>
    </div>
  );
};

export default ToggleView;
