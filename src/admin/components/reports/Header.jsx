import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  Search, 
  Calendar, 
  FileText, 
  Users, 
  X,
  Plus,
  RotateCcw,
  Hash,
  UserCheck,
  Building
} from 'lucide-react';

export const Header = ({ 
  examTypes, 
  examStatuses, 
  generateReport, 
  loading, 
  page = 1, 
  handlePageChange 
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [collaboratorInputs, setCollaboratorInputs] = useState(['']);
  const [limit, setLimit] = useState(() => {
    return sessionStorage.getItem('reportLimit') ||  searchParams.get('limit') || '10';
  });
  
  const { control, handleSubmit, reset, watch, setValue } = useForm();
  const watchedValues = watch();

  // Cargar datos desde URL o sessionStorage al montar el componente
  useEffect(() => {
    const loadInitialData = () => {
      const urlData = {
        examTypeID: searchParams.get('examTypeID') || '',
        examStatus: searchParams.get('examStatus') || '',
        collaboratorsStatus: searchParams.get('collaboratorsStatus') || '',
        collaboratorType: searchParams.get('collaboratorType') || '',
        startDate: searchParams.get('startDate') || '',
        endDate: searchParams.get('endDate') || '',
      };

      // Cargar colaboradores desde URL o sessionStorage
      const urlCollaborators = searchParams.get('collaborators');
      let collaborators = [''];
      
      if (urlCollaborators) {
        try {
          collaborators = JSON.parse(decodeURIComponent(urlCollaborators));
        } catch (e) {
          console.warn('Error parsing collaborators from URL:', e);
        }
      } else {
        const sessionCollaborators = sessionStorage.getItem('reportCollaborators');
        if (sessionCollaborators) {
          try {
            collaborators = JSON.parse(sessionCollaborators);
          } catch (e) {
            console.warn('Error parsing collaborators from sessionStorage:', e);
          }
        }
      }

      // Establecer valores en el formulario
      Object.keys(urlData).forEach(key => {
        if (urlData[key]) setValue(key, urlData[key]);
      });

      if (collaborators.length > 0 && collaborators[0] !== '') {
        setCollaboratorInputs(collaborators);
        setValue('collaborators', collaborators);
      }

      // Establecer límite
      const urlLimit = searchParams.get('limit');
      const sessionLimit = sessionStorage.getItem('reportLimit');
      const finalLimit = urlLimit || sessionLimit || '10';
      setLimit(finalLimit);
    };

    loadInitialData();
  }, [searchParams, setValue]);

  // Sincronizar datos con sessionStorage y URL
  const syncDataToStorage = (data, limitValue) => {
    try {
      // Guardar en sessionStorage
      if (data.collaborators && data.collaborators.length > 0) 
        sessionStorage.setItem('reportCollaborators', JSON.stringify(data.collaborators));
      
      sessionStorage.setItem('reportLimit', limitValue);

      // Actualizar URL parameters
      const params = new URLSearchParams();
      
      Object.keys(data).forEach(key => {
        if (data[key] && key !== 'collaborators') 
          if (typeof data[key] === 'string' && data[key].trim()) params.set(key, data[key]);
        
      });

      if (data.collaborators && data.collaborators.length > 0) {
        const filteredCollaborators = data.collaborators.filter(c => c && c.trim());
        if (filteredCollaborators.length > 0) 
          params.set('collaborators', encodeURIComponent(JSON.stringify(filteredCollaborators)));

      }

      if (limitValue && limitValue !== '10') params.set('limit', limitValue);

      // Actualizar URL sin recargar la página
      setSearchParams(params, { replace: true });
    } catch (err) {
      console.error('Error syncing data to storage:', err);
    }
  };

  const addCollaboratorField = () => {
    const newCollaborators = [...collaboratorInputs, ''];
    setCollaboratorInputs(newCollaborators);
    setValue('collaborators', newCollaborators);
  };

  const removeCollaboratorField = (index) => {
    if (collaboratorInputs.length > 1) {
      const newCollaborators = collaboratorInputs.filter((_, i) => i !== index);
      setCollaboratorInputs(newCollaborators);
      setValue('collaborators', newCollaborators);
    }
  };

  const updateCollaborator = (index, value) => {
    const newCollaborators = [...collaboratorInputs];
    newCollaborators[index] = value;
    setCollaboratorInputs(newCollaborators);
    setValue('collaborators', newCollaborators);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    sessionStorage.setItem('reportLimit', newLimit);
    
    // Actualizar URL con el nuevo límite
    const params = new URLSearchParams(searchParams);
    newPage > 1 ? params.set('page', newPage.toString()) : params.delete('page');
    setSearchParams(params, { replace: true });
  };

  const onSubmitted = handleSubmit(async (data) => {
    const filteredData = {
      ...data,
      collaborators: data.collaborators?.filter(c => c && c.trim()) || [],
      limit: parseInt(limit) || 10
    };
  
    handlePageChange(1)
    syncDataToStorage(filteredData, limit);
    await generateReport(filteredData, page, filteredData.limit);
  });

  const resetFilters = () => {
    reset();
    setCollaboratorInputs(['']);
    setLimit('10');
    
    // Limpiar sessionStorage
    sessionStorage.removeItem('reportCollaborators');
    sessionStorage.removeItem('reportLimit');
    
    // Limpiar URL parameters
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = Object.values(watchedValues).some(value => {
    if (Array.isArray(value)) return value.some(v => v && v.trim() !== '');
    return value && value.trim() !== '';
  }) || limit !== '10';

const limitOptions = [
  { value: '5', label: '5 resultados' },
  { value: '10', label: '10 resultados' },
  { value: '25', label: '25 resultados' },
  { value: '50', label: '50 resultados' },
  { value: '100', label: '100 resultados' },
  { value: '250', label: '250 resultados' },
  { value: '500', label: '500 resultados' }
];

const collaboratorsStatusOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'ACTIVO', label: 'Activos' },
  { value: 'INACTIVO', label: 'Inactivos' }
];

const  collaboratorTypeOptions = [
  { value: '', label: 'Todos los tipos' },
  { value: 'TEMPORAL', label: 'Temporales' },
  { value: 'NEW STETIC', label: 'New Stetic' }
];

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
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-600 font-medium">Filtros activos aplicados</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-gray-500" />
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(e.target.value)}
                  className="px-3 py-2 text-sm bg-white/80 border border-gray-200/80 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                >
                  {limitOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

            <motion.button
              type="button"
              disabled={loading}
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
              {hasActiveFilters && !filtersExpanded && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
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
            <form onSubmit={onSubmitted} className="p-6 bg-gradient-to-br from-gray-50/50 to-white/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Tipo de Examen */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span>Tipo de Examen</span>
                  </label>
                  <Controller
                    name="examTypeID"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-2.5 bg-white/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                      >
                        <option value="">Todos los tipos</option>
                        {examTypes.map(type => (
                          <option key={type.tipo_examen_id} value={type.tipo_examen_id}>
                            {type.nombre}
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
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                {/* Estado del Colaborador */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <UserCheck className="w-4 h-4 text-gray-500" />
                    <span>Estado del Colaborador</span>
                  </label>
                  <Controller
                    name="collaboratorsStatus"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-2.5 bg-white/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                      >
                        {collaboratorsStatusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                {/* Tipo de Usuario */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span>Tipo de colaboradores </span>
                  </label>
                  <Controller
                    name="collaboratorType"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-2.5 bg-white/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                      >
                        {collaboratorTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
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
                    disabled={loading}
                    onClick={() => setFiltersExpanded(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 hover:bg-gray-100/80 rounded-xl transition-colors duration-200 border border-gray-200/80"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cerrar
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-xl transition-all duration-200 shadow-md text-sm font-medium ${
                      !loading
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg'
                        : 'bg-gray-200/80 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                  >
                    <Search className="w-4 h-4" />
                    <span>{loading ? 'Generando...' : 'Generar'}</span>
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