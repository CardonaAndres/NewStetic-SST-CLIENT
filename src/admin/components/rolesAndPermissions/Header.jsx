import { useState } from 'react';
import { Shield, Users, DoorClosed } from 'lucide-react';
import { PermissionsModal } from './PermissionsModal';

export const Header = ({ roles }) => {
  const [ modalPermissions, setModalPermissions ] = useState(false);
  const handleModalPermissions = () => setModalPermissions(!modalPermissions);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Gestión de Roles y Permisos</h1>
                    <p className="text-indigo-100 text-sm">
                        Administra los roles del sistema y sus permisos asociados
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">{roles?.length || 0} Roles</span>
                </div>
                <button onClick={handleModalPermissions}
                    className="px-4 py-2 bg-white text-blue-700 backdrop-blur-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105 border border-white/20 hover:border-white/30"
                >
                    <DoorClosed className="w-4 h-4" />
                    Ver Permisos
                </button>
            </div>
        </div>

        <PermissionsModal 
            open={modalPermissions}
            onClose={handleModalPermissions} 
        />
        
    </div>
  )
}