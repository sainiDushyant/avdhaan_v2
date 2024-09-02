import { Option } from "../other";
import { MultiValue } from "react-select";

export type HesFiltersRecord = {
    site?: Option[];
    pss?: Option[];
    feeder?: Option[];
    dtr?: Option[];
    pole?: Option[];
};

export type HesFilterState = {
    site: MultiValue<Option>;
    pss: MultiValue<Option>;
    feeder: MultiValue<Option>;
    dtr: MultiValue<Option>;
    pole: MultiValue<Option>;
}

export type HesFilterStateOptional = Partial<HesFilterState>;
