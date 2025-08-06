import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '../../../app/components/LoadingScreen';
import { useExamTypesHook } from '../../../admin/hooks/useExamTypesHook';
import { useExamCheckListHook } from '../../hooks/useExamCheckListHook';
import { FileText, Save, X, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1
      }
    }
};

const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2 }
    }
};

export const ExamCheckListForm = ({ onClose, initialData }) => {
  const [searchParams] = useSearchParams();
  const { getExamTypes, examTypes, loading: examTypesLoading } = useExamTypesHook();
  const { loading: checkListLoading, associateOrUpdateExamType } = useExamCheckListHook();
  const [examTypesFilter, setExamTypesFilter] = useState([]);
  const isEditing = initialData.checklist_id !== null;
  const {control, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    defaultValues: {
      ...initialData,
      userDocument: searchParams.get("cc")
    },
    mode: 'onChange'
  });

  const onSubmited = handleSubmit(async itemData => {
    await associateOrUpdateExamType(isEditing, itemData, onClose);
  });

  useEffect(() => {
        if (!searchParams.get("cc")) onClose();
  }, [searchParams]);

  useEffect(() => {
    getExamTypes('?condition=actives');
  }, []);

  useEffect(() => {
        if (examTypes.length > 0) {
            const filtered = examTypes.filter(
                e =>
                    String(e?.nombre).toLowerCase() !== 'ingreso' &&
                    String(e?.nombre).toLowerCase() !== 'egreso'
            );
            setExamTypesFilter(filtered);
        }
    }, [examTypes]);

  if (examTypesLoading || checkListLoading) return <LoadingScreen />;

  return (
    <motion.div
        className="max-w-4xl mx-auto"
        variants={formVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.div variants={fieldVariants}>
            <form className="space-y-6" onSubmit={onSubmited}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-8">
                <div className="space-y-8">
                {/* Tipo de Examen */}
                <motion.div variants={fieldVariants}>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>Tipo de Examen</span>
                        <span className="text-red-500">*</span>
                    </div>
                    </label>
                    <Controller
                    name="examTypeId"
                    control={control}
                    rules={{ required: 'Debes seleccionar un tipo de examen' }}
                    render={({ field }) => (
                        <div className="relative">
                        <select {...field} defaultValue={initialData.examTypeId}
                            className={`w-full px-4 py-3 bg-white/90 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                            errors.examTypeId
                                ? 'border-red-300 focus:border-red-400'
                                : 'border-gray-200/50 focus:border-blue-300'
                            }`}
                        >
                            <option value="">Selecciona un tipo de examen</option>
                            {examTypesFilter.map((type) => (
                            <option key={type.tipo_examen_id} value={type.tipo_examen_id}>
                                {type.nombre}
                            </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        </div>
                    )}
                    />
                    <AnimatePresence>
                    {errors.examTypeId && (
                        <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 flex items-center space-x-2 text-red-600 text-sm"
                        >
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.examTypeId.message}</span>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </motion.div>

                {/* Es Requerido */}
                <motion.div variants={fieldVariants}>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-orange-600" />
                        <span>¿Es Requerido?</span>
                        <span className="text-red-500">*</span>
                    </div>
                    </label>
                    <Controller
                    name="isRequired"
                    control={control}
                    rules={{ required: 'Debes especificar si es requerido' }}
                    render={({ field }) => (
                        <div className="grid grid-cols-2 gap-4">
                        {['SI', 'NO'].map((option) => (
                            <motion.label
                            key={option}
                            className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                field.value === option
                                ? option === 'SI'
                                    ? 'border-red-300 bg-red-50/50'
                                    : 'border-gray-300 bg-gray-50/50'
                                : 'border-gray-200/50 hover:border-gray-300 hover:bg-gray-50/30'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            >
                            <input
                                type="radio"
                                value={option}
                                checked={field.value === option}
                                onChange={field.onChange}
                                className="sr-only"
                            />
                            <div className="flex items-center space-x-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                field.value === option
                                    ? option === 'SI'
                                    ? 'border-red-500 bg-red-500'
                                    : 'border-gray-500 bg-gray-500'
                                    : 'border-gray-300'
                                }`}>
                                {field.value === option && (
                                    <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 bg-white rounded-full"
                                    />
                                )}
                                </div>
                                <span className={`font-medium ${
                                field.value === option
                                    ? option === 'SI'
                                    ? 'text-red-700'
                                    : 'text-gray-700'
                                    : 'text-gray-600'
                                }`}>
                                {option === 'SI' ? 'Sí, es requerido' : 'No es requerido'}
                                </span>
                                {option === 'SI' && (
                                <Shield className={`w-4 h-4 ${
                                    field.value === option ? 'text-red-600' : 'text-gray-400'
                                }`} />
                                )}
                            </div>
                            </motion.label>
                        ))}
                        </div>
                    )}
                    />
                    <AnimatePresence>
                    {errors.isRequired && (
                        <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 flex items-center space-x-2 text-red-600 text-sm"
                        >
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.isRequired.message}</span>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </motion.div>

                {/* Estado - Solo para edición */}
                <AnimatePresence>
                    {isEditing && (
                    <motion.div
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Estado del Examen</span>
                            <span className="text-red-500">*</span>
                        </div>
                        </label>
                        <Controller
                        name="state"
                        control={control}
                        rules={{ required: 'Debes especificar el estado' }}
                        render={({ field }) => (
                            <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: 'Activo', label: 'Activo', color: 'green', icon: CheckCircle },
                                { value: 'Inactivo', label: 'Inactivo', color: 'red', icon: X }
                            ].map((option) => {
                                const Icon = option.icon;
                                return (
                                <motion.label
                                    key={option.value}
                                    className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                    field.value === option.value
                                        ? option.color === 'green'
                                        ? 'border-green-300 bg-green-50/50'
                                        : 'border-red-300 bg-red-50/50'
                                        : 'border-gray-200/50 hover:border-gray-300 hover:bg-gray-50/30'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <input
                                    type="radio"
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={field.onChange}
                                    className="sr-only"
                                    />
                                    <div className="flex items-center space-x-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        field.value === option.value
                                        ? option.color === 'green'
                                            ? 'border-green-500 bg-green-500'
                                            : 'border-red-500 bg-red-500'
                                        : 'border-gray-300'
                                    }`}>
                                        {field.value === option.value && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 bg-white rounded-full"
                                        />
                                        )}
                                    </div>
                                    <span className={`font-medium ${
                                        field.value === option.value
                                        ? option.color === 'green'
                                            ? 'text-green-700'
                                            : 'text-red-700'
                                        : 'text-gray-600'
                                    }`}>
                                        {option.label}
                                    </span>
                                    <Icon className={`w-4 h-4 ${
                                        field.value === option.value
                                        ? option.color === 'green'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                        : 'text-gray-400'
                                    }`} />
                                    </div>
                                </motion.label>
                                );
                            })}
                            </div>
                        )}
                        />
                        <AnimatePresence>
                        {errors.state && (
                            <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 flex items-center space-x-2 text-red-600 text-sm"
                            >
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.state.message}</span>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>

            {/* Actions */}
            <motion.div 
                variants={fieldVariants}
                className="flex items-center justify-end space-x-4"
            >
                <motion.button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white/80 hover:bg-gray-100/80 border border-gray-200/50 text-gray-700 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                >
                Cancelar
                </motion.button>
                
                <motion.button
                type="submit"
                disabled={isSubmitting || examTypesLoading || checkListLoading}
                className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${
                    isEditing 
                    ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                    : 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                } text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: isSubmitting || examTypesLoading || checkListLoading ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || examTypesLoading || checkListLoading ? 1 : 0.98 }}
                >
                <AnimatePresence mode="wait">
                    {(isSubmitting || examTypesLoading || checkListLoading) ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                    >
                        <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Procesando...</span>
                    </motion.div>
                    ) : (
                    <motion.div
                        key="save"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                    >
                        <Save className="w-5 h-5" />
                        <span>{isEditing ? 'Actualizar Examen' : 'Crear Examen'}</span>
                    </motion.div>
                    )}
                </AnimatePresence>
                </motion.button>
            </motion.div>
            </form>
        </motion.div>
    </motion.div>
  );
};