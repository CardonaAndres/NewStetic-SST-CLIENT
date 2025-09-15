import { usePermissionsHook } from '../../hooks/usePermissionsHook';
import { LocalLoading } from '../../../staff/components/users/LocalLoading';
import { useEffect, useState } from 'react';
import { Shield, Key, X, Search, Code, FileText, Users } from 'lucide-react';

export const PermissionsView = ({ role = null, onClose }) => {
    const { permissions, getPermissions, loading } = usePermissionsHook();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPermissions, setFilteredPermissions] = useState([]);

    useEffect(() => {
        getPermissions(role);
    }, []);

    useEffect(() => {
        if (permissions) {
            const filtered = permissions.filter(permission => 
                permission.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                permission.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                permission.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPermissions(filtered);
        }
    }, [permissions, searchTerm]);

    if(loading) return <LocalLoading />

    return (
        <div className="space-y-6 bg-gray-50/80 p-6 rounded-2xl">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Key className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {role ? `Permisos de ${role.nombre}` : 'Todos los Permisos del Sistema'}
                            </h1>
                            <p className="text-emerald-100 text-sm">
                                {role 
                                    ? `Permisos asignados al rol "${role.nombre}"`
                                    : 'Lista completa de permisos disponibles en el sistema'
                                }
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                            <Shield className="w-4 h-4" />
                            <span className="font-semibold">{permissions?.length || 0} Permisos</span>
                        </div>
                    
                        <button onClick={onClose} className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all duration-200 hover:scale-105 border border-white/20 hover:border-white/30">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Role Info Card (if specific role) */}
            {role && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">{role.nombre}</h3>
                            <p className="text-gray-600 text-sm">{role.descripcion}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Section */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar permisos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                />
            </div>

            {/* Permissions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPermissions.map((permission) => (
                    <div
                        key={permission.code}
                        className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    >
                        {/* Permission Header */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                    <Key className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-800 text-sm truncate">{permission.nombre}</h3>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Code className="w-3 h-3 text-gray-400" />
                                        <span className="text-xs text-gray-500 font-mono">{permission.code}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Permission Content */}
                        <div className="p-4">
                            <div className="flex items-start gap-2">
                                <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {permission.descripcion || "Sin descripción disponible"}
                                </p>
                            </div>
                        </div>

                        {/* Permission Footer */}
                        <div className="px-4 pb-4">
                            <div className="flex items-center justify-end">
                                <span className="text-xs text-gray-400">
                                    {permission.code}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State - Search */}
            {filteredPermissions.length === 0 && searchTerm && (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron permisos</h3>
                    <p className="text-gray-500">
                        No hay permisos que coincidan con "{searchTerm}"
                    </p>
                </div>
            )}

            {/* Empty State - No Permissions */}
            {permissions?.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Key className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        {role ? `No hay permisos para el rol "${role.nombre}"` : 'No hay permisos configurados'}
                    </h3>
                    <p className="text-gray-500">
                        {role 
                            ? 'Este rol no tiene permisos asignados actualmente'
                            : 'No se encontraron permisos en el sistema'
                        }
                    </p>
                </div>
            )}
        </div>
    )
}