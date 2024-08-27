import { sidebarLinkData } from "@/lib/main";
import { onMouseSidebarEnter, onMouseSidebarLeave } from "@/lib/utils";
import { Link } from "react-router-dom";


const LinkInfo = () => {

    return (
        <>
            <Link to="/" className='bg-[#1141A5] h-[75px] flex items-center'>
                <img 
                    width="auto" className="max-h-[25px] lg:max-h-[40px]" 
                    src="/vee/assets/images/sidebar/name.png" 
                />
            </Link>

            {
                sidebarLinkData.map((linkItem, index) => (
                    <Link
                        key={`${linkItem.to}_${index}`}
                        to={linkItem.to}
                        className={`text-ellipsis overflow-hidden rounded-r-lg group-hover:mr-3 h-[55px] flex items-center sidebar-item-${index}`}
                        onMouseEnter={() => onMouseSidebarEnter(index)}
                        onMouseLeave={() => onMouseSidebarLeave(index)}
                    >
                        <span className="text-xs lg:secondary-title font-bold text-white">
                            {linkItem.title}
                        </span>
                    </Link>
                ))
            }
        </>
    )
}

export default LinkInfo