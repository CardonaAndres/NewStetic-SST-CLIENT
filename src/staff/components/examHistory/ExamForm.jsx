import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckListStates } from '../../../app/config/config';
import { useExamRecordsHook } from '../../hooks/useExamRecordsHook';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Upload, 
  MessageSquare, 
  AlertCircle, 
  Save, 
  X, 
  CheckCircle,
  RefreshCw,
  FileCheck,
  Hash,
  ExternalLink,
  Edit3,
} from 'lucide-react';

export const ExamForm = ({ initialData, onClose }) => {
  const isEditing = initialData.checklist_item_id !== null;
  const [searchParams] = useSearchParams();
  const { loading, registerOrUpdateExam } = useExamRecordsHook();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [existingDocumentUrl, setExistingDocumentUrl] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors
  } = useForm({
    defaultValues: {  
      ...initialData,
      checkListItemID: searchParams.get("checklistID"),
      updateReason: '' 
    }
  });

  const watchedDateMade = watch('dateMade');
  const watchedExpirationDate = watch('expirationDate');
  const watchedFrequency = watch('frequencyInDays');

  useEffect(() => {
    if (isEditing && initialData.document) setExistingDocumentUrl(initialData.document)
  }, [isEditing, initialData.document]);

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl) };
  }, [previewUrl]);

  useEffect(() => {
    if (watchedDateMade && watchedFrequency && watchedFrequency > 0) {
      const madeDate = new Date(watchedDateMade);
      const expirationDate = new Date(madeDate);
      expirationDate.setDate(madeDate.getDate() + parseInt(watchedFrequency));
      setValue('expirationDate', expirationDate.toISOString().split('T')[0]);
      
      if (errors.expirationDate) clearErrors('expirationDate');
    }
  }, [watchedDateMade, watchedFrequency, setValue, clearErrors, errors.expirationDate]);

  useEffect(() => {
    if (watchedDateMade && watchedExpirationDate) {
      const calculatedDays = calculateDaysBetween(watchedDateMade, watchedExpirationDate)

      if (calculatedDays !== null && calculatedDays > 0) {
        setValue('frequencyInDays', calculatedDays);
        if (errors.frequencyInDays) clearErrors('frequencyInDays')
      }

    }
  }, [watchedDateMade, watchedExpirationDate, setValue, clearErrors, errors.frequencyInDays]);

  const handleFile = (file) => {
    if (file) {
      setSelectedFile(file);
      setValue('document', file);
      
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
      
      setExistingDocumentUrl(null);
      clearErrors('document');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue('document', null);
    
    if (isEditing && initialData.document) setExistingDocumentUrl(initialData.document)
  };

  const handleRemoveExistingDocument = () => {
    setExistingDocumentUrl(null);
    setValue('document', null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
      const formData = new FormData(); 
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      await registerOrUpdateExam(isEditing, onClose, formData)
  });

  const calculateDaysBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1] || 'Documento existente';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50/50 to-blue-100/50 px-6 py-4 border-b border-blue-200/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Editar Registro' : 'Nuevo Registro'}
                </h2>
              </div>
            </div>
            
            <motion.button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 text-gray-600 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Update Reason - Only shown when editing */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Edit3 className="w-4 h-4 text-amber-500" />
                <span>Motivo de Actualización</span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('updateReason', {
                  required: isEditing ? 'Por favor, indica el motivo de la actualización' : false
                })}
                rows={3}
                className={`w-full px-4 py-3 bg-amber-50/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-300 transition-all duration-200 resize-none ${
                  errors.updateReason ? 'border-red-300 bg-red-50/50' : 'border-amber-200/50'
                }`}
                placeholder="Describe por qué estás actualizando este registro..."
              />
              <AnimatePresence>
                {errors.updateReason && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-600 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.updateReason.message}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Date Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Made */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>Fecha de Realización</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register('dateMade', {
                    required: 'La fecha de realización es obligatoria'
                  })}
                  className={`w-full px-4 py-3 bg-white/80 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 ${
                    errors.dateMade ? 'border-red-300 bg-red-50/50' : 'border-gray-200/50'
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.dateMade && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-600 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.dateMade.message}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Expiration Date */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>Fecha de Vencimiento</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register('expirationDate', {
                    required: 'La fecha de vencimiento es obligatoria',
                    validate: (value) => {
                      const dateMade = watchedDateMade;
                      if (dateMade && value) {
                        return new Date(value) >= new Date(dateMade) || 
                               'La fecha de vencimiento no puede ser anterior a la fecha de realización';
                      }
                      return true;
                    }
                  })}
                  className={`w-full px-4 py-3 bg-white/80 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 ${
                    errors.expirationDate ? 'border-red-300 bg-red-50/50' : 'border-gray-200/50'
                  }`}
                />

              </div>
              <AnimatePresence>
                {errors.expirationDate && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-600 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.expirationDate.message}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Frequency and State Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Frequency in Days */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Hash className="w-4 h-4 text-green-500" />
                <span>Frecuencia (días)</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  {...register('frequencyInDays', {
                    required: 'La frecuencia es obligatoria',
                    min: {
                      value: 1,
                      message: 'La frecuencia debe ser mayor a 0'
                    }
                  })}
                  className={`w-full px-4 py-3 bg-white/80 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 ${
                    errors.frequencyInDays ? 'border-red-300 bg-red-50/50' : 'border-gray-200/50'
                  }`}
                  placeholder="30"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <AnimatePresence>
                {errors.frequencyInDays && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-600 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.frequencyInDays.message}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                <span>Estado</span>
                <span className="text-red-500">*</span>
              </label>
              <Controller
                name="state"
                control={control}
                rules={{ required: 'Selecciona un estado' }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full px-4 py-3 bg-white/80 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 ${
                      errors.state ? 'border-red-300 bg-red-50/50' : 'border-gray-200/50'
                    }`}
                  >
                    {CheckListStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                )}
              />
              <AnimatePresence>
                {errors.state && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-600 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.state.message}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Observations */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <MessageSquare className="w-4 h-4 text-teal-500" />
              <span>Observaciones</span>
            </label>
            <textarea
              {...register('observations')}
              rows={4}
              className={`w-full px-4 py-3 bg-white/80 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 resize-none ${
                errors.observations ? 'border-red-300 bg-red-50/50' : 'border-gray-200/50'
              }`}
              placeholder="Escribe cualquier observación relevante..."
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Upload className="w-4 h-4 text-indigo-500" />
              <span>Documento</span>
              {isEditing && selectedFile && (
                <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                  Reemplazará el documento actual
                </span>
              )}
            </label>
            
            {/* Existing Document Display */}
            {existingDocumentUrl && !selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-200/50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <FileCheck className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {getFileNameFromUrl(existingDocumentUrl)}
                    </p>
                    <p className="text-xs text-gray-600">Documento actual</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.a
                    href={existingDocumentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                  <motion.button
                    type="button"
                    onClick={handleRemoveExistingDocument}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* File Drop Zone */}
            {(!existingDocumentUrl || selectedFile) && (
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50/50'
                    : selectedFile
                      ? 'border-green-300 bg-green-50/50'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => handleFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="text-center">
                  {selectedFile ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center">
                        <FileCheck className="w-8 h-8 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <motion.button
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Eliminar archivo
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Arrastra un archivo aquí o haz clic para seleccionar
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, Imágenes, Word (máx. 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200/50">
            <motion.button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 rounded-xl font-medium transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || loading}
            >
              Cancelar
            </motion.button>

            <motion.button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting || loading ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || loading ? 1 : 0.98 }}
              disabled={isSubmitting || loading}
            >
              {(isSubmitting || loading) ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Actualizar' : 'Guardar'} Registro</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};