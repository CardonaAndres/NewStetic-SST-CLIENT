import Cookie from 'js-cookie';
import { AuthAPI } from '../API/auth';
import { LogOut } from 'lucide-react';
import { toast } from 'react-toastify';
import { createContext, useState, useContext, useEffect } from "react";
import { usePermissionsHook } from '../../admin/hooks/usePermissionsHook';

const isProduction = window.location.protocol === "https:";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

export const AuthProvider = ({ children }) => {
    const { getUserPermissions } = usePermissionsHook();
    const [userPermissions, setUserPermissions] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const login = async (username, password) => {
        try {
            setLoading(true);
            const res = await AuthAPI.login(username, password);
            if(!res.success) throw new Error(res.message);

            setIsAuth(true);
            setUser(res.data.user);

            Cookie.set('token', res.data.user.token, {
                expires: 1/24, 
                secure: isProduction,
            });

            Cookie.set('user', JSON.stringify(res.data.user), {
                expires: 1/24, 
                secure: isProduction,
                sameSite: 'Strict' 
            });

            toast.success('Bienvenido, ' + res.data.user.displayName, {
                position: "top-left",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

        } catch (err) {
            toast.error(err.message || "Error al iniciar sesión ❌");
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        toast.success('¡Nos vemos! ' + user.displayName, {
            icon : <LogOut className='text-green-600 w-5 h-5' />,
            position: "top-left",
            autoClose: 5000,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });

        setTimeout(() => {
           ['token', 'user'].forEach(name => Cookie.remove(name, { path: '/' }));
           window.location.href = '/'
        }, 1000) 
    }

    useEffect(() => {
        setLoading(true);
        const { user, token } = Cookie.get();

        if (user && token) {
            setUser(JSON.parse(user));
            setIsAuth(true);

            getUserPermissions()
             .then(res => {
                setUserPermissions(res.permissions);
                Cookie.set('roleID', res.user.rol_id, { path: '/' });
             })
             .catch(() => {
                console.log('Error al solicitar los permisos del usuario al backend');
                setUserPermissions([]);
             }).finally(() => setLoading(false));
             
        } else {
            setLoading(false);
        }

    }, []);

    return (
        <AuthContext.Provider value={{
            login,
            isAuth,
            loading,
            user,
            logout,
            userPermissions
         }}
        >
            {children}
        </AuthContext.Provider>
    )

}