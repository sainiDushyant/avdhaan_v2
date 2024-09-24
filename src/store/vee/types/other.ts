export type FilterPayload = {
  start_date?: string;
  meter_type?: string;
  load_type?: string;
  end_date?: string;
  next_cursor?: string;
  prev_cursor?: string;
  group_name?: string;
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
  step?: string;
  customCss?: string;
}

export type RangeProps = DateTimeProps;

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