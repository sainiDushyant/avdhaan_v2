import { Link } from 'react-router-dom';
import { cn, onMouseSidebarEnter, onMouseSidebarLeave } from "@/lib/utils";
import { sidebarIconsUrlData, sidebarLinkData } from '@/lib/main';
import { useLocation } from 'react-router-dom';

const getUrlBase = (url: string) => {
    return url.split("/").filter(Boolean)[0]
}

const getLink = (linkSrc: string, index: number, pathname: string) => {
    const linkData = sidebarLinkData[index];
    if (linkData.isNative) {
        return (
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
    }
    return (
        <a
            key={`${linkSrc}_${index}`}
            href={`${window.location.origin}${sidebarLinkData[index].to}`}
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
        </a>
    )

}

const Icons = () => {
    const { pathname } = useLocation();

    return (
        <>
            <a
                href={window.location.origin}
                className='bg-[#1141A5] h-[75px] w-full flex items-center justify-center'
            >
                <img
                    width="auto" className='max-h-[30px] lg:max-h-[40px]'
                    src="/hes/assets/images/sidebar/logo.png"
                />
            </a>


            {
                sidebarIconsUrlData.map(
                    (linkSrc, index) => getLink(linkSrc, index, pathname)
                )
            }
        </>
    )
}

export default Icons