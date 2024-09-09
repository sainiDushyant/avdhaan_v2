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

export type Cursor = string | null;

export interface CursorPaginationProps {
  countApiPath?: string;
  after_cursor: Cursor;
  before_cursor: Cursor;
  prefetchCursor?: (
    arg1: { after_cursor: Cursor; before_cursor: Cursor },
    args2?: { [k: string]: string | number }
  ) => void;
}
