import { useState } from "react";
import { toast } from 'react-toastify';
import { StaffAPI } from "../API/staff";
import { router } from '../../app/config/config.js'

export const useStaffHook = () => {
    const [ loading, setLoading ] = useState(false);
    const [ meta, setMeta] = useState({});
    const [ users, setUsers ] = useState([]);

    const getAllUsers = async (page = 1, limit = 30) => {
        try {
            setLoading(true);
            const res = await StaffAPI.getUsers(page, limit);
            if(!res.succes) throw new Error(res.message);
            
            setUsers(res.data.users);
            setMeta(res.data.meta)
           
        } catch (err) {
            toast.error(err.message || 'Internal Server Error');
            setTimeout(() => {
                window.location.href = router.staff
            }, 1000);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        meta,
        users,
        getAllUsers
    }
}
