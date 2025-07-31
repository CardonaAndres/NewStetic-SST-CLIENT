import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Building2, Save, X, AlertCircle } from 'lucide-react';
import { LoadingScreen } from '../../../app/components/LoadingScreen';
import { useAreasHook } from '../../hooks/useAreasHook';

export const AreaForm = ({ onClose, areaData = null }) => {
    const { loading: isLoading, createOrUpdate  } = useAreasHook();
    const isEditing = areaData.area_id !== null;
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        defaultValues: {
            ...areaData
        },
        mode: 'onChange'
    });

    const onSubmited = handleSubmit(async info => await createOrUpdate(isEditing, info, onClose));

    if (isLoading) return <LoadingScreen />

    return (
        <div className="flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200/30 bg-gradient-to-r from-teal-50/80 to-teal-100/80">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    {isEditing ? 'Editar Área' : 'Crear Nueva Área'}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {isEditing ? 'Modifica los datos del área' : 'Ingresa los datos del área'}
                                </p>
                            </div>
                        </div>
                        <motion.button
                            onClick={onClose}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </motion.button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={onSubmited} className="p-6 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Nombre del Área
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                            <input
                                {...register('name', {
                                    required: 'El nombre del área es requerido',
                                    minLength: {
                                        value: 2,
                                        message: 'El nombre debe tener al menos 2 caracteres'
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: 'El nombre no puede exceder 50 caracteres'
                                    },
                                    pattern: {
                                        value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
                                        message: 'El nombre solo puede contener letras y espacios'
                                    }
                                })}
                                type="text"
                                placeholder="Ej: Administración, Consultorios, Laboratorio..."
                                className={`w-full px-4 py-3 bg-white/50 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white ${
                                    errors.name
                                        ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                                        : 'border-gray-200 focus:ring-teal-200 focus:border-teal-400'
                                }`}
                                disabled={isLoading}
                            />
                            {errors.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-600 text-xs"
                                >
                                    <AlertCircle className="w-3 h-3" />
                                    <span>{errors.name.message}</span>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* State Field - Only show when editing */}
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-2"
                        >
                            <label className="block text-sm font-semibold text-gray-700">
                                Estado del Área
                            </label>
                            <div className="relative">
                                <select
                                    {...register('state')}
                                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 focus:bg-white appearance-none cursor-pointer"
                                    disabled={isLoading}
                                >
                                    <option value="Activa">Activa</option>
                                    <option value="Inactiva">Inactiva</option>
                                </select>
                                {/* Custom arrow */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <motion.div
                                        animate={{ rotate: 0 }}
                                        className="w-2 h-2 border-r-2 border-b-2 border-gray-400 transform rotate-45"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Form Actions */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-200/30">
                        <motion.button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                        >
                            Cancelar
                        </motion.button>
                        
                        <motion.button
                            type="submit"
                            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                isValid && !isLoading
                                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
                            whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
                            disabled={!isValid || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                    <span>Guardando...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>{isEditing ? 'Actualizar' : 'Crear'} Área</span>
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>

                {/* Character counter for name field */}
                <div className="px-6 pb-4">
                    <div className="text-xs text-gray-500 text-right">
                        {watch('name')?.length || 0}/50 caracteres
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
