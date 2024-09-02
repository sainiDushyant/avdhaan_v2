import { FC, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetSummaryTableDetailsQuery } from "@/store/vee/veeApi";
import DataTable from "@/components/customUI/DataTable";
import Spinner from "@/components/customUI/Loaders/Spinner";
import useGetTableColumns, { ActionType } from "@/hooks/useGetTableColumns";
import CaretLeft from "@/components/svg/CaretLeft";
import CaretRight from "@/components/svg/CaretRight";
import Button from "@/components/ui/button";
import BoxContainer from "@/components/customUI/BoxContainer";
import useGetBasePath from "@/hooks/useGetBasePath";
import GroupDateDetails from "./GroupDateDetails";
import { SummaryGraphRecord } from "@/store/vee/types/records/summary-details";
import { FilterPayload } from "@/store/vee/types/other";
import { SummaryListRecord } from "@/store/vee/types/records/summary";
import FailedValidationRule from "../FailedValidationRule";

interface GroupTableProps {
    group: SummaryGraphRecord;
}

const GroupTable: FC<GroupTableProps> = ({ group }) => {

    const groupName = group.group_name;
    const groupStartDate = group.start_date;
    const groupEndDate = group.end_date;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, _] = useSearchParams();
    const basePath = useGetBasePath(1);

    const [query, setQuery] = useState<FilterPayload>({});
    const skipAPI = Object.keys(query).length === 0;


    const { data: response, isLoading, isFetching, isError } = useGetSummaryTableDetailsQuery({
        pathname: basePath || "",
        params: query || {},
    }, { skip: skipAPI });

    const tableData = response ? response.table : [];

    const listViewActions: ActionType<SummaryListRecord>[] = [];

    if (response?.has_non_primitive_data) {
        listViewActions.push({
            element: GroupDateDetails,
            colName: "Missing Time Stamps",
        });
    }

    if (response?.has_rule_details) {
        listViewActions.push({
            element: FailedValidationRule,
            colName: "Failed Validation Rule",
        });
    }

    const columns = useGetTableColumns({
        cols: tableData, query: ["dates"],
        action: listViewActions.length > 0 ? listViewActions : undefined,
    });

    const getNewRecords = useCallback((val: string | null) => {
        if (!val) return;
        setQuery(prevParams => {
            const params = { ...prevParams };
            params["prev_cursor"] = val;
            if (params['next_cursor']) {
                delete params['next_cursor']
            }
            return params;
        })
    }, [setQuery]);

    const getOldRecords = useCallback((val: string | null) => {
        if (!val) return;
        setQuery(prevParams => {
            const params = { ...prevParams };
            params["next_cursor"] = val;
            if (params['prev_cursor']) {
                delete params['prev_cursor']
            }
            return params;
        })
    }, [setQuery]);

    useEffect(() => {
        const paramsObj: FilterPayload = Object.fromEntries(searchParams.entries());
        paramsObj["group_name"] = groupName;
        if (groupStartDate) {
            paramsObj['start_date'] = groupStartDate;
        }
        if (groupEndDate) {
            paramsObj['end_date'] = groupEndDate;
        }
        setQuery(paramsObj);
        return () => setQuery({});
    }, [setQuery, groupName, groupStartDate, groupEndDate, searchParams])

    if (isLoading) return (
        <BoxContainer>
            <Spinner />
        </BoxContainer>
    );

    if (isError) return (
        <BoxContainer>
            <strong>Something went wrong, please refresh the page !</strong>
        </BoxContainer>
    );

    if (!response || !response.table || response.table.length === 0) return (
        <BoxContainer>
            <strong>There are no records to show as this group succeeded for 100% of meters.</strong>
        </BoxContainer>
    );

    return (
        <div className="flex-1 flex flex-col w-full">
            <div className="self-end">
                <Button
                    variant="ghost"
                    disabled={!response.prev_cursor}
                    onClick={() => getNewRecords(response.prev_cursor)}
                >
                    <CaretLeft />
                </Button>
                <Button
                    variant="ghost"
                    disabled={!response.next_cursor}
                    onClick={() => getOldRecords(response.next_cursor)}

                >
                    <CaretRight />
                </Button>
            </div>
            <div className="flex flex-1 min-h-[60vh] justify-center">
                {
                    !isFetching ? <DataTable columns={columns} data={tableData} /> : <Spinner />
                }
            </div>


        </div>
    )
}

export default GroupTable