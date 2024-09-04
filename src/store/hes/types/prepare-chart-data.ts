export type DataType = {
    title?: string;
    value: number;
    percentage?: number;
    color?: string;
    totalCount?: number;
    data_timestamp: string | Date | number;
  }
  
export  type ChartData = {
    [key: string]: DataType[];
  }