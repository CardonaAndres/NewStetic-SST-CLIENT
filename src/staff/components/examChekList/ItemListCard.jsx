import { useState } from "react";
import { motion } from "framer-motion";
import { ExamCheckListModalForm } from "./ExamCheckListModalForm";
import { router } from "../../../app/config/config";
import { 
  CheckCircle, 
  Edit3, 
  Eye, 
  FileText, 
  Shield, 
  XCircle, 
  Clock, 
  Calendar, 
  AlertTriangle,
  Info,
  Activity
} from "lucide-react";

export const ItemListCard = ({ statusConfig, StatusIcon, cardVariants, exam, index }) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  const navigateToDetails = () => {
   window.location.href = `${router.examHistory}?cc=${exam.cc_empleado}&checklistID=${exam.checklist_id}`
  }

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Función para calcular días restantes
  const getDaysUntilExpiration = (dateString) => {
    if (!dateString) return null;
    const today = new Date();
    const expirationDate = new Date(dateString);
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Función para obtener el color del estado según los días restantes
  const getExpirationColor = (days) => {
    if (days === null) return 'text-gray-500';
    if (days <= 0) return 'text-red-600';
    if (days <= 7) return 'text-red-500';
    if (days <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Función para obtener el ícono del último estado
  const getLastStatusIcon = (estado) => {
    const iconMap = {
      'Completado': CheckCircle,
      'Aprobado': CheckCircle,
      'Pendiente': Clock,
      'Procesando': Activity,
      'En revisión': Eye,
      'Rechazado': XCircle,
      'Observado': AlertTriangle,
      'Expirado': XCircle,
      'Programado': Calendar,
      'No requerido': Info,
      'En espera': Clock,
      'Cancelado': XCircle,
      'Reprogramado': Calendar
    };
    return iconMap[estado] || Info;
  };

  const daysUntilExpiration = getDaysUntilExpiration(exam.proxima_fecha_vencimiento);
  const LastStatusIcon = getLastStatusIcon(exam.ultimo_estado);

  return (
    <motion.div
      variants={cardVariants}
      className="group"
      whileHover={{ y: -8 }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${statusConfig.gradient} rounded-xl flex items-center justify-center relative`}>
              <FileText className="w-6 h-6 text-white" />
              {/* Badge con total de items */}
              {exam.total_items > 0 && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {exam.total_items}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusConfig.bg} ${statusConfig.color}`}>
                <StatusIcon className="w-3 h-3" />
                <span>{statusConfig.label}</span>
              </div>
              
              {exam.es_requerido === 'SI' && (
                <div className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Requerido</span>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {exam.nombre}
          </h3>
          
          <p className="text-sm text-gray-500 mb-4">
            {statusConfig.description}
          </p>
          
          <div className="space-y-3">
            {/* Estado actual */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Estado:</span>
              <div className={`flex items-center space-x-1 ${exam.esta_activo === 'Activo' ? 'text-green-600' : 'text-gray-600'}`}>
                {exam.esta_activo === 'Activo' ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <XCircle className="w-3 h-3" />
                )}
                <span className="font-medium">{exam.esta_activo}</span>
              </div>
            </div>

            {/* Último estado si existe */}
            {exam.ultimo_estado && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Último estado:</span>
                <div className="flex items-center space-x-1 text-gray-700">
                  <LastStatusIcon className="w-3 h-3" />
                  <span className="font-medium">{exam.ultimo_estado}</span>
                </div>
              </div>
            )}

            {/* Total de items */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Historial:</span>
              <div className="flex items-center space-x-1 text-blue-600">
                <Activity className="w-3 h-3" />
                <span className="font-medium">{exam.total_items} registro{exam.total_items !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Próxima fecha de vencimiento */}
            {exam.proxima_fecha_vencimiento && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Próximo vencimiento:</span>
                <div className={`flex items-center space-x-1 ${getExpirationColor(daysUntilExpiration)}`}>
                  <Calendar className="w-3 h-3" />
                  <div className="text-right">
                    <div className="font-medium">{formatDate(exam.proxima_fecha_vencimiento)}</div>
                    {daysUntilExpiration !== null && (
                      <div className="text-xs">
                        {daysUntilExpiration > 0 
                          ? `${daysUntilExpiration} día${daysUntilExpiration !== 1 ? 's' : ''} restante${daysUntilExpiration !== 1 ? 's' : ''}`
                          : daysUntilExpiration === 0 
                            ? 'Vence hoy' 
                            : `Vencido hace ${Math.abs(daysUntilExpiration)} día${Math.abs(daysUntilExpiration) !== 1 ? 's' : ''}`
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alerta de vencimiento próximo */}
        {daysUntilExpiration !== null && daysUntilExpiration <= 30 && daysUntilExpiration > 0 && (
          <div className="mx-6 mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800 font-medium">
                {daysUntilExpiration <= 7 ? 'Vencimiento inminente' : 'Próximo a vencer'}
              </span>
            </div>
          </div>
        )}

        {/* Alerta de vencimiento */}
        {daysUntilExpiration !== null && daysUntilExpiration <= 0 && (
          <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-800 font-medium">
                {daysUntilExpiration === 0 ? 'Vence hoy' : 'Examen vencido'}
              </span>
            </div>
          </div>
        )}

        {/* Card Actions */}
        <div className="px-6 pb-6">
          <div className="flex items-center space-x-2">
            <motion.button onClick={navigateToDetails}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 rounded-lg transition-all duration-200 text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              <span>Detalles</span>
            </motion.button>
            
            <motion.button 
              onClick={handleModal}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100/80 hover:bg-blue-200/80 text-blue-700 rounded-lg transition-all duration-200 text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit3 className="w-4 h-4" />
              <span>Gestionar</span>
            </motion.button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="h-2 bg-gray-100">
          <motion.div 
            className={`h-full bg-gradient-to-r ${statusConfig.gradient} transition-all duration-500`}
            initial={{ width: 0 }}
            animate={{ width: `${statusConfig.progress}%` }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
          />
        </div>
      </div>

      <ExamCheckListModalForm open={modal} onClose={handleModal} examCheckListItemData={exam} />
    </motion.div>   
  );
};