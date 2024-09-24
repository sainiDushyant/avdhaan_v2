import { Link } from 'react-router-dom';
import { cn, onMouseSidebarEnter, onMouseSidebarLeave } from "@/lib/utils";
import { sidebarIconsUrlData, sidebarLinkData } from '@/lib/main';
import { useLocation } from 'react-router-dom';


const Icons = () => {
    const { pathname } = useLocation();

    const getUrlBase = (url: string) => {
        return url.split("/").filter(Boolean)[0]
    }

    return (
        <>
            <Link
                to="/"
                className='bg-[#1141A5] h-[75px] w-full flex items-center justify-center'
            >
                <img
                    width="auto" className='max-h-[30px] lg:max-h-[40px]'
                    src="/assets/images/sidebar/logo.png"
                    loading="lazy"
                />
            </Link>


            {
                sidebarIconsUrlData.map(
                    (linkSrc, index) => (
                        <Link
                        key={`${linkSrc}_${index}`}
                        to={sidebarLinkData[index].to}
                        className={`rounded-l-lg group-hover:ml-3 h-[55px] w-full flex items-center justify-center sidebar-item-${index}`}
                        onMouseEnter={() => onMouseSidebarEnter(index)}
                        onMouseLeave={() => onMouseSidebarLeave(index)}
                    >
                        <div
                            className={
                                cn('w-[30px] h-[30px] lg:w-[45px] lg:h-[45px] flex items-center justify-center rounded-lg sidebar-icon custom-sidebar-icon',
                                    getUrlBase(pathname) === getUrlBase(sidebarLinkData[index].to) && "current-route-sidebar"
                                )}
                        >
                            <img width="auto" className='max-h-[50%]' src={linkSrc} />
                        </div>
                    </Link>
                    )
                )
            }
        </>
    )
}

export default Icons