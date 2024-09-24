export interface ConfigureCommandRecord {
    id: number;
    name: string;
    description: string;
    commandType: string;
    retryCount: number;
    timeout: number;
    protocol: string,
<<<<<<< HEAD
    commandID: string,
=======
>>>>>>> afd724d (Adding Config Command Screen)
}
export interface UpdateCommandPayload {
    commandId: string,
    retryCount: number,
    timeout: number,
    protocol: string,
}