import Cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import { router } from "../../app/config/config";
import { usePermissionsHook } from './usePermissionsHook';
import { FileText, LucideDoorClosedLocked, Users2 } from "lucide-react";

const baseOptions = [
    {
        id: "reportes",
        title: "Reportes ",
        description: "Visualizar y generar reportes personalizados",
        icon: FileText,
        color: "from-green-500 to-green-600",
        hoverColor: "from-green-600 to-green-700",
        bgGradient: "from-green-500 to-green-300",
        path: router.reportsPage,
    }
];

const adminOptions = [
    {
        id: "allowed-users",
        title: "Usuarios",
        description: "Visualiza todos los usuarios con acceso al sistema",
        icon: Users2,
        color: "from-gray-500 to-gray-600",
        hoverColor: "from-gray-600 to-gray-700",
        bgGradient: "from-gray-500 to-gray-300",
        path: router.adminUsers,
    },
    {
        id: "roles-and-permissions",
        title: "Roles y Permisos",
        description: "Gestiona los roles del sistema y asigna los permisos correspondientes a cada uno",
        icon: LucideDoorClosedLocked,
        color: "from-purple-500 to-purple-600",
        hoverColor: "from-purple-500 to-purple-600",
        bgGradient: "from-purple-500 to-purple-600",
        path: router.rolesAndPermissions,
    },
];

const permissionOptions = [
    {
        id: "tipos-examenes",
        title: "Tipos de Exámenes",
        description:
        "Gestionar y configurar los diferentes tipos de exámenes médicos",
        icon: FileText,
        color: "from-blue-500 to-blue-600",
        hoverColor: "from-blue-600 to-blue-700",
        bgGradient: "from-blue-500 to-blue-300",
        path: router.examTypesManager,
        requiredPermission: "examtypes.create", 
    },
];

export const useAdminHook = () => {
    const [ finalOptions, setFinalOptions] = useState([]);
    const [ localLoading, setLocalLoading ] = useState(false);
    const { can, loading: permissionsLoading, getUserPermissions } = usePermissionsHook();

    useEffect(() => {
        setLocalLoading(true);

        getUserPermissions()
        .then(res => {
            const { user, permissions } = res;

            Cookie.set("roleID", user.rol_id, { path: "/" });

            const filteredPermissionOptions = permissionOptions.filter(opt =>
                can(permissions, opt.requiredPermission)
            );

            const options = String(user.rol_id) === "1"
             ? [...adminOptions, ...baseOptions, ...filteredPermissionOptions]
             : [...baseOptions, ...filteredPermissionOptions];

            setFinalOptions(options);
        })
        .catch(err => {
            console.error("Error al cargar permisos:", err);
            setFinalOptions([]);
        })
        .finally(() => setLocalLoading(false))

    }, []);

    return {
        adminOptions: finalOptions,
        loading: localLoading || permissionsLoading
    }
}
