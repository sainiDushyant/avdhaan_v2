import { FC, useEffect } from 'react'
import DateRange from '@/components/customUI/Date/DateRange';
import { useSearchParams } from 'react-router-dom';
import { isValidDate } from '@/lib/utils';
import MonthYearRange from '@/components/customUI/Date/MonthYearRange';

interface VeeDateFilterProps {
    loadTypeVal?: string;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const VeeDateFilter: FC<VeeDateFilterProps> = ({
    loadTypeVal, startDate, endDate,
    setStartDate, setEndDate
}) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, _] = useSearchParams();

    const today = new Date().toISOString().slice(0, 10);

    useEffect(() => {

        const selectedStartDate = searchParams.get("start_date");
        const today = new Date().toISOString().split('T')[0];

        let defaultStartDate = !selectedStartDate || !isValidDate(selectedStartDate) ? today : selectedStartDate;

        const selectedEndDate = searchParams.get("end_date");
        const defaultEndDate = !selectedEndDate || !isValidDate(selectedEndDate) ? today : selectedEndDate;

        if (defaultStartDate && defaultEndDate && new Date(defaultStartDate) > new Date(defaultEndDate)) {
            defaultStartDate = defaultEndDate;
        }

        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
    }, [])

    return (
        <>
            {loadTypeVal !== "ML" ?
                <DateRange 
                    start={{
                        customState: {
                            val: startDate,
                            setter: setStartDate
                        } 
                    }} 
                    end={{
                        max: today,
                        customState: {
                            val: endDate,
                            setter: setEndDate
                        } 
                    }} 
                />
                :
                <MonthYearRange 
                    start={{
                        customState: {
                            val: startDate,
                            setter: setStartDate
                        } 
                    }} 
                    end={{
                        max: today,
                        customState: {
                            val: endDate,
                            setter: setEndDate
                        } 
                    }} 
                />
            }
        </>
    )
}

export default VeeDateFilter