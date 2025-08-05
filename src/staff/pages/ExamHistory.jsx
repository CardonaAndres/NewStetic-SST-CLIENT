import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useExamRecordsHook } from '../hooks/useExamRecordsHook';
import { NavigationLayout } from '../../app/layouts/NavigationLayout';
import { LoadingScreen } from '../../app/components/LoadingScreen';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Download, 
  Eye, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  FileX,
  CalendarClock,
  MessageSquare,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';

export const ExamHistory = () => {
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const { loading, getExamRecords, examRecords, exam, meta } = useExamRecordsHook();
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ limit, setLimit ] = useState(() => {
    const storedLimit = sessionStorage.getItem('examRecords_limit');
    return storedLimit ? parseInt(storedLimit, 10) : 15;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');

  const handlePageChange = (newPage) => {
    if (newPage < 1 || (meta && newPage > meta.totalPages)) return;
    setCurrentPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    sessionStorage.setItem('examRecords_limit', newLimit); 
    setCurrentPage(1);
  };

  useEffect(() => {
    getExamRecords(searchParams.get("checklistID"), currentPage, limit)
  }, [currentPage, limit]);

  // Filtrar registros
  const filteredRecords = examRecords?.filter(record => {
    const matchesSearch = record.observaciones?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.estado.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.estado.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  }) || [];

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para calcular días restantes
  const getDaysRemaining = (vencimiento) => {
    if (!vencimiento) return null;
    const today = new Date();
    const dueDate = new Date(vencimiento);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Función para obtener el estado del registro
  const getRecordStatus = (record) => {
    const daysRemaining = getDaysRemaining(record.fecha_vencimiento);
    
    if (record.estado === 'Completado') {
      return {
        label: 'Completado',
        color: 'bg-green-100 text-green-700',
        icon: CheckCircle,
        priority: 'success'
      };
    }
    
    if (record.estado === 'Pendiente') {
      if (daysRemaining !== null) {
        if (daysRemaining < 0) {
          return {
            label: 'Vencido',
            color: 'bg-red-100 text-red-700',
            icon: XCircle,
            priority: 'danger'
          };
        } else if (daysRemaining <= 3) {
          return {
            label: 'Por Vencer',
            color: 'bg-yellow-100 text-yellow-700',
            icon: AlertCircle,
            priority: 'warning'
          };
        }
      }
      return {
        label: 'Pendiente',
        color: 'bg-blue-100 text-blue-700',
        icon: Clock,
        priority: 'info'
      };
    }
    
    return {
      label: record.estado,
      color: 'bg-gray-100 text-gray-700',
      icon: AlertCircle,
      priority: 'default'
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  if(loading) return <LoadingScreen />

  return (
    <NavigationLayout title={`Historial del examen - ${exam?.nombre || 'Cargando...'}`}>
      {/* Header del Examen */}
      <motion.div 
        className="mb-8" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            {/* Back Button and Exam Info */}
            <div className="flex items-start space-x-4 flex-1">
              <motion.button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0 mt-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Volver"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </motion.button>
              
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {exam?.nombre || 'Examen'}
                  </h1>
                  <span>
                    de: {exam?.cc_empleado}
                  </span>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 flex-shrink-0 ${
                    exam?.estado === 'Activo' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {exam?.estado === 'Activo' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    <span>{exam?.estado}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Es Requerido:</span>
                      <span className={`font-medium ${exam?.es_requerido === 'SI' ? 'text-red-600' : 'text-gray-700'}`}>
                        {exam?.es_requerido || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Estado Tipo:</span>
                      <span className="font-medium text-gray-700">{exam?.estado_tipoexamen || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200/50">
                <div className="text-center">
                  <p className="text-xs font-medium text-blue-700">Total</p>
                  <p className="text-lg font-bold text-blue-900">{meta?.totalExamRecords || 0}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200/50">
                <div className="text-center">
                  <p className="text-xs font-medium text-green-700">Completados</p>
                  <p className="text-lg font-bold text-green-900">
                    {examRecords?.filter(r => r.estado === 'Completado').length || 0}
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 border border-yellow-200/50">
                <div className="text-center">
                  <p className="text-xs font-medium text-yellow-700">Pendientes</p>
                  <p className="text-lg font-bold text-yellow-900">
                    {examRecords?.filter(r => r.estado === 'Pendiente').length || 0}
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 border border-red-200/50">
                <div className="text-center">
                  <p className="text-xs font-medium text-red-700">Vencidos</p>
                  <p className="text-lg font-bold text-red-900">
                    {examRecords?.filter(r => {
                      const days = getDaysRemaining(r.fecha_vencimiento);
                      return r.estado === 'Pendiente' && days !== null && days < 0;
                    }).length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 shadow-md p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar en observaciones o estado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
              />
            </div>

            {/* Filters and Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white/80 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                >
                  <option value="all">Todos los estados</option>
                  <option value="completado">Completados</option>
                  <option value="pendiente">Pendientes</option>
                </select>
              </div>

              {/* Items per page */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Mostrar:</span>
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                  className="px-2 py-1 bg-white/80 border border-gray-200/50 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Refresh Button */}
              <motion.button
                onClick={() => getExamRecords(searchParams.get("checklistID"), currentPage, limit)}
                className="p-2 bg-gray-100/80 hover:bg-gray-200/80 text-gray-600 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Records Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredRecords.map((record, index) => {
          const status = getRecordStatus(record);
          const daysRemaining = getDaysRemaining(record.fecha_vencimiento);
          const StatusIcon = status.icon;
          
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group"
              whileHover={{ y: -8 }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                {/* Status Header */}
                <div className={`px-6 py-4 border-b border-gray-100/50 ${
                  status.priority === 'danger' ? 'bg-red-50/50' :
                  status.priority === 'warning' ? 'bg-yellow-50/50' :
                  status.priority === 'success' ? 'bg-green-50/50' :
                  'bg-gray-50/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span>{status.label}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Registro #{index + 1}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Fechas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Realizado</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(record.fecha_realizado)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <CalendarClock className="w-3 h-3" />
                        <span>Vencimiento</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(record.fecha_vencimiento)}
                      </p>
                      {daysRemaining !== null && (
                        <p className={`text-xs ${
                          daysRemaining < 0 ? 'text-red-600' :
                          daysRemaining <= 3 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {daysRemaining < 0 ? `Vencido hace ${Math.abs(daysRemaining)} días` :
                           daysRemaining === 0 ? 'Vence hoy' :
                           `${daysRemaining} días restantes`}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Frecuencia */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Frecuencia</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Cada {record.frecuencia_dias} días
                    </p>
                  </div>

                  {/* Observaciones */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <MessageSquare className="w-3 h-3" />
                      <span>Observaciones</span>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-50/50 rounded-lg p-3 min-h-[3rem]">
                      {record.observaciones || 'Sin observaciones'}
                    </p>
                  </div>

                  {/* PDF Status and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                    <div className="flex items-center space-x-2">
                      {record.PDF_url && record.PDF_url !== 'SIN PDF' ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <FileText className="w-4 h-4" />
                          <span className="text-xs font-medium">PDF Disponible</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-400">
                          <FileX className="w-4 h-4" />
                          <span className="text-xs font-medium">Sin PDF</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {record.PDF_url && record.PDF_url !== 'SIN PDF' && (
                        <>
                          <motion.button
                            className="p-2 bg-blue-100/80 hover:bg-blue-200/80 text-blue-600 rounded-lg transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.open(record.PDF_url, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            className="p-2 bg-green-100/80 hover:bg-green-200/80 text-green-600 rounded-lg transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = record.PDF_url;
                              link.download = `Examen_${exam?.nombre}_${formatDate(record.fecha_realizado)}.pdf`;
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 shadow-md p-4"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando {((currentPage - 1) * limit) + 1} - {Math.min(currentPage * limit, meta.totalExamRecords)} de {meta.totalExamRecords} registros
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-100/80 hover:bg-gray-200/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(page => (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                      page === currentPage
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === meta.totalPages}
                className="p-2 rounded-lg bg-gray-100/80 hover:bg-gray-200/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                whileHover={{ scale: currentPage === meta.totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === meta.totalPages ? 1 : 0.95 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredRecords.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron registros
            </h3>
            <p className="text-gray-600 mb-6">
              No hay registros de examen que coincidan con tu búsqueda o filtros.
            </p>
          </div>
        </motion.div>
      )}
    </NavigationLayout>
  )
}