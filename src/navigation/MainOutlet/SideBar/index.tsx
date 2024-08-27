import Icons from './Icons'
import LinkInfo from './LinkInfo'

const SideBar = () => {
    return (
        <div className="custom-sidebar group bg-[#0A3690]">
            <div className="w-[100px] group-hover:w-[100px] flex flex-col items-center gap-y-4">
                <Icons />
            </div>
            <div className="w-0 opacity-0 collapse group-hover:visible group-hover:w-full group-hover:opacity-100 flex flex-col gap-y-4">
                <LinkInfo />
            </div>
        </div>
    )
}

export default SideBar