// types.ts
export interface RecordData {
    ID: string;
    avg_current: number;
    avg_voltage: number;
    blockload_datetime: string;
    cumm_export_VAh: number;
    cumm_export_Wh: number;
    cumm_import_VAh: number;
    cumm_import_Wh: number;
    data_type: string;
    datetime: string;
    export_VAh: number;
    export_Wh: number;
    import_VAh: number;
    import_Wh: number;
    temperature: number;
}

 export interface TransformedResponse {
    records: {
        meter_number: string;
        datetime: string;
        export_wh: number;
        import_wh: number;
        export_vah: number;
        import_vah: number;
        avg_current: number;
        avg_voltage: number;
        temperature: number;
        cumm_export_wh: number;
        cumm_import_wh: number;
        cumm_export_vah: number;
        cumm_import_vah: number;
    }[];
    cursor: Cursor;
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
