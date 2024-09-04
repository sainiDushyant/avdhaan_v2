import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

interface LinkData {
    to: string;
    title: string;
}

interface NavigationHeaderProps {
    linkData: LinkData[];
    alias?: {
        name: string;
        for: string;
    };
    containerCss?: string;
    activeCss?: string;
    children?: ReactNode;
}


const NavigationHeader: FC<NavigationHeaderProps> = ({ 
    linkData, alias, 
    containerCss, activeCss, children 
}) => {

    const { pathname } = useLocation();
    const activeClass = cn("border-b-4 pb-1 border-[#7367f0] drop-shadow-sm rounded-none", activeCss);
    const hasAlias = alias ? pathname.includes(alias.name): false;

    return (
        <div className="p-5">
            <div
                className={cn(
                    "flex items-center justify-around gap-12 mb-4 py-3",
                    containerCss
                )}
            >
                {
                    linkData.map((link, index) => {
                        return <Link
                            key={`${link}_${index}`}
                            to={link.to}
                            className={cn(
                                "link-button", "min-w-[20vw] text-xs md:text-sm p-0",
                                (pathname === link.to || (alias?.for === link.to && hasAlias))  && activeClass
                            )}
                        >
                            {link.title}
                        </Link>
                    })
                }
            </div>
            <main>
                {children && children}
                <Outlet />
            </main>
        </div>
    )
}

export default NavigationHeader