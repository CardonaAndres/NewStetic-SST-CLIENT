import { useForm } from "react-hook-form";
import { usePermissionsHook } from '../../hooks/usePermissionsHook';
import { LocalLoading } from "../../../staff/components/users/LocalLoading";
import { useEffect, useState } from "react";
import { Shield, X, FileText, Key, Search, Check, User } from 'lucide-react';

export const RoleAndPermissionsForm = ({ onClose, initialData = {} }) => {
    const isEditMode = initialData.roleID !== null && initialData.roleID !== undefined;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPermissionIds, setSelectedPermissionIds] = useState(
        initialData.permissions ? initialData.permissions.map(p => p.permiso_id) : []
    );
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { 
            ...initialData
        }
    });

    const { loading: permissionLoading, getPermissions, permissions } = usePermissionsHook();

    useEffect(() => {
        getPermissions();
    }, []);

    const filteredPermissions = permissions?.filter(permission => 
        permission.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const togglePermission = (permission) => {
        const permissionId = permission.permiso_id || permission.id;
        
        setSelectedPermissionIds(prev => {
            const isSelected = prev.includes(permissionId);
            if (isSelected) {
                return prev.filter(id => id !== permissionId);
            } else {
                return [...prev, permissionId];
            }
        });
    };

    const isPermissionSelected = (permission) => {
        const permissionId = permission.permiso_id || permission.id;
        return selectedPermissionIds.includes(permissionId);
    };

    const onSubmit = (data) => {
        const roleData = {
            ...data,
            permissionIds: selectedPermissionIds // Solo los IDs
        };
        console.log('Datos del rol:', roleData);
        console.log('IDs de permisos seleccionados:', selectedPermissionIds);
        // Aquí iría la lógica para guardar/actualizar el rol
    };

    if(permissionLoading) return <LocalLoading />

    return (
        <div className="flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full mx-auto my-8 transform transition-all max-h-[100vh] overflow-hidden flex flex-col">
                {/* Header con gradiente */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-6 text-white flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    {isEditMode ? 'Editar Rol' : 'Crear Nuevo Rol'}
                                </h2>
                                <p className="text-blue-100 text-sm">
                                    {isEditMode ? 'Modifica el rol y sus permisos' : 'Define el rol y asigna permisos'}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Form con scroll */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
                        {/* Basic Info Section */}
                        <div className="bg-gray-50 rounded-xl p-6 space-y-5">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-500" />
                                Información del Rol
                            </h3>
                            
                            {/* Nombre del Rol */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Shield className="w-4 h-4 text-blue-500" />
                                    Nombre del Rol
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        {...register('name', {
                                            required: 'El nombre del rol es requerido',
                                            minLength: {
                                                value: 3,
                                                message: 'El nombre debe tener al menos 3 caracteres'
                                            }
                                        })}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-white ${
                                            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        placeholder="Ej: Administrador, Editor, Supervisor"
                                    />
                                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                                        <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FileText className="w-4 h-4 text-indigo-500" />
                                    Descripción del Rol
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <textarea
                                        {...register('description', {
                                            required: 'La descripción es requerida',
                                            minLength: {
                                                value: 10,
                                                message: 'La descripción debe tener al menos 10 caracteres'
                                            }
                                        })}
                                        rows={3}
                                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 bg-white resize-none ${
                                            errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        placeholder="Describe las responsabilidades y alcance de este rol..."
                                    />
                                    <FileText className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                                </div>
                                {errors.description && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                                        <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Permissions Section */}
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <Key className="w-5 h-5 text-blue-500" />
                                    Permisos del Rol
                                    <span className="text-sm font-normal text-gray-500 ml-2">
                                        ({selectedPermissionIds.length} seleccionados)
                                    </span>
                                </h3>
                                
                                {/* Search Permissions */}
                                <div className="relative max-w-sm">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar permisos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 bg-white text-sm"
                                    />
                                </div>
                            </div>

                            {/* Permissions Grid */}
                            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-xl bg-gray-50">
                                <div className="p-4 space-y-2">
                                    {filteredPermissions.map((permission) => {
                                        const permissionId = permission.permiso_id || permission.id;
                                        const isSelected = isPermissionSelected(permission);
                                        
                                        return (
                                            <div
                                                key={permissionId}
                                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                                    isSelected
                                                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                                                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                                onClick={() => togglePermission(permission)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                                                        isSelected
                                                            ? 'bg-blue-500 border-blue-500'
                                                            : 'border-gray-300'
                                                    }`}>
                                                        {isSelected && (
                                                            <Check className="w-3 h-3 text-white" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-800 text-sm">
                                                            {permission.nombre}
                                                        </h4>
                                                        <p className="text-gray-600 text-xs mt-1">
                                                            {permission.descripcion}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                {filteredPermissions.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                        <p className="text-sm">No se encontraron permisos</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 text-gray-600 font-medium border-2 border-gray-200 rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            <Shield className="w-4 h-4" />
                            {isEditMode ? 'Actualizar Rol' : 'Crear Rol'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}