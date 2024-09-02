import ReactSvgPieChart from "react-svg-piechart"
import GraphLegend from "./GraphLegend"
import { FC } from "react";
import { GraphData } from "@/store/hes/types/other";
import { getUniqueColor } from "@/lib/utils";

interface Graph {
    graphData: GraphData;
    graphTitle: string;
}

export type GroupPieChartData = { title: string; value: number; color: string; };

const Graph: FC<Graph> = ({ graphData, graphTitle }) => {

    const groupPieChartData: GroupPieChartData[] = graphData.map(item => ({ 
        title: `${item.name}: ${item.count}`, 
        value: item.percentage, 
        color: item.color || getUniqueColor() 
    }))

    groupPieChartData.push({
        title: "Test",
        value: 12,
        color: getUniqueColor()
    })

    return (
        <div
            className="rounded-md shadow-md bg-white border border-[#56CCF2]"
        >
                <div className="border-b border-input p-3">
                    <h3 className="text-[#0A3690] font-semibold text-lg">{graphTitle}</h3>
                </div>

                <div className="max-w-[32vw] p-3 special-div">
                    <ReactSvgPieChart
                        data={groupPieChartData}
                        expandOnHover
                        angleMargin={0.2}

                    />
                </div>
            <div className="flex flex-col items-end mt-6 p-3">
                <GraphLegend 
                    groupPieChartData={groupPieChartData} 
                />
            </div>
        </div>
    )
            
}

            export default Graph