import { Activity, BarChart3, FileText, Shield, Users } from "lucide-react";
import { router } from "../config/config";

export const useNavigationHook = (path = '/') => {
  console.log(path)
  const sidebarItems = [
    { 
        label: 'Gestión de Personal', 
        icon: Users, 
        color: `${router.staff === path ? 'from-green-500 to-emerald-500' : 'from-red-500 to-red-500'}`,
        isActive : (router.staff === path || router.staffIdle === path),
        path : router.staff
    },
    { 
        label: 'Vigilancia Ocupacional', 
        icon: Shield, 
        color: 'from-yellow-500 to-orange-500',
        isActive : router.surveillance === path ,
        path : router.surveillance
    },
    { 
        label: 'EPP y Ergonomía', 
        icon: Activity, 
        color: 'from-purple-500 to-pink-500',
        isActive : router.ppe === path,
        path : router.ppe
    },
    { 
        label: 'Seguridad', 
        icon: FileText, 
        color: 'from-indigo-500 to-blue-500',
        isActive : router.safety === path,
        path : router.safety
    },
    {  
        label: 'Higiene Ocupacional', 
        icon: BarChart3, 
        color: 'from-teal-500 to-cyan-500',
        isActive : router.hygiene === path,
        path : router.hygiene
    },

  ];

  return {
    sidebarItems
  }
}
