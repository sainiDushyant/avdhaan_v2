import { Option } from "../other";
import { MultiValue } from "react-select";

export type LocationHierarchyRecord = {
    pss: Option[];
    feeder: Option[];
    dtr: Option[];
}

export type HesFiltersRecord = {
    pss?: Option[];
    feeder?: Option[];
    dtr?: Option[];
    device_identifier?: Option[];
};

export type HesFilterState = {
    pss: MultiValue<Option>;
    feeder: MultiValue<Option>;
    dtr: MultiValue<Option>;
    device_identifier: MultiValue<Option>;
}

export type HesFilterStateOptional = Partial<HesFilterState>;
