import { useState } from "react";
import { toast } from 'react-toastify';
import { PermissionsAPI } from "../API/permissions";

export const usePermissionsHook = () => {
    const [ permissions, setPermissions ] = useState([]);
    const [ loading, setLoading ] = useState(false);

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

    return {
        permissions,
        loading,
        getPermissions
    }
}
