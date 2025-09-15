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

    return {
        loading,
        getRoles,
        roles
    }
}
