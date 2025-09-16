import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { router } from "../../app/config/config";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LoadingScreen } from '../../app/components/LoadingScreen';
import { NavigationLayout } from '../../app/layouts/NavigationLayout';
import { useExamCheckListHook } from '../hooks/useExamCheckListHook';
import { Activity } from "lucide-react";
import { Header } from "../components/examChekList/Header";
import { StatisticsCards } from "../components/examChekList/StatisticsCards";
import { FiltersAndSearch } from "../components/examChekList/FiltersAndSearch";
import { ItemListCard } from "../components/examChekList/ItemListCard";
import { useAuth } from "../../auth/context/AuthContext";
import { usePermissionsHook } from "../../admin/hooks/usePermissionsHook";

export const ExamCheckList = () => {
  const { userPermissions, loading: authLoading } = useAuth();
  const { loading: loadingPermissions, can } = usePermissionsHook();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, getCheckLiist, examChekList, getStatusConfig } = useExamCheckListHook();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRequired, setFilterRequired] = useState('all');

  useEffect(() => {
    if (!searchParams.get("cc")) navigate(router.staff);
    getCheckLiist(searchParams.get("cc"))
  }, [searchParams, navigate]);

  // Filtrar exámenes
  const filteredExams = examChekList?.filter(exam => {
    const matchesSearch = exam.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'bien' && exam.estado_examen === 'Bien') ||
                         (filterStatus === 'vencido' && exam.estado_examen === 'Vencido') ||
                         (filterStatus === 'proximo' && exam.estado_examen === 'Proximo a vencer') ||
                         (filterStatus === 'proceso' && exam.estado_examen === 'En proceso') ||
                         (filterStatus === 'accion' && exam.estado_examen === 'Requiere acción') ||
                         (filterStatus === 'pendiente' && exam.estado_examen === 'Pendiente') ||
                         (filterStatus === 'sin_info' && exam.estado_examen === 'Sin información') ||
                         (filterStatus === 'no_requerido' && exam.estado_examen === 'No requerido') ||
                         (filterStatus === 'active' && exam.esta_activo === 'Activo') ||
                         (filterStatus === 'inactive' && exam.esta_activo !== 'Activo');
    const matchesRequired = filterRequired === 'all' ||
                           (filterRequired === 'required' && exam.es_requerido === 'SI') ||
                           (filterRequired === 'optional' && exam.es_requerido === 'NO');
    
    return matchesSearch && matchesStatus && matchesRequired;
  }) || [];

  // Estadísticas detalladas
  const stats = {
    total: examChekList?.length || 0,
    bien: examChekList?.filter(exam => exam.estado_examen === 'Bien').length || 0,
    vencidos: examChekList?.filter(exam => exam.estado_examen === 'Vencido').length || 0,
    proximosVencer: examChekList?.filter(exam => exam.estado_examen === 'Proximo a vencer').length || 0,
    proceso: examChekList?.filter(exam => exam.estado_examen === 'En proceso').length || 0,
    requiereAccion: examChekList?.filter(exam => exam.estado_examen === 'Requiere acción').length || 0,
    pendientes: examChekList?.filter(exam => exam.estado_examen === 'Pendiente').length || 0,
    sinInfo: examChekList?.filter(exam => exam.estado_examen === 'Sin información').length || 0,
    required: examChekList?.filter(exam => exam.es_requerido === 'SI').length || 0
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <NavigationLayout title='Gestión De Examenes'>
      {/* Header */}
      <Header 
        cc={searchParams.get("cc")} 
        can={can}
        loading={authLoading || loadingPermissions}
        userPermissions={userPermissions}
      />

      <StatisticsCards stats={stats} />

      <FiltersAndSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} 
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterRequired={filterRequired}
        setFilterRequired={setFilterRequired}
      />
      
      {/* Exams Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredExams.map((exam, index) => {
            const statusConfig = getStatusConfig(exam);
            const StatusIcon = statusConfig.icon;
            
            return (
              <ItemListCard
                index={index}
                cardVariants={cardVariants}
                key={`${exam.cc_empleado}-${exam.nombre}-${index}`}
                statusConfig={statusConfig} 
                StatusIcon={StatusIcon}
                exam={exam}
                can={can}
                loading={authLoading || loadingPermissions}
                userPermissions={userPermissions}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredExams.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron exámenes
            </h3>
            <p className="text-gray-600 mb-6">
              No hay exámenes que coincidan con tu búsqueda o filtros para este colaborador.
            </p>
          </div>
        </motion.div>
      )}
    </NavigationLayout>
  );
};