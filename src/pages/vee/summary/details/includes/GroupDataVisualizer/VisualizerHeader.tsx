import { FC } from "react";
import { DEFAULT_LOAD_TYPE, DEFAULT_METER_TYPE, LOAD_TYPE_REV, METER_TYPE_REV } from "@/lib/vee";
import { useSearchParams, Link } from "react-router-dom";
import Button from "@/components/ui/button";
import { ViewType } from ".";
import { Download } from "lucide-react";
import ListView from "@/components/svg/ListView";
import GraphView from "@/components/svg/GraphView";

interface VisualizerHeaderProps {
  groupName: string;
  setView: React.Dispatch<React.SetStateAction<ViewType>>
}

const VisualizerHeader: FC<VisualizerHeaderProps> = ({ groupName, setView }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();

  const load_type_param = searchParams.get("load_type") || DEFAULT_LOAD_TYPE;
  const load_type = LOAD_TYPE_REV.get(load_type_param);

  const meter_type_param = searchParams.get("meter_type") || DEFAULT_METER_TYPE;
  const meter_type = METER_TYPE_REV.get(meter_type_param)

  return (
    <div className='flex flex-wrap gap-y-4 w-full items-center justify-between px-2 py-3'>
      
      <h1 className="capitalize">
        <span className="font-semibold">{groupName.split("_").join(" ")}
        </span> - <span className="ml-2">{load_type} ({meter_type})</span>
      </h1>

      <div className='flex items-center gap-x-6'>

        <Link
          to="/"
          className="link-button tertiary-vee-btn px-2"
          target="_blank"
        >
          <Download />
        </Link>

        <div className='flex items-center gap-x-6'>

          <Button
            variant="ghost"
            className="primary-vee-btn hover:bg-[none] hover:text-[none] flex gap-x-2 items-center"
            onClick={() => setView("graph")}
          >
            <GraphView />

            <span>Graph View</span>
          </Button>

          <Button
            variant="ghost"
            className="secondary-vee-btn hover:bg-[none] hover:text-[none] flex gap-x-2 items-center"
            onClick={() => setView("table")}
          >
            <ListView />
            <span>List View</span>
          </Button>
        </div>

      </div>
    </div>
  )
}

export default VisualizerHeader