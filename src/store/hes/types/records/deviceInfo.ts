export interface DeviceSimInfo {
    tspName: string;
    simNo: string;
    imsiNumber: string;
    iccid: string;
    ipv6Address: string;
    port: number;
}

export type UpdateDevicePayload = {
    simDetails: {
        primarySimInfo?: DeviceSimInfo | null;
        secondarySimInfo?: DeviceSimInfo | null;
    };
    communicationProtocol?: string; // Should be "TAP" or "DLMS"
    deviceIdentifier: string;
};
