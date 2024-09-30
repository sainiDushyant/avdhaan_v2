export interface ConfigureCommandRecord {
    id: number;
    name: string;
    description: string;
    commandType: string;
    retryCount: number;
    timeout: number;
    protocol: string,
    commandID: string,
}
export interface UpdateCommandPayload {
    commandId: string,
    retryCount: number,
    timeout: number,
    protocol: string,
}