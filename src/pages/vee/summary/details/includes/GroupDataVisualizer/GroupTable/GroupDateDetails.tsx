import BaseModal from "@/components/customUI/Modals";
import { Input } from "@/components/ui/input";
import { SummaryListRecord } from "@/store/vee/types/records/summary";
import { FC, useState } from "react";

interface GroupDateDetailsProps {
  data: SummaryListRecord;
  cb?: () => void
}

const GroupDateDetails: FC<GroupDateDetailsProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const datesArr = data.dates;
  if (!datesArr) return null;

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      title="Dates"
      dialogTitle="Date Details"
      buttonClass="tertiary-vee-btn"
    >
      <div className='flex flex-row flex-wrap gap-6 max-h-[70vh] overflow-auto scrollable-content-all'>
        {datesArr.map((date, index) => (
          <Input
            key={`${date}_${index}`}
            type="text"
            name={`date_${index}`}
            defaultValue={date}
            disabled
            style={{ opacity: "0.8", cursor: "text" }}
            className="flex flex-wrap h-auto mx-3"
          />
        ))}
      </div>
    </BaseModal>
  )
}

export default GroupDateDetails