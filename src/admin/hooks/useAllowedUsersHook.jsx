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

    return {
        users,
        loading,
        getUsers
    }
}
