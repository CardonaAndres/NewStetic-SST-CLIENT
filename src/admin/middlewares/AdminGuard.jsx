import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import { Error403Page } from "../../app/pages/Error403Page";

export const AdminGuard = () => {
    const { roleID } = Cookies.get();

    if(roleID != "1") 
        return <Error403Page />

    return <Outlet />;
}
