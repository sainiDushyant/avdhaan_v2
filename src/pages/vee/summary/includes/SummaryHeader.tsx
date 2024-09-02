import { FC, useCallback } from "react";
import Button from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import useGetBasePath from "@/hooks/useGetBasePath";

interface SummaryHeaderProps {
    showLogs: boolean;
    setShowLogs: React.Dispatch<React.SetStateAction<boolean>>;
}

const SummaryHeader: FC<SummaryHeaderProps> = ({ 
    showLogs, 
    // setShowLogs 
}) => {

    const basePath = useGetBasePath(1);

    const toggleShowLogs = useCallback(() => {
        // setShowLogs(prevVal => !prevVal);
    }, [
        // setShowLogs
    ])

    return (
        <div className="flex flex-wrap-reverse items-center justify-between border-b gap-x-6 mt-2">

            <div className="flex items-center gap-x-6">
                <Button
                    variant="ghost"
                    className={cn(
                        "h-full rounded-none mb-[-1px] min-w-[100px] font-normal hover:bg-[none] hover:text-[none]",
                        !showLogs && "font-medium text-[#0A3690]"
                    )}
                    onClick={toggleShowLogs}
                >
                    <span className="capitalize secondary-title lg:main-title">
                        {basePath} Summary
                    </span>
                </Button>
                {/* <Button
                    variant="ghost"
                    className={cn(
                        "h-full rounded-none mb-[-1px] min-w-[100px] font-normal hover:bg-[none]",
                        showLogs && "font-medium text-[#0A3690]"
                    )}
                    onClick={toggleShowLogs}
                >
                    <span className="secondary-title lg:main-title">
                        Logs
                    </span>
                </Button> */}
            </div>

            <div className="flex flex-1 md:flex-none justify-between  items-center h-[80px] gap-x-8">
                {/* <Link to="/config-rule/" className="link-button primary-vee-btn">
                    Configuration Rules
                </Link> */}
                <Link to="/vee/headgroups/" className="link-button secondary-vee-btn">
                    View Rules
                </Link>
                <Link to="/vee/headgroups/add/" className="link-button tertiary-vee-btn">
                    Add Rules
                </Link>
            </div>
        </div>
    )
}

export default SummaryHeader