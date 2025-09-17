import { Outlet } from "react-router-dom";
import { usePermissionsHook } from "../hooks/usePermissionsHook";
import { useAuth } from "../../auth/context/AuthContext";
import { LoadingScreen } from "../../app/components/LoadingScreen";
import { Error403Page } from "../../app/pages/Error403Page";

export const PermissionGuard = ({ requiredPermission }) => {
  const { userPermissions, loading } = useAuth();
  const { can } = usePermissionsHook();

  if (loading) 
    return <LoadingScreen />

  if (!can(userPermissions, requiredPermission)) 
    return <Error403Page />

  return <Outlet />;
};
