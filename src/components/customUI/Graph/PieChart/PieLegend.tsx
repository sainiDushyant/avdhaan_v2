import { FC } from "react";
import { GroupPieChartData } from ".";

interface PieLegendProps {
    groupPieChartData: GroupPieChartData[]
}

const PieLegend: FC<PieLegendProps> = ({ groupPieChartData }) => {
    return (
        <div className="flex flex-col items-start self-end gap-y-2">
            {
                    groupPieChartData.map((graphData, index) => (
                        <div 
                            className="flex items-center gap-x-6" 
                            key={`graph_label_${graphData.title}_${index}`}
                        >
                            <div className={"w-[10px] h-[10px] rounded-full"} style={{ backgroundColor: graphData.color }} />
                            <span className="capitalize text-sm font-light">
                                {graphData.title.split(":")[0]}: 
                                <span className="font-medium ml-1">
                                    {graphData.value.toFixed(1)}%
                                </span>
                            </span>
                        </div>
                    ))
            }
        </div>
    )
}

export default PieLegend