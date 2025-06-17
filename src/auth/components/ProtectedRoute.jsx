import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingScreen } from "../../app/components/LoadingScreen";
import { router } from "../../app/config/config";

export const ProtectedRoute = () => {
    const { token } = Cookies.get();
    const { isAuth, loading } = useAuth();

    if(loading) return <LoadingScreen />
    if (!isAuth && !loading && !token) return <Navigate to={router.home} replace />;
  
    return <Outlet />;
}
