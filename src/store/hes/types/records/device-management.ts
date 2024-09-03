import { Option } from "../other";
import { MultiValue } from "react-select";
import { GraphData } from "../other";

export type LocationHierarchyRecord = {
    pss?: Option[];
    feeder?: Option[];
    dtr?: Option[];
    device_identifier?: Option[];
}

export type DeviceInfoRecord = {
    id: number;
    deviceIdentifier: string;
    deviceIP: string;
    deviceSerial: 99987704;
    deviceCategory: string;
    deviceSubCategory: string;
    communicationProtocol: string;
    communicationChannel: string;
    connectionInfo: {
        dcu_address: string;
        meter_address: string
    };
    make: string;
    firmwareVersion: string;
    simInformation: string | null;
    isRegistered: boolean;
}

export type DeviceMetaInfoMetricsRecord = {
    [key: string]: GraphData;
};

export type HesFilterRecord = {
    pss_id?: Option[];
    feeder_id?: Option[];
    dtr_id?: Option[];
    device_identifier?: Option[];
}

export type HesFilterState = {
    pss_id: MultiValue<Option>;
    feeder_id: MultiValue<Option>;
    dtr_id: MultiValue<Option>;
    device_identifier: MultiValue<Option>;
}

export type HesFilterStateOptional = Partial<HesFilterState>;
