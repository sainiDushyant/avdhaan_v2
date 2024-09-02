import { FC, useState, lazy, Suspense } from "react"
import VisualizerHeader from "./VisualizerHeader"
import Graph from "./Graph"
import { SummaryGraphRecord } from "@/store/vee/types/records/summary-details";
import Spinner from "@/components/customUI/Loaders/Spinner";

const GroupTable = lazy(() => import("./GroupTable"));

interface GroupDataVisualizerProps {
    data: SummaryGraphRecord[];
    currentGroup: number;
}

export type ViewType = "graph" | "table";

const GroupDataVisualizer: FC<GroupDataVisualizerProps> = ({ data, currentGroup }) => {

    const [view, setView] = useState<ViewType>("graph");
    const group = data[currentGroup];

    return (
        <div
            className="rounded-lg p-5 flex-1 flex flex-col h-full bg-white justify-between overflow-x-scroll"
        >
            <VisualizerHeader
                groupName={group.group_name}
                setView={setView}
            />
            {view === "graph" && <Graph group={group} />}
            {view === "table" &&
                <Suspense fallback={
                    <div className='h-[50vh] flex items-center justify-center'>
                        <Spinner />
                    </div>
                }>
                    <GroupTable group={group} />
                </Suspense>
            }
        </div>
    )
}

export default GroupDataVisualizer