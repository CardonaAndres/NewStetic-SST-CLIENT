import { useState } from "react";
import { toast } from "react-toastify";
import { AllowedUsersAPI } from "../API/allowesUsers";

export const useAllowedUsersHook = () => {
    const [ loading, setLoading ] = useState(false);
    const [ users, setUsers ] = useState([]);

    const getUsers = async () => {
        try {
           setLoading(true);

           const res = await AllowedUsersAPI.getUsers();
           if (!res.success) throw new Error(res.message);
           
           setUsers(res.data.users)

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const giveOrUpdateAcces  = async (isEditMode, userInfo, onClose) => {
        try {
            setLoading(true);

            const res = isEditMode 
            ? await AllowedUsersAPI.updateAccess(userInfo)
            : await AllowedUsersAPI.giveAccess(userInfo)

            if(!res.success) 
                throw new Error(res.message)

            onClose();
            toast.success(res.data.message, {
                position: "top-left",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

        } catch (err) {
            toast.error(err.message);
            onClose();
        } finally {
            setLoading(false);
        }
    }

    return {
        users,
        loading,
        getUsers,
        giveOrUpdateAcces
    }
}
