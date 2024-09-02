import { Link } from "react-router-dom";
import CaretRight from "@/components/svg/CaretRight";
import { cn } from "@/lib/utils";
import useGetBasePath from "@/hooks/useGetBasePath";

const VeeAddRuleSideBar = () => {

    const basePath = useGetBasePath(0);
    return (
        <div className="md:sticky top-[110px] mr-3">
            <Link
                to={`/vee/headgroups/add/`}
                className={cn(
                    "p-3 border-b-2 mb-2 flex flex-col gap-y-3 rounded-lg hover:selected-summary",
                    basePath === "headgroups" && "selected-summary"
                )}
            >
                <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
                    <h3>Add Validation Head Group</h3>
                    <CaretRight height="25px" width="25px" customFill="#0A3690" />
                </div>
            </Link>

            <Link
                to={`/vee/rulegroups/add/`}
                className={cn(
                    "p-3 border-b-2 mb-2 flex flex-col gap-y-3 rounded-lg hover:selected-summary",
                    basePath === "rulegroups" && "selected-summary"
                )}
            >
                <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
                    <h3>Add Validation Rule Group</h3>
                    <CaretRight height="25px" width="25px" customFill="#0A3690" />
                </div>
            </Link>

            <Link
                to={`/vee/rules/add/`}
                className={cn(
                    "p-3 border-b-2 mb-2 flex flex-col gap-y-3 rounded-lg hover:selected-summary",
                    basePath === "rules" && "selected-summary"
                )}
            >
                <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
                    <h3>Add Validation Rule</h3>
                    <CaretRight height="25px" width="25px" customFill="#0A3690" />
                </div>
            </Link>

            <Link
                to={`/vee/estimation-rules/add/`}
                className={cn(
                    "p-3 border-b-2 mb-2 flex flex-col gap-y-3 rounded-lg hover:selected-summary",
                    basePath === "estimation-rules" && "selected-summary"
                )}
            >
                <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
                    <h3>Add Estimation Rule</h3>
                    <CaretRight height="25px" width="25px" customFill="#0A3690" />
                </div>
            </Link>
        </div>
    );

};

export default VeeAddRuleSideBar;
