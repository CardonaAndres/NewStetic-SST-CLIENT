import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useExamRecordsHook } from '../../hooks/useExamRecordsHook';
import { 
  AlertTriangle, 
  Trash2, 
  X, 
  Shield, 
  FileX, 
  Clock,
  MessageSquare,
} from 'lucide-react';

export const ExamDeleteForm = ({ onClose, itemID }) => {
  const { deleteExam } = useExamRecordsHook();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
      understandConsequences: false,
      confirmDelete: false,
      deletionReason: ''
    }
  });

  const understandConsequences = watch('understandConsequences');
  const confirmDelete = watch('confirmDelete');
  const deletionReason = watch('deletionReason');
  const canProceed = understandConsequences && confirmDelete && deletionReason.trim().length > 0;

  const handleDelete = async () => {
    if (!canProceed) return;
    setShowFinalConfirmation(true);
  };

  const confirmFinalDelete = async () => {
    await deleteExam({itemID, deletionReason}, onClose, setIsDeleting, setShowFinalConfirmation);
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 border-b border-red-400/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Eliminar Examen
              </h2>
              <p className="text-red-100 text-sm">
                Acción permanente e irreversible
              </p>
            </div>
          </div>
          
          {!isDeleting && (
            <motion.button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      <div className="max-h-[calc(90vh-80px)] overflow-y-auto">
        <AnimatePresence mode="wait">
          {!showFinalConfirmation ? (
            /* Main Form */
            <motion.form 
              key="main-form"
              onSubmit={handleSubmit(handleDelete)} 
              className="p-6 space-y-6"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Warning Banner */}
              <motion.div
                className="bg-red-50/80 border border-red-200 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start space-x-3">
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">
                      ⚠️ Advertencia
                    </h3>
                    <p className="text-red-800 text-sm leading-relaxed">
                      Esta acción eliminará permanentemente el examen y <strong>todos sus registros asociados</strong>. 
                      No podrás recuperar esta información una vez eliminada.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Consequences List */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <span>Consecuencias de esta acción:</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/50">
                    <div className="flex items-start space-x-3">
                      <FileX className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Datos del Examen</h4>
                        <p className="text-gray-600 text-xs mt-1">
                          Se eliminará toda la configuración y metadatos del examen
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Deletion Reason */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Motivo de eliminación *</span>
                  </label>
                  
                  <div className="relative">
                    <textarea
                      {...register('deletionReason', {
                        required: 'El motivo de eliminación es obligatorio',
                        minLength: {
                          value: 10,
                          message: 'El motivo debe tener al menos 10 caracteres'
                        },
                        maxLength: {
                          value: 500,
                          message: 'El motivo no puede exceder 500 caracteres'
                        }
                      })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none transition-all duration-200 bg-white"
                      placeholder="Describe brevemente el motivo por el cual necesitas eliminar este examen."
                    />
                    
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {deletionReason.length}/500
                    </div>
                  </div>
                  
                  {errors.deletionReason && (
                    <motion.p 
                      className="text-red-600 text-sm mt-2 flex items-center space-x-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>{errors.deletionReason.message}</span>
                    </motion.p>
                  )}
                </div>
              </motion.div>

              {/* Checkboxes */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('understandConsequences', {
                        required: 'Debes confirmar que entiendes las consecuencias'
                      })}
                      className="mt-1 w-4 h-4 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      <strong>Entiendo que esta acción es irreversible</strong> y que toda la información 
                      del examen y sus registros se perderán permanentemente.
                    </span>
                  </label>
                  
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('confirmDelete', {
                        required: 'Debes confirmar que deseas proceder con la eliminación'
                      })}
                      className="mt-1 w-4 h-4 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      <strong>Confirmo que deseo eliminar este examen</strong> y acepto la responsabilidad 
                      de esta acción.
                    </span>
                  </label>
                </div>
                
                {(errors.understandConsequences || errors.confirmDelete) && (
                  <motion.div 
                    className="text-red-600 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="flex items-center space-x-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Debes confirmar ambas casillas para continuar</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Actions */}
              <motion.div
                className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={!canProceed}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                    canProceed
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={canProceed ? { scale: 1.02 } : {}}
                  whileTap={canProceed ? { scale: 0.98 } : {}}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Proceder con Eliminación</span>
                </motion.button>
              </motion.div>
            </motion.form>
          ) : (
            /* Final Confirmation */
            <motion.div
              key="confirmation"
              className="p-6 text-center space-y-6"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {!isDeleting ? (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-10 h-10 text-red-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Confirmación Final
                    </h3>
                    <p className="text-gray-600 mb-4">
                      ¿Estás absolutamente seguro de que deseas eliminar este examen?
                      <br />
                      <strong className="text-red-600">Esta acción no se puede deshacer.</strong>
                    </p>
                    
                    {/* Show deletion reason in confirmation */}
                    <div className="bg-gray-50 rounded-lg p-4 text-left">
                      <p className="text-sm font-medium text-gray-700 mb-1">Motivo registrado:</p>
                      <p className="text-sm text-gray-600 italic">"{deletionReason}"</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <motion.button
                      onClick={() => setShowFinalConfirmation(false)}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Regresar
                    </motion.button>
                    
                    <motion.button
                      onClick={confirmFinalDelete}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Sí, Eliminar Definitivamente</span>
                    </motion.button>
                  </div>
                </>
              ) : (
                /* Deleting State */
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Eliminando Examen...
                    </h3>
                    <p className="text-gray-600">
                      Por favor espera mientras procesamos la eliminación.
                      <br />
                      Este proceso puede tomar unos momentos.
                    </p>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};