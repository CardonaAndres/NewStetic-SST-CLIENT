import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import { FileText, Save, X, CheckCircle, XCircle } from "lucide-react";
import { useExamTypesHook } from "../../hooks/useExamTypesHook";

export const ExamTypeForm = ({ onClose, examTypeData }) => {
  const { loading, createOrEditExamType } = useExamTypesHook();
  const isEditing = examTypeData.exam_type_id !== null
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    defaultValues: {
      ...examTypeData
    }
  });

  const onSubmited = handleSubmit(async examTypeData => {
    await createOrEditExamType(isEditing, examTypeData, onClose)
  });

  return (
    <>
      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <form className="max-w-2xl mx-auto" onSubmit={onSubmited}>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 px-6 py-4 border-b border-white/30">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Información del Tipo de Examen</span>
              </h2>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Nombre Field */}
              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700">
                  Nombre del Tipo de Examen <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="nombre"
                    {...register("name", {
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 2,
                        message: "El nombre debe tener al menos 2 caracteres"
                      },
                      maxLength: {
                        value: 100,
                        message: "El nombre no puede exceder 100 caracteres"
                      }
                    })}
                    className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                      errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                    placeholder="Ej: Examen de Ingreso, Examen Periódico, etc."
                  />
                  {errors.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-600 text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>{errors.name.message}</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Estado Field - Solo visible en edición */}
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <label htmlFor="estado" className="block text-sm font-semibold text-gray-700">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="estado"
                      {...register("state", {
                        required: "El estado es obligatorio"
                      })}
                      className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl focus:outline-none transition-all duration-200 appearance-none cursor-pointer ${
                        errors.state 
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                          : 'border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                    
                    {/* Custom Select Arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Estado Visual Indicator */}
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      {watch('state') === 'Activo' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <style jsx>{`
                      select {
                        padding-left: 2.5rem;
                      }
                    `}</style>
                  </div>
                  
                  {errors.state && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-1 text-red-600 text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>{errors.estado.message}</span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Info Text */}
              <div className="bg-blue-50/50 border border-blue-200/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-blue-600 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">Información importante</h4>
                    <p className="text-sm text-blue-700">
                      {isEditing 
                        ? 'Los cambios se aplicarán inmediatamente. Si cambias el estado a "Inactivo", el tipo de examen no estará disponible para nuevos registros.'
                        : 'El nuevo tipo de examen se creará con estado "Activo" por defecto y estará disponible inmediatamente para su uso.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-200/30 flex items-center justify-end space-x-4">
              <motion.button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={(isSubmitting || loading)}
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </motion.button>

              <motion.button
                type="submit"
                disabled={(isSubmitting || loading)}
                className={`px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl ${
                  (isSubmitting || loading) ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                whileHover={!(isSubmitting || loading) ? { scale: 1.02 } : {}}
                whileTap={!(isSubmitting || loading) ? { scale: 0.98 } : {}}
              >
                {(isSubmitting || loading) ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>{isEditing ? 'Actualizando...' : 'Creando...'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isEditing ? 'Actualizar' : 'Crear'} Tipo de Examen</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Preview Card - Solo en creación */}
      {!isEditing && watch('nombre') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <div className="w-5 h-5 text-blue-600">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Vista Previa</span>
            </h3>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{watch('nombre')}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-600">Estado:</span>
                    <div className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>Activo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};