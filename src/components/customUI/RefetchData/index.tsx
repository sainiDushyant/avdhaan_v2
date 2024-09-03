import { FC } from "react";
import Button from "@/components/ui/button";
import Refresh from "@/components/svg/Refresh";
import { RefetchDataProps } from "@/store/vee/types/other";

const RefetchData: FC<RefetchDataProps> = ({ refetch }) => {
    return (
        <Button
            type="button"
            variant="ghost"
            className="border border-input gap-3 px-1"
            onClick={refetch}
        >
            <Refresh />
        </Button>
    )
}

export default RefetchData