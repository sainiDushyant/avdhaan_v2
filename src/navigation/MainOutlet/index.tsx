import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const MainOutlet = () => {
    return (
        <div className="flex flex-col relative">
            <SideBar />
            <NavBar />
            <Header />
            <div className="custom-main transition-all">
                <Outlet />
            </div>
        </div>
    )
}
export default MainOutlet