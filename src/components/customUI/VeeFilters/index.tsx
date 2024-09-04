import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import SubmitButton from "@/components/customUI/Button/SubmitButton";
import { Option } from "@/store/vee/types/other";
import { useSearchParams } from "react-router-dom";
import { cn, isValidDate } from "@/lib/utils";
import { FilterPayload } from "@/store/vee/types/other";
import useGetAcquiredDate from "@/hooks/vee/useGetAcquiredDate";
import VeeDateFilter from "./VeeDateFilter";
import { 
    METER_TYPE, LOAD_TYPE, DEFAULT_LOAD_TYPE, DEFAULT_LOAD_TYPE_LABEL, 
    DEFAULT_METER_TYPE_LABEL, DEFAULT_METER_TYPE,
    LoadTypeOption, MeterTypeOption
} from "@/lib/vee";
import MTLTForm from "@/components/customUI/vee/Forms/MTLTForm";

interface VeeFilterProps {
    hideAcquiredDate?: boolean;
    containerCss?: string;
    hideDate?: boolean;
    setLtMtDefault?: boolean;
    children?: ReactNode;
}

const VeeFilters: FC<VeeFilterProps> = ({
    hideAcquiredDate, containerCss,
    hideDate, setLtMtDefault, children
}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [meterType, setMeterType] = useState<Option | null>(
        setLtMtDefault ? {
        label: DEFAULT_METER_TYPE_LABEL,
        value: DEFAULT_METER_TYPE 
    }: null);
    const [loadType, setLoadType] = useState<Option | null>(setLtMtDefault ? { 
        label: DEFAULT_LOAD_TYPE_LABEL, 
        value: DEFAULT_LOAD_TYPE 
    }: null);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const acquiredDate = useGetAcquiredDate(startDate, endDate);

    const handleChangeMeterType = useCallback((selected: Option | null) => {
        setMeterType(selected);
    }, []);

    const handleChangeLoadType = useCallback((selected: Option | null) => {
        setLoadType(selected);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newParams: FilterPayload = {};
        if (!hideDate && startDate) newParams['start_date'] = startDate;
        if (!hideDate && endDate) newParams['end_date'] = endDate;
        if (meterType) newParams['meter_type'] = meterType.value;
        if (loadType) newParams['load_type'] = loadType.value;
        setSearchParams(newParams);
    }, [meterType, loadType, startDate, endDate, hideDate, setSearchParams]);

    useEffect(() => {
        const selectedMeterType = searchParams.get("meter_type");
        const defaultMeter = METER_TYPE.filter(item => item.value === selectedMeterType);

        const selectedLoadType = searchParams.get("load_type");
        const defaultLoad = LOAD_TYPE.filter(item => item.value === selectedLoadType);

        const today = new Date().toISOString().split('T')[0];
        const selectedStartDate = searchParams.get("start_date");
        let defaultStartDate = !selectedStartDate || !isValidDate(selectedStartDate) ? today : selectedStartDate;

        const selectedEndDate = searchParams.get("end_date");
        const defaultEndDate = !selectedEndDate || !isValidDate(selectedEndDate) ? today : selectedEndDate;

        if (defaultStartDate && defaultEndDate && new Date(defaultStartDate) > new Date(defaultEndDate)) {
            defaultStartDate = defaultEndDate;
        }

        setMeterType(defaultMeter.length > 0 ? defaultMeter[0] : setLtMtDefault ? {
            label: DEFAULT_METER_TYPE_LABEL,
            value: DEFAULT_METER_TYPE 
        }: null);
        setLoadType(defaultLoad.length > 0 ? defaultLoad[0] : setLtMtDefault ? { 
            label: DEFAULT_LOAD_TYPE_LABEL, 
            value: DEFAULT_LOAD_TYPE 
        }: null)
        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);

    }, [searchParams, setLtMtDefault])

    return (

        <form
            className={cn(
                "p-5 rounded-lg bg-white my-3 flex-1 flex flex-wrap gap-x-5 gap-y-5",
                containerCss)
            }
            onSubmit={handleSubmit}
        >
            {!hideAcquiredDate &&

                <div className="flex-1 flex items-center min-h-[38px] text-nowrap gap-x-4">
                    <p className="text-xs font-medium text-[#A3B2CF]">Acquired Date</p>
                    <span className="font-semibold tertiary-title">
                        {acquiredDate}
                    </span>
                </div>}

            <MTLTForm 
                meterType={meterType as MeterTypeOption} 
                loadType={loadType as LoadTypeOption} 
                hideLabels={true}
                meterTypeReq={false}
                profileReq={false}
                customCss="min-w-[220px] flex-auto"
                handleChangeMeterType={handleChangeMeterType} 
                handleChangeLoadType={handleChangeLoadType} 
            />


            {!hideDate && (
                <VeeDateFilter 
                    loadTypeVal={loadType?.value}
                    startDate={startDate} 
                    setStartDate={setStartDate} 
                    endDate={endDate} setEndDate={setEndDate} 
                />
            )}

            <SubmitButton title="Search" />

            {children && children}
        </form>
    );
};

export default VeeFilters;
