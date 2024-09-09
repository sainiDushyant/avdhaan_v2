import { Cursor } from '../../other';

interface PeriodicPushDeviceData {
  BN_voltage: string;
  B_phase_current: string;
  MD_VA: string;
  MD_W: string;
  RN_voltage: string;
  R_phase_current: string;
  YN_voltage: string;
  Y_phase_current: string;
  cumm_billing_count: string;
  cumm_tamper_count: string;
  data_type: string;
  device_id: string;
  export_VAh: string;
  export_Wh: string;
  import_VAh: string;
  import_Wh: string;
  load_limit_status: string;
  load_limit_value: string;
  meter_time: string;
  phase_current: string;
  push_counter: string;
  push_obis: string;
  push_triggered_time: string;
  voltage: string;
}

export interface PeriodicPushRecord {
  id: number;
  device_id: number;
  data_timestamp: string;
  device_identifier: string;
  data_source: string;
  data: PeriodicPushDeviceData;
}

export interface FlatenedPeriodicPushRecord {
  records: {
    id: number;
    device_id: number;
    data_timestamp: string;
    device_identifier: string;
    BN_voltage: string;
    B_phase_current: string;
    MD_VA: string;
    MD_W: string;
    RN_voltage: string;
    R_phase_current: string;
    YN_voltage: string;
    Y_phase_current: string;
    cumm_billing_count: string;
    cumm_tamper_count: string;
    data_type: string;
    export_VAh: string;
    export_Wh: string;
    import_VAh: string;
    import_Wh: string;
    load_limit_status: string;
    load_limit_value: string;
    meter_time: string;
    phase_current: string;
    push_counter: string;
    push_obis: string;
    push_triggered_time: string;
    voltage: string;
  }[];
  cursor: {
    before: Cursor;
    after: Cursor;
  };
}
