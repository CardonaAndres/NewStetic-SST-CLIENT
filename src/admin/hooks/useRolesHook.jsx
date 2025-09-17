import { useState } from 'react';
import { RolesAPI } from '../API/roles';
import { toast } from 'react-toastify';

export const useRolesHook = () => {
    const [ roles, setRoles ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    
    const getRoles = async () => {
        try {
            setLoading(true);
            
            const res = await RolesAPI.getRoles();
            if(!res.success) throw new Error(res.message);

            setRoles(res.data.roles)

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const createOrUpdateRole = async (isEditMode, onClose, roleInfo) => {
        try {   
            setLoading(true);

            const res = isEditMode 
             ?  await RolesAPI.updateRole(roleInfo)
             :  await RolesAPI.createRole(roleInfo)

            onClose();
            toast.success(`${res.data.message}, debes esperar 5 minutos para ver los cambios`, {
                position: "top-left",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

        } catch (err) {
            onClose();
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        getRoles,
        roles,
        createOrUpdateRole
    }
}
