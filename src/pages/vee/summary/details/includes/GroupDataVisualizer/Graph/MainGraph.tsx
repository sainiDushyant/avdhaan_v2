import { getGraphData } from "@/lib/vee"
import ReactSvgPieChart from "react-svg-piechart"
import GraphLegend from "./GraphLegend"
import { GraphData } from "@/store/vee/types/records/summary-details";
import { FC } from "react";

interface MainGraphProps {
    graph: GraphData;
}

const MainGraph: FC<MainGraphProps> = ({ graph }) => {

    const graphKeys = Object.keys(graph);
    const countKeys = graphKeys.filter(name => name.includes("_count")).sort();
    const rateKeys = graphKeys.filter(name => name.includes("_rate")).sort();
    const colorKeys =  graphKeys.filter(name => name.includes("_color")).sort();

    return (
        <div className="flex gap-x-6">
            
            <div className="w-[40vw] lg:w-[20vw] flex h-full special-div">
                <ReactSvgPieChart
                    data={getGraphData(graph, countKeys, rateKeys, colorKeys)}
                    expandOnHover
                    angleMargin={0.2}

                />
            </div>

            <div className="flex justify-center flex-col gap-y-4">
                {
                    rateKeys.map((graphVal, index) => (
                        <GraphLegend 
                            key={`graph_legend_-${graph[graphVal]}_${index}`}
                            value={graph[graphVal] as number} 
                            name={graphVal.split("_").join(" ")} 
                            color={graph[colorKeys[index]] as string} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default MainGraph