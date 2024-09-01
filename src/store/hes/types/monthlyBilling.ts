// types.ts
export interface RecordData {
    ID: string;
    datetime: string;
    MD_W: number;
    MD_VA: number;
    avg_PF: number;
    export_Wh: number;
    export_VAh: number;
    MD_W_datetime: string;
    MD_VA_datetime: string;
    cumm_import_VAh: number;
    cumm_import_Wh: number;
    billing_datetime: string;
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
