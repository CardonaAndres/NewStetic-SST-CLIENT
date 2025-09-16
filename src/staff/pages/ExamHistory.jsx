import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useExamRecordsHook } from '../hooks/useExamRecordsHook';
import { NavigationLayout } from '../../app/layouts/NavigationLayout';
import { LoadingScreen } from '../../app/components/LoadingScreen';
import { Header } from '../components/examHistory/Header';
import { FiltersAndSearch } from '../components/examHistory/FiltersAndSearch';
import { ExamHistoryCard } from '../components/examHistory/ExamHistoryCard';
import { usePermissionsHook } from '../../admin/hooks/usePermissionsHook';
import { useAuth } from '../../auth/context/AuthContext';
import {
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

export const ExamHistory = () => {
  const [ searchParams ] = useSearchParams();

  const { userPermissions, loading: authLoading } = useAuth();
  const { loading: loadingPermissions, can } = usePermissionsHook();
  
  const { loading, getExamRecords, examRecords, exam, meta } = useExamRecordsHook();
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ limit, setLimit ] = useState(() => {
    const storedLimit = sessionStorage.getItem('examRecords_limit');
    return storedLimit ? parseInt(storedLimit, 10) : 15;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
    return diffDays - 1;
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

  if(loading || authLoading || loadingPermissions) return <LoadingScreen />

  return (
    <NavigationLayout title={`Historial del examen - ${exam?.nombre || 'Cargando...'}`}>
      {/* Header del Examen */}
      <Header 
        exam={exam} 
        meta={meta} 
        examRecords={examRecords} 
        getDaysRemaining={getDaysRemaining}
        userPermissions={userPermissions}
        loadingPermission={authLoading || loadingPermissions}
        can={can}
      />

      {/* Filters and Search */}
      <FiltersAndSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        handleLimitChange={handleLimitChange}
        limit={limit}
    />

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
              <ExamHistoryCard 
                key={index} 
                status={status}
                formatDate={formatDate}
                StatusIcon={StatusIcon}
                daysRemaining={daysRemaining}
                record={record}
                cardVariants={cardVariants}
                userPermissions={userPermissions}
                loadingPermission={authLoading || loadingPermissions}
                can={can}
              />
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