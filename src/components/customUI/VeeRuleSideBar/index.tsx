import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CaretRight from "@/components/svg/CaretRight";
import { cn } from "@/lib/utils";
import useGetBasePath from "@/hooks/useGetBasePath";

const VeeRuleSideBar = () => {

    const { search } = useLocation();
    const basePath = useGetBasePath();

    return (
        <div className="md:sticky top-[110px] mr-3">
            <Link
                to={`/headgroups${search}`}
                className={cn(
                    "p-3 border-b-2 mb-2 flex flex-col gap-y-3 rounded-lg hover:selected-summary",
                    basePath === "headgroups" && "selected-summary"
                )}
            >
                <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
                    <h3>Show Validation Head Groups</h3>
                    <CaretRight height="25px" width="25px" customFill="#0A3690" />
                </div>
            </Link>

            <Link
                to={`/rulegroups${search}`}
                className={cn(
                    "p-3 border-b-2 mb-2 flex flex-col gap-y-3 rounded-lg hover:selected-summary",
                    basePath === "rulegroups" && "selected-summary"
                )}
            >
                <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
                    <h3>Show Validation Rule Groups</h3>
                    <CaretRight height="25px" width="25px" customFill="#0A3690" />
                </div>
            </Link>

            <Link
                to={`/rules${search}`}
                className={cn(
                    "p-3 border-b-2 mb-2 flex flex-col gap-y-3 rounded-lg hover:selected-summary",
                    basePath === "rules" && "selected-summary"
                )}
            >
                <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
                    <h3>Show Validation Rules</h3>
                    <CaretRight height="25px" width="25px" customFill="#0A3690" />
                </div>
            </Link>

            <Link
                to={`/estimation-rules${search}`}
                className={cn(
                    "p-3 border-b-2 mb-2 flex flex-col gap-y-3 rounded-lg hover:selected-summary",
                    basePath === "estimation-rules" && "selected-summary"
                )}
            >
                <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
                    <h3>Show Estimation Rules</h3>
                    <CaretRight height="25px" width="25px" customFill="#0A3690" />
                </div>
            </Link>
        </div>
    );

};

export default VeeRuleSideBar;
