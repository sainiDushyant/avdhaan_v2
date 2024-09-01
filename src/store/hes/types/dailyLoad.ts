// types.ts
export interface RecordData {
    ID: string;
    daily_temperature: number;
    dailyload_datetime: string;
    data_type: string;
    datetime: string;
    export_VAh: number;
    export_Wh: number;
    import_VAh: number;
    import_Wh: number;
}

export interface Record {
    id: number;
    device_id: number;
    data_timestamp: string;
    dcu_serial: string;
    device_identifier: string;
    data_source: string;
    data: RecordData;
}

export interface Cursor {
    after?: string;
    before?: string | null;
}

export interface APIResponse {
    success: boolean;
    data: {
        records: Record[];
        count: number;
        cursor: Cursor;
    };
    error: string | null;
}
