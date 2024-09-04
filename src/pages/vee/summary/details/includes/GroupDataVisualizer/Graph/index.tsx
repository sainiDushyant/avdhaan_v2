import { FC } from "react";
import { SummaryGraphRecord } from "@/store/vee/types/records/summary-details";
import { cn } from "@/lib/utils";
import PieChart from "@/components/customUI/vee/PieChart";

interface GroupProps {
    group: SummaryGraphRecord;
}

const Graph: FC<GroupProps> = ({ group }) => {
    return (
        <div
            className={cn(
                `flex flex-1 gap-12 pt-10 flex-wrap`,
                group.graph.length > 1 ? "justify-between" : "justify-center"
            )}
        >
            {group.graph.map((graph, index) => (
                <PieChart graph={graph} key={`graph_${index}`} />
            ))}
        </div>
    )
}

export default Graph