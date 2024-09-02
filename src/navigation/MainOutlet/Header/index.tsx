import Button from '@/components/ui/button';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return (
        <header className="h-[75px] custom-header flex items-center justify-between bg-white drop-shadow-lg px-4">
            <div className='flex items-center gap-x-1'>
                <Button variant="ghost" onClick={goBack}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={16}
                        viewBox="0 0 20 16"
                        fill="none"
                    >
                        <path
                            d="M19.2125 7.9993L1.71252 7.9993"
                            stroke="#464E5F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.71332 15L1.71332 8L8.71332 1"
                            stroke="#464E5F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Button>
            </div>

            <div className="flex items-center gap-x-1">
                <Button variant="ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={23}
                        height={28}
                        viewBox="0 0 23 28"
                        fill="none"
                    >
                        <path
                            d="M7.22461 25.4741C7.88189 26.96 9.36938 28 11.096 28C12.8226 28 14.31 26.96 14.9673 25.4741H7.22461Z"
                            fill="#98A6C4"
                        />
                        <path
                            d="M11.0958 2.67513C12.2351 2.67513 13.3292 2.87616 14.3444 3.24421V3.11916C14.3444 1.39924 12.9452 0 11.2253 0H10.9668C9.2469 0 7.84766 1.39924 7.84766 3.11916V3.24263C8.86236 2.87567 9.95605 2.67513 11.0958 2.67513Z"
                            fill="#98A6C4"
                        />
                        <path
                            d="M21.3487 23.8308H0.843332C0.455396 23.8308 0.100052 23.5691 0.0193645 23.1896C-0.0605015 22.8139 0.110734 22.4431 0.458135 22.2826C0.540575 22.2291 1.1611 21.7952 1.78233 20.4825C2.9233 18.0717 3.16279 14.6757 3.16279 12.2514C3.16279 7.87711 6.72154 4.31847 11.0958 4.31847C15.4596 4.31847 19.0118 7.85996 19.0287 12.2199C19.0291 12.2304 19.0293 12.2409 19.0293 12.2514C19.0293 14.6757 19.2688 18.0717 20.4097 20.4825C21.031 21.7952 21.6514 22.2292 21.7339 22.2826C22.0813 22.4431 22.2526 22.8139 22.1727 23.1896C22.092 23.5691 21.7367 23.8308 21.3487 23.8308Z"
                            fill="#98A6C4"
                        />
                    </svg>
                </Button>
                <Button variant="ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 28 28"
                        fill="none"
                    >
                        <path
                            d="M13.9556 16.1318C10.7442 16.1318 8.14076 13.5201 8.14076 10.2985C8.14076 7.07682 10.7442 4.46515 13.9556 4.46515C17.1671 4.46515 19.7705 7.07682 19.7705 10.2985C19.7705 13.5201 17.1671 16.1318 13.9556 16.1318Z"
                            fill="#98A6C4"
                        />
                        <path
                            d="M13.9557 0C21.6554 0 27.9114 6.25977 27.9114 14C27.9114 21.7241 21.6714 28 13.9557 28C6.23995 28 -1.33514e-05 21.7402 -1.33514e-05 14C-1.33514e-05 6.27586 6.25599 0 13.9557 0ZM4.55564 22.7138V22.2874C4.55564 19.5678 6.76128 17.3471 9.48024 17.3471H18.5354C21.2463 17.3471 23.46 19.5598 23.46 22.2874V22.6333C25.5213 20.3563 26.7805 17.331 26.7805 14C26.7805 6.91149 21.0458 1.15862 13.9797 1.15862C6.91367 1.15862 1.17098 6.91149 1.17098 14C1.15494 17.3713 2.4302 20.4207 4.55564 22.7138Z"
                            fill="#98A6C4"
                        />
                    </svg>
                </Button>
                <Link to='/'>
                    <h4 className="secondary-title font-medium text-[#98A6C4]">AVDHAAN </h4>
                </Link>
            </div>
        </header>
    )
}

export default Header