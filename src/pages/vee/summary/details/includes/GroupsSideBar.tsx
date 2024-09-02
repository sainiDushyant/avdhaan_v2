import { FC } from 'react'
import { SummaryGraphRecord } from '@/store/vee/types/records/summary-details'
import Button from '@/components/ui/button';
import CaretRight from '@/components/svg/CaretRight';
import { cn } from '@/lib/utils';

interface GroupsSideBarProps {
  data: SummaryGraphRecord[];
  currentGroup: number;
  setCurrentGroup: React.Dispatch<React.SetStateAction<number>>;
}

const GroupsSideBar: FC<GroupsSideBarProps> = ({ data, currentGroup, setCurrentGroup }) => {

  return (
    <div className="flex-none md:max-w-[25vw] lg:max-w-[18vw] h-fit w-auto md:sticky top-[110px]">

        {data.map((group, index) => (
          <div
            className={cn(
              'min-h-[60px] h-auto mb-2 flex items-center hover:bg-white mr-2 rounded-lg', 
              currentGroup === index && "selected-summary"
            )}
            key={group.group_name}
          >
            <Button
              variant="ghost"
              className='hover:bg-[none] flex gap-x-2 justify-between w-full h-auto group'
              onClick={() => setCurrentGroup(index)}
            >
              <div 
                className={cn(
                  'text-wrap text-start tertiary-title text-[#7C818C] font-normal group-hover:font-bold group-hover:text-[#0A3690]',
                  currentGroup === index && "font-bold text-[#0A3690]"
                )}
              >
                <p className='lg:secondary-title'>
                  {group.group_name.split("_").join(" ")}
                </p>
                {group.start_date && group.end_date &&
                  <span className='text-xs'>
                    {group.start_date} to {group.end_date}
                  </span>
                }
              </div>
              <CaretRight 
                height="25px" 
                width="25px" 
                customFill={currentGroup === index ? "#0A3690" :"#7C818C"}
                customCss='svg-button min-w-[25px]'
              />
            </Button>
          </div>
        ))}

    </div>
  )
}

export default GroupsSideBar