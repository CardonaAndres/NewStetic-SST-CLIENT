import { useState } from "react";
import { toast } from 'react-toastify';
import { StaffAPI } from "../API/staff";
import { router } from '../../app/config/config.js';
import { 
  User, 
  Calendar, 
  MapPin, 
  Mail, 
  Building, 
  Briefcase, 
  Users, 
  CreditCard, 
  UserCheck, 
  Clock, 
  Award, 
  Shield,
} from 'lucide-react';

const BUK_URL = String(import.meta.env.VITE_BUK_API_URL);
const BUK_AUTH_TOKEN = String(import.meta.env.VITE_BUK_AUTH_TOKEN);

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
                window.location.href = router.home
            }, 1000);
        } finally {
            setLoading(false);
        }
    }

    const getUserByProperty = async property => {
        try {
            toast.info('Cargando usuarios, espera..', {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: true,
                draggable: true,
                theme: "colored",
            });

            const res = await StaffAPI.getUserByProperties(property);
            if(!res.succes) throw new Error(res.message);

            toast.success(res.data.message, {
                position: "top-left",
                autoClose: 5000,
                closeOnClick: true,
                draggable: true,
                theme: "light",
            });

            return res.data.users;

        } catch (err) {
            toast.error(err.message || 'Internal Server Error');
        } 
    }

    const getUserFromBook = async (user) => {
        try {
            setLoading(true);
            const res = await fetch(
                `${BUK_URL}/employees?status=activo&document_number=${user.f200_nit}`, {
                    method : 'GET', headers : { 
                        'Content-Type': 'application/json',
                        'auth_token' : `${BUK_AUTH_TOKEN}` 
                    }
                }
            );
            
            const result = await res.json();

            return result.data[0].picture_url

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const formatInfo = user => {
        const getGenderIcon = (gender) => gender === 'Mujer' ? '♀' : gender === 'Hombre' ? '♂' : '⚧';

        const formatDate = (dateString) => {
            if (!dateString) return 'N/A';

            const date = Array.isArray(dateString) ? dateString[0] : dateString;
            if (date.length === 8) 
                return `${date.substring(0, 4)}/${date.substring(4, 6)}/${date.substring(6, 8)}`;
            
            return date;
        };

        const calculateAge = (birthDate) => {
            if (!birthDate) return 'N/A';

            const date = Array.isArray(birthDate) ? birthDate[0] : birthDate;

            if (date.length === 8) {
              const year = parseInt(date.substring(0, 4));
              const month = parseInt(date.substring(4, 6));
              const day = parseInt(date.substring(6, 8));
              const birth = new Date(year, month - 1, day);
              const today = new Date();
              const age = today.getFullYear() - birth.getFullYear();
              const monthDiff = today.getMonth() - birth.getMonth();
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                return age - 1;
              }
              return age;
            }

            return 'N/A';
        };

        const getStatusText = (status) => status === 1 ? 'Activo' : 'Inactivo';

        const getInitials = (name) => {
            return name.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase();
        };
        
        const getStatusColor = (status) => {
            return status === 1 
                ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                : 'bg-red-100 text-red-700 border-red-200';
        };
        
        const infoSections = [
            {
              title: 'Información Personal',
              icon: <User className="w-5 h-5" />,
              color: 'from-blue-500 to-indigo-600',
              items: [
                { label: 'Nombre Completo', value: user.Nombre, icon: <User className="w-4 h-4" /> },
                { label: 'Tipo de Identificación', value: user["Tipo de indetificacion"] === 'C' ? 'Cédula de Ciudadanía' : user["Tipo de indetificacion"], icon: <CreditCard className="w-4 h-4" /> },
                { label: 'Número de Identificación', value: user.f200_nit, icon: <CreditCard className="w-4 h-4" /> },
                { label: 'Fecha de Nacimiento', value: formatDate(user["Fecha de nacimiento"]), icon: <Calendar className="w-4 h-4" /> },
                { label: 'Edad', value: `${calculateAge(user["Fecha de nacimiento"])} años`, icon: <Clock className="w-4 h-4" /> },
                { label: 'Género', value: `${getGenderIcon(user.Genero)} ${user.Genero}`, icon: <User className="w-4 h-4" /> },
                { label: 'Email', value: user["Correo Electronico"] || 'No registrado', icon: <Mail className="w-4 h-4" /> },
                { label: 'Ubicación', value: `${user.Ciudad}, ${user.Departamento}`, icon: <MapPin className="w-4 h-4" /> }
              ]
            },
            {
              title: 'Información Laboral',
              icon: <Briefcase className="w-5 h-5" />,
              color: 'from-emerald-500 to-teal-600',
              items: [
                { label: 'Cargo', value: user["Desc. Cargo"], icon: <Award className="w-4 h-4" /> },
                { label: 'Gerencia', value: user.Gerencia, icon: <Building className="w-4 h-4" /> },
                { label: 'Proceso', value: user.Proceso?.trim(), icon: <Users className="w-4 h-4" /> },
                { label: 'Grupo de Empleado', value: user["Grupo empleado"], icon: <Users className="w-4 h-4" /> },
                { label: 'Centro de Costos', value: user["Centro de costos"], icon: <Building className="w-4 h-4" /> },
                { label: 'Código Jefe Inmediato', value: user.CodigoJefeImediato || 'No asignado', icon: <UserCheck className="w-4 h-4" /> },
                { label: 'Tipo de Contrato', value: user["Tipo de contrato"], icon: <Briefcase className="w-4 h-4" /> },
                { label: 'Tipo de Aprendiz', value: user.TipoAprendiz || 'N/A', icon: <Award className="w-4 h-4" /> }
              ]
            },
            {
              title: 'Información de Empleo',
              icon: <Clock className="w-5 h-5" />,
              color: 'from-purple-500 to-pink-600',
              items: [
                { label: 'Fecha de Ingreso', value: formatDate(user["Fecha de ingreso"]), icon: <Calendar className="w-4 h-4" /> },
                { label: 'Período de Ingreso', value: user.PeriodoIngreso, icon: <Calendar className="w-4 h-4" /> },
                { label: 'Estado del Empleado', value: getStatusText(user["Estado Empleado"]), icon: <Shield className="w-4 h-4" />, status: user["Estado Empleado"] },
                { label: 'Fecha de Retiro', value: user.fechaRetiro ? formatDate(user.fechaRetiro) : 'Empleado activo', icon: <Calendar className="w-4 h-4" /> }
              ]
            }
          ];

        return {
            infoSections,
            formatDate,
            getInitials,
            getStatusColor,
            getStatusText,
            calculateAge 
        }
    }

    return {
        loading,
        meta,
        users,
        getAllUsers,
        getUserByProperty,
        getUserFromBook,
        formatInfo
    }
}
