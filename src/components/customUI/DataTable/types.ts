import { type ComponentType } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Table } from "@tanstack/react-table";
import { type Pagination } from "@/store/vee/types/other";
import React from "react";

type BaseTableProps<T> = { table: Table<T> };

type DataProps<T> = { data: T[] };

interface SelectProps<T>{
    selectComponent?: ComponentType<{
        selected: T[];
        onSelectSubmit?: (selectedItemIds: string[]) => void;
    }>;
}
  
interface FilterProps {
    filterBy?: string[];
    showFilter: boolean;
}

interface SearchProps {
    search: {
        searchBy: string;
        currentSearchQuery: string;
        onSearchDataCb?: (query: string) => void;
    }
}
  
export interface PaginationProps {
    pagination?: Pagination;
    currentPage: number;
    totalPages: number;
    onGetPrevPage: () => void;
    onGetNextPage: () => void;
}
  
export interface DataTableProps<T> extends DataProps<T>, Partial<SelectProps<T>>, Partial<SearchProps>, 
    Partial<FilterProps> {
        columns: ColumnDef<T>[];
        onSelectSubmit?: (selectedItemIds: string[]) => void;
        onLoadMoreDataCb?: (pageNo: number, data?: T[]) => void;
        hasInternalPagination?: boolean;
        refresh?:boolean
        refreshFn?:()=>void;
}

export interface HeaderProps<T> extends BaseTableProps<T>, Partial<SearchProps>, 
    Partial<FilterProps> {
        dataLength: number;
        showFilter?: boolean;
        refresh?:boolean;
        refreshFn?:()=>void;
}

export interface MainTableProps<T> extends BaseTableProps<T> {
    columns: ColumnDef<T>[];
}

export interface FooterProps<T> extends BaseTableProps<T> {
    showSelectedInfo: boolean;
    pagination?: Pagination;
    totalRows: number;
    onLoadMoreDataCb?: (pageNo: number, data?: T[]) => void;
}