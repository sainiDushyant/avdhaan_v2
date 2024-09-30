import { ResponseBaseWithOutPagination } from '.';
import { DownloadCSVRecord } from './records/download-csv';

export type CustomHesApiError = {
  status: number;
  data: ResponseBaseWithOutPagination<null>;
};

export type GraphItem = {
  name: string;
  count: number;
  percentage: number;
  totalCount?: number;
  color?: string;
};

export type GraphData = GraphItem[];

export type HesFilterPayload = {
  pss_id?: string[];
  feeder_id?: string[];
  dtr_id?: string[];
  device_identifier?: string[];
};

export interface DateTimeProps {
  initialValue?: string;
  placeholder?: string;
  customState?: {
    val: string;
    setter: React.Dispatch<React.SetStateAction<string>>;
  };
  max?: string;
  min?: string;
  name?: string;
  required?: boolean;
}

export interface Pagination {
  pageIndex: number;
  pageTotal: number;
}

export interface Option {
  value: string;
  label: string;
}

export interface RefetchDataProps {
  refetch: () => void;
}

export interface DownloadButtonProps {
  downloadCSV: () => void;
  isLoading: boolean;
}

export type Cursor = string | null;
