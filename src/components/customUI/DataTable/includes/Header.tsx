import { Input } from "@/components/ui/input"
import BaseModal from "@/components/customUI/Modals";
import FilterLogo from '@/components/svg/FilterLogo'
import { type HeaderProps } from "../types";
import { useState, useCallback, ChangeEvent } from "react";

function Header<T>({
    search, showFilter,
    filterBy, table, dataLength,
}: HeaderProps<T>) {

    const [searchQuery, setSearchQuery] = useState(search?.currentSearchQuery || "");
    const [filterOpen, setFilterOpen] = useState(false);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchQuery(value);
        if (search && search.onSearchDataCb) search.onSearchDataCb(value);
      }, [ search ]);

    return (
        <div className="flex items-center justify-between gap-x-3">
            {search &&
                <Input
                    placeholder={`Search by ${search.searchBy}...`}
                    className="max-w-sm mb-3"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
            }
            {showFilter && filterBy &&

                <BaseModal
                    open={filterOpen}
                    setOpen={setFilterOpen}
                    buttonClass="drop-shadow-xl flex-none bg-transparent border-2 rounded-full w-[50px] h-[50px] p-0 mb-3 flex items-center justify-center"
                    ButtonLogo={FilterLogo}
                    modalClass="lg:w-[30vw]"
                >
                    <h2>Filter Data</h2>
                    {
                        filterBy.map(filterQuery => (
                            <Input
                                key={filterQuery}
                                placeholder={`Filter by ${filterQuery}...`}
                                value={
                                    dataLength === 0 ? "" :
                                        (table.getColumn(filterQuery)?.getFilterValue() as string) ?? ""
                                }
                                onChange={(event) => table.getColumn(filterQuery)?.setFilterValue(event.target.value)}
                                className="max-w-sm mb-3"
                            />
                        ))
                    }
                </BaseModal>
            }
        </div>
    )
}

export default Header