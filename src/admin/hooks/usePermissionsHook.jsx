import { useState } from "react";
import { toast } from 'react-toastify';
import { PermissionsAPI } from "../API/permissions";

export const usePermissionsHook = () => {
    const [ permissions, setPermissions ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const can = (userPermissions = [], permissionCode) => {
        if (!Array.isArray(userPermissions)) return false;
        return userPermissions.some(p => p.codigo_permiso === permissionCode);
    };

    const hasRole = (userPermissions = [], roleName) => {
        if (!Array.isArray(userPermissions)) return false;
        return userPermissions.some(p => p.rol === roleName);
    };

    const getPermissions = async (role = null) => {
        try {
            setLoading(true);
            
            const res = role 
             ?  await PermissionsAPI.getPermissionsByRole(role.rol_id)
             :  await PermissionsAPI.getPermissions();

            if(!res.success) throw new Error(res.message);

            setPermissions(res.data.permissions)

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getUserPermissions = async () => {
        try {
            setLoading(true);

            const res = await PermissionsAPI.getUserPermissions();

            if(!res.success) throw new Error(res.message);

            return { 
                user: res.data.user,
                permissions: res.data.permissions 
            }

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        can,
        hasRole,
        permissions,
        loading,
        getPermissions,
        getUserPermissions
    }
}
