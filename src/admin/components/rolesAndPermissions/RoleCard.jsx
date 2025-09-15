import { useState } from 'react';
import { PermissionsModal } from '../rolesAndPermissions/PermissionsModal';
import { Edit, Eye, Settings, Shield } from 'lucide-react';
import { FormModal } from './FormModal';

export const RoleCard = ({ role }) => {
  const [ modalForm, setModalForm ] = useState(false);  
  const [ modalPermissions, setModalPermissions ] = useState(false);

  const handleModalForm = () => setModalForm(!modalForm);
  const handleModalPermissions = () => setModalPermissions(!modalPermissions);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Role Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">{role.nombre}</h3>
                </div>
                </div>
            </div>
        </div>

        {/* Role Content */}
        <div className="p-6">
            <div className="space-y-4">
                {/* Description */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Settings className="w-3 h-3" />
                        Descripción
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {role.descripcion || "Sin descripción disponible"}
                    </p>
                </div>
            </div>
        </div>

        {/* Actions Footer */}
        <div className="px-6 pb-6">
            <div className="flex gap-2">
                <button onClick={handleModalForm} className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <Edit className="w-4 h-4" />
                    Editar
                </button>
                <button onClick={handleModalPermissions} className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-200 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                    <Eye className="w-4 h-4" />
                </button>
            </div>
        </div>

        <FormModal 
            open={modalForm}
            onClose={handleModalForm}
            roleInfo={role}
        />

        <PermissionsModal 
            open={modalPermissions} 
            onClose={handleModalPermissions} 
            role={role}
        />

    </div>
  )
}
