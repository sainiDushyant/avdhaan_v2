export type GraphItem = {
  name: string;
  count: number;
  totalCount: number;
  percentage: number;
  color?: string;
}

export type GraphData = GraphItem[];

export type HesFilterPayload = {
  site?: string[];
  pss?: string[];
  feeder?: string[];
  dtr?: string[];
  pole?: string[];
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
  afterCursor: Cursor;
  beforeCursor: Cursor;
  prefetchCursor?: (
    arg1: { afterCursor: Cursor; beforeCursor: Cursor },
    args2?: { [k: string]: string | number }
  ) => void;
}