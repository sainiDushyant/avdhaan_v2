export interface DeviceSimInfo {
    tspName?: string;
    simNo: string;
    imsiNumber?: string;
    iccid?: string;
    ipv6Address: string;
    port: number;
  }
  
  export type DeviceDetailRecord = {
    id: number;
    deviceIdentifier: string;
    deviceIP: string;
    deviceSerial: string;
    deviceCategory: string;
    deviceSubCategory: string;
    communicationProtocol: string;
    communicationChannel: string;
    connectionInfo: {
      dcu_address: string;
      meter_address: string;
      port?:number;
    };
    make: string;
    firmwareVersion: string;
    simInformation: DeviceSimInfo[] | null;
    isRegistered: boolean;
  };
  
   export type UpdateDevicePayload = {
    simDetails: {
      primarySimInfo?: DeviceSimInfo | null;
      secondarySimInfo?: DeviceSimInfo | null;
    };
    communicationProtocol?: string; 
    deviceIdentifier: string;
  };
  