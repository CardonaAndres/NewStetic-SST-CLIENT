import { User, MapPin, Calendar, Mail, Building } from 'lucide-react';
import { useState } from 'react';
import { UserModal } from './UserModal';
import { formatDate } from '../../app/assets/js/styles';
import { useStaffHook } from '../hooks/useStaffHook';

export const UserCard = ({ user }) => {
  const [ modal, setModal ] = useState(false);
  const handleModal = () => setModal(!modal);
  const { formatInfo } = useStaffHook();
  const { getStatusText, getStatusColor } = formatInfo(user);

  return (
    <div onClick={handleModal} className="group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer">
      {/* Background Decoration */}
      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-600/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-bold text-slate-800 text-lg group-hover:text-slate-900 transition-colors">
              {user.Nombre}
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              {user["Tipo de identificacion"]}: {user.f200_nit}
            </p>
          </div>
        </div>
        
        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(user["Estado Empleado"])}`}>
          {getStatusText(user["Estado Empleado"])}
        </span>
      </div>

      {/* Position & Department */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-600 font-medium">{user["Desc. Cargo"]}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-600">{user.Gerencia}</span>
        </div>

        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-600">{user["Grupo empleado"]}</span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 truncate">{user["Correo Electronico"] || 'N/A'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500">{user.Ciudad}, {user.Departamento}</span>
        </div>

        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500">{user["Tipo de contrato"]}</span>
        </div>
      </div>

      {/* Join Date */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500">
            Ingreso: {formatDate(user["Fecha de ingreso"])}
          </span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

      <UserModal open={modal} onClose={handleModal} user={user} />
    </div>
  );
};