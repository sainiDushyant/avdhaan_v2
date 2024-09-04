import { FC } from 'react'
import DateItem from '../Date/DateItem'
import MonthYearPicker from '../Date/MonthYear'

interface VeeDateFilterProps {
    loadTypeVal?: string;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const VeeDateFilter: FC<VeeDateFilterProps> = ({
    loadTypeVal, startDate, setStartDate, endDate, setEndDate
}) => {
    return (
        <>
            {loadTypeVal !== "ML" ?
                <>
                    <DateItem
                        placeholder="Enter Start Date"
                        customState={{
                            val: startDate,
                            setter: setStartDate
                        }}
                    />
                    <DateItem
                        placeholder="Enter End Date"
                        customState={{
                            val: endDate,
                            setter: setEndDate
                        }}
                        min={startDate}
                    />
                </>
                :
                <>
                    <MonthYearPicker
                        placeholder="Enter Start Month"
                        customState={{
                            val: startDate,
                            setter: setStartDate
                        }}
                    />

                    <MonthYearPicker
                        placeholder="Enter End Month"
                        customState={{
                            val: endDate,
                            setter: setEndDate
                        }}
                        min={startDate}
                    />
                </>
            }
        </>
    )
}

export default VeeDateFilter