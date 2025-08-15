import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  User, 
  X,
  ExternalLink,
  Info
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const ExamModal = ({ selectedExam, isModalOpen, onClose }) => {
  if (!selectedExam || !isModalOpen) return null;

  const isOverdue = selectedExam.estado_item === 'Vencido';
  const hasPDF = selectedExam.PDF_url && selectedExam.PDF_url !== 'SIN PDF';

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/40"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isOverdue ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}>
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Detalles del Examen</h2>
                <p className="text-gray-600 text-sm">{selectedExam.tipo_examen}</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Contenido del modal */}
          <div className="p-6 space-y-6">
            {/* Estado y tipo */}
            <div className="flex items-center justify-between">
              <StatusBadge status={selectedExam.estado_item} size="md" />
              {selectedExam.es_requerido === 'SI' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Requerido
                </span>
              )}
            </div>

            {/* Información del empleado */}
            <div className="bg-gray-50/80 rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Información del Empleado
              </h3>
              <div className="text-lg font-mono text-gray-900">
                CC: {selectedExam.cc_empleado}
              </div>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50/80 rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Fecha Realizado
                </h4>
                <p className="text-lg text-green-900 font-medium">
                  {formatDate(selectedExam.fecha_realizado)}
                </p>
              </div>
              <div className={`rounded-2xl p-4 ${isOverdue ? 'bg-red-50/80' : 'bg-blue-50/80'}`}>
                <h4 className={`text-sm font-semibold mb-2 flex items-center ${isOverdue ? 'text-red-700' : 'text-blue-700'}`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Fecha Vencimiento
                </h4>
                <p className={`text-lg font-medium ${isOverdue ? 'text-red-900' : 'text-blue-900'}`}>
                  {formatDate(selectedExam.fecha_vencimiento)}
                </p>
              </div>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50/80 rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Frecuencia</h4>
                <p className="text-lg text-gray-900 font-medium">{selectedExam.frecuencia_dias} días</p>
              </div>
              <div className="bg-gray-50/80 rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Estado del Tipo de Examen</h4>
                <p className="text-lg text-gray-900 font-medium">{selectedExam.estado_tipo_examen}</p>
              </div>
            </div>

            {/* Observaciones */}
            {selectedExam.observaciones && selectedExam.observaciones.trim() && (
              <div className="bg-blue-50/80 rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Observaciones
                </h4>
                <p className="text-blue-900 leading-relaxed">{selectedExam.observaciones}</p>
              </div>
            )}

            {/* Acciones */}
            <div className="flex items-center justify-center pt-4">
              {hasPDF ? (
                <motion.button
                  onClick={() => window.open(selectedExam.PDF_url, '_blank')}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Ver Documento PDF</span>
                </motion.button>
              ) : (
                <p className="text-gray-500 text-center py-4">No hay documento PDF disponible</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};