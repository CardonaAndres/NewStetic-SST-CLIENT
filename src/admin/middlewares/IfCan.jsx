import { useAuth } from "../../auth/context/AuthContext";
import { usePermissionsHook } from "../hooks/usePermissionsHook";

export const IfCan = ({ permission, children, fallback = null }) => {
  const { userPermissions, loading: authLoading } = useAuth();
  const { can, loading: permissionsLoading } = usePermissionsHook();

  const loading = authLoading || permissionsLoading;

  if (loading) return null; 
  if (!can(userPermissions, permission)) return fallback;

  return <>{children}</>;
};
