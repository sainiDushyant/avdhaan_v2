import { Input } from '@/components/ui/input';
import BaseModal from '@/components/customUI/Modals';
import FilterLogo from '@/components/svg/FilterLogo';
import { type HeaderProps } from '../types';
import { useState, useCallback, ChangeEvent } from 'react';

function Header<T>({
  search,
  showFilter,
  refresh,
  refreshFn,
  filterBy,
  table,
  dataLength
}: HeaderProps<T>) {
  const [searchQuery, setSearchQuery] = useState(
    search?.currentSearchQuery || ''
  );
  const [filterOpen, setFilterOpen] = useState(false);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target;
      setSearchQuery(value);
      if (search && search.onSearchDataCb) search.onSearchDataCb(value);
    },
    [search]
  );

  return (
    <div className=" flex flex-row-reverse my-2 items-center gap-x-3">
      {search && (
        <Input
          placeholder={`Search by ${search.searchBy}...`}
          className="max-w-sm mb-3"
          value={searchQuery}
          onChange={handleInputChange}
        />
      )}
      {refresh && (
       <div className='mb-3 cursor-pointer'>  <svg
          id="refresh-tbl"
          name="Refresh"
          className="mr-2 "
          width="45"
          height="45"
          onClick={refreshFn}
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="45"
            height="45"
            rx="22.5"
            fill="url(#paint0_linear_3605_304)"
          />
          <path
            d="M30.4389 25.0313C30.0062 24.8422 29.5023 25.0398 29.3133 25.4724C28.1299 28.1809 25.4557 29.931 22.5005 29.931C20.1579 29.931 17.9921 28.83 16.6052 27.0244L19.5248 27.6051C19.9879 27.6972 20.4378 27.3964 20.5299 26.9334C20.622 26.4704 20.3213 26.0203 19.8583 25.9282L15.0709 24.976C14.6079 24.8841 14.1579 25.1846 14.0657 25.6477L13.1135 30.435C13.0214 30.8981 13.3221 31.3481 13.7852 31.4402C13.8415 31.4514 13.8976 31.4568 13.9528 31.4568C14.3523 31.4568 14.7094 31.1752 14.7904 30.7685L15.3117 28.1475C17.0198 30.3201 19.6544 31.6407 22.5005 31.6407C26.1353 31.6407 29.4245 29.4882 30.88 26.1569C31.069 25.7243 30.8715 25.2204 30.4389 25.0313Z"
            fill="white"
          />
          <path
            d="M31.2152 13.5594C30.7522 13.4674 30.3021 13.768 30.21 14.231L29.6887 16.8524C27.9805 14.6799 25.3459 13.3594 22.5002 13.3594C18.8654 13.3594 15.5762 15.5119 14.1206 18.8431C13.9315 19.2757 14.129 19.7797 14.5616 19.9687C14.6731 20.0174 14.7892 20.0405 14.9035 20.0405C15.2329 20.0405 15.5469 19.8489 15.6873 19.5277C16.8708 16.8191 19.545 15.069 22.5002 15.069C24.8424 15.069 27.0081 16.1698 28.3951 17.9752L25.4756 17.3944C25.0124 17.3024 24.5625 17.603 24.4704 18.066C24.3783 18.5291 24.6789 18.9791 25.142 19.0713L29.9294 20.0236C29.9848 20.0346 30.0406 20.04 30.0962 20.04C30.2641 20.04 30.4296 19.9906 30.5711 19.896C30.7597 19.77 30.8904 19.5743 30.9346 19.3519L31.8869 14.5645C31.979 14.1015 31.6783 13.6514 31.2152 13.5594Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3605_304"
              x1="0"
              y1="0"
              x2="45"
              y2="45"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#2F80ED" />
              <stop offset="1" stop-color="#56CCF2" />
            </linearGradient>
          </defs>
        </svg></div> 
      )}
      {showFilter && filterBy && (
        <BaseModal
          open={filterOpen}
          setOpen={setFilterOpen}
          buttonClass="drop-shadow-xl flex-none bg-transparent border-2 rounded-full w-[50px] h-[50px] p-0 mb-3 flex items-center justify-center"
          ButtonLogo={FilterLogo}
          modalClass="lg:w-[30vw]"
        >
          <h2>Filter Data</h2>
          {filterBy.map((filterQuery) => (
            <Input
              key={filterQuery}
              placeholder={`Filter by ${filterQuery}...`}
              value={
                dataLength === 0
                  ? ''
                  : (table
                      .getColumn(filterQuery)
                      ?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn(filterQuery)?.setFilterValue(event.target.value)
              }
              className="max-w-sm mb-3"
            />
          ))}
        </BaseModal>
      )}
    </div>
  );
}

export default Header;
