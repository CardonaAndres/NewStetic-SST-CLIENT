import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { 
  Filter, 
  Search, 
  Calendar, 
  FileText, 
  Users, 
  Briefcase,
  X,
  Plus,
  Download,
  RotateCcw
} from 'lucide-react';

// Datos de ejemplo para los selects
const examTypes = [
  { value: 'ingreso', label: 'Examen de Ingreso' },
  { value: 'periodico', label: 'Examen Periódico' },
  { value: 'egreso', label: 'Examen de Egreso' },
  { value: 'reintegro', label: 'Examen de Reintegro' },
  { value: 'otros', label: 'Otros Exámenes' }
];

const examStatuses = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'programado', label: 'Programado' },
  { value: 'realizado', label: 'Realizado' },
  { value: 'cancelado', label: 'Cancelado' },
  { value: 'reprogramado', label: 'Reprogramado' }
];

const contractTypes = [
  { value: 'temporal', label: 'Temporal' },
  { value: 'new-stetic', label: 'New Stetic' }
];

export const Header = () => {
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [collaboratorInputs, setCollaboratorInputs] = useState(['']);

  const { 
    control, 
    handleSubmit, 
    reset, 
    watch,
    setValue,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      examType: '',
      startDate: '',
      endDate: '',
      examStatus: '',
      collaborators: [''],
      contractType: ''
    }
  });

  const watchedValues = watch();

  // Función para agregar campo de colaborador
  const addCollaboratorField = () => {
    const newCollaborators = [...collaboratorInputs, ''];
    setCollaboratorInputs(newCollaborators);
    setValue('collaborators', newCollaborators);
  };

  // Función para remover campo de colaborador
  const removeCollaboratorField = (index) => {
    if (collaboratorInputs.length > 1) {
      const newCollaborators = collaboratorInputs.filter((_, i) => i !== index);
      setCollaboratorInputs(newCollaborators);
      setValue('collaborators', newCollaborators);
    }
  };

  // Función para actualizar valor de colaborador
  const updateCollaborator = (index, value) => {
    const newCollaborators = [...collaboratorInputs];
    newCollaborators[index] = value;
    setCollaboratorInputs(newCollaborators);
    setValue('collaborators', newCollaborators);
  };

  const onSubmit = (data) => {
    // Filtrar colaboradores vacíos
    const filteredCollaborators = data.collaborators.filter(c => c.trim() !== '');
    const formData = {
      ...data,
      collaborators: filteredCollaborators
    };
    console.log('Datos del formulario:', formData);
  };

  const resetFilters = () => {
    reset();
    setCollaboratorInputs(['']);
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = Object.values(watchedValues).some(value => {
    if (Array.isArray(value)) {
      return value.some(v => v && v.trim() !== '');
    }
    return value && value.trim() !== '';
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg overflow-hidden"
    >
      {/* Header Principal */}
      <div className="p-6 border-b border-gray-100/50">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Título y descripción */}
          <div className="flex items-start space-x-4 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Reportes de Exámenes Médicos
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                Genera reportes detallados aplicando filtros específicos para obtener la información exacta que necesitas.
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <motion.button
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
                filtersExpanded || hasActiveFilters
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium text-sm">
                Filtros
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Panel de Filtros Expandible */}
      <AnimatePresence>
        {filtersExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-gradient-to-br from-gray-50/50 to-white/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Tipo de Examen */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span>Tipo de Examen</span>
                  </label>
                  <Controller
                    name="examType"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-2.5 bg-white/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                      >
                        <option value="">Todos los tipos</option>
                        {examTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                {/* Estado del Examen */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Search className="w-4 h-4 text-gray-500" />
                    <span>Estado del Examen</span>
                  </label>
                  <Controller
                    name="examStatus"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-2.5 bg-white/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                      >
                        <option value="">Todos los estados</option>
                        {examStatuses.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                {/* Tipo de Contrato */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span>Tipo de Contrato</span>
                  </label>
                  <Controller
                    name="contractType"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-2.5 bg-white/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                      >
                        <option value="">Todos los contratos</option>
                        {contractTypes.map(contract => (
                          <option key={contract.value} value={contract.value}>
                            {contract.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                {/* Fecha Inicio */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Fecha de Inicio</span>
                  </label>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className="w-full px-4 py-2.5 bg-white/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                      />
                    )}
                  />
                </div>

                {/* Fecha Fin */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Fecha de Fin</span>
                  </label>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className="w-full px-4 py-2.5 bg-white/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Colaboradores (Campo especial que ocupa toda la fila) */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>Documentos de Colaboradores</span>
                  </label>
                  <motion.button
                    type="button"
                    onClick={addCollaboratorField}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50/80 hover:bg-blue-100/80 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="w-3 h-3" />
                    <span>Agregar</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {collaboratorInputs.map((collaborator, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        value={collaborator}
                        onChange={(e) => updateCollaborator(index, e.target.value)}
                        placeholder={`Documento ${index + 1}`}
                        className="w-full px-4 py-2.5 pr-10 bg-white/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                      />
                      {collaboratorInputs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCollaboratorField(index)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Botones de acción del formulario */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50">
                <motion.button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Limpiar Filtros</span>
                </motion.button>

                <div className="flex items-center space-x-3">
                  <motion.button
                    type="button"
                    onClick={() => setFiltersExpanded(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 hover:bg-gray-100/80 rounded-xl transition-colors duration-200 border border-gray-200/80"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cerrar
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    disabled={!hasActiveFilters}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-xl transition-all duration-200 shadow-md text-sm font-medium ${
                      hasActiveFilters
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg'
                        : 'bg-gray-200/80 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={hasActiveFilters ? { scale: 1.02 } : {}}
                    whileTap={hasActiveFilters ? { scale: 0.98 } : {}}
                  >
                    <Search className="w-4 h-4" />
                    <span>Aplicar Filtros</span>
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};