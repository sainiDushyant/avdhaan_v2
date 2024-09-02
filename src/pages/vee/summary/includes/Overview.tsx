import { FC } from "react";
import { OverviewSummary } from "@/store/vee/types/records/summary";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CaretRight from "@/components/svg/CaretRight";
import { cn } from "@/lib/utils";
import useGetBasePath from "@/hooks/useGetBasePath";

interface OverviewProps {
  data: OverviewSummary;
}

const Overview: FC<OverviewProps> = ({ data }) => {

  const { search } = useLocation();
  const basePath = useGetBasePath();

  return (
    <div className="md:sticky top-[110px] mr-3">
      <Link
        to={`/vee/validation/${search}`}
        className={cn(
          "pb-12 border-b-2 mb-2 flex flex-col gap-y-3 p-3 rounded-lg hover:selected-summary",
          basePath === "validation" && "selected-summary"
        )}
      >
        <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
          <h3>Validation Summary</h3>
          <CaretRight height="25px" width="25px" customFill="#0A3690" />
        </div>
        <p className="text-xs font-normal tertiary-title flex justify-between w-full text-[#9DA0A8]">
          Validation Meters:
          <span className="">{data.validation_summary.validated_meters}</span>
        </p>
        <p className="text-xs font-normal tertiary-title flex justify-between w-full text-[#9DA0A8]">
          Failed Meters:
          <span className="">{data.validation_summary.failed_meters}</span>
        </p>
      </Link>

      <Link
        to={`/vee/estimation/${search}`}
        className={cn(
          "pb-12 border-b-2 mb-2 flex flex-col gap-y-3 p-3 rounded-lg hover:selected-summary",
          basePath === "estimation" && "selected-summary"
        )}
      >
        <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
          <h3>Estimation Summary</h3>
          <CaretRight height="25px" width="25px" customFill="#0A3690" />
        </div>
        <p className="text-xs font-normal tertiary-title flex justify-between w-full text-[#9DA0A8]">
          Estimation Meters:
          <span className="">{data.estimation_summary.estimated_meters}</span>
        </p>
      </Link>

      {/* 

      <Link
        to={`/editing/${search}`}
        className={cn(
          "pb-12 border-b-2 mb-2 flex flex-col gap-y-3 p-3 rounded-lg hover:selected-summary",
          basePath === "editing" && "selected-summary"
        )}
      >
        <div className="text-base font-medium secondary-title text-[#0A3690] flex justify-between">
          <h3>Editing Summary</h3>
          <CaretRight height="25px" width="25px" customFill="#0A3690" />
        </div>
        <p className="text-xs font-normal tertiary-title flex justify-between w-full text-[#9DA0A8]">
          Edited Meters:
          <span className="">{data.editing_summary.edited_meters}</span>
        </p>
      </Link> */}
    </div>
  );

};

export default Overview;
