import { useState } from 'react';
import { StatusBadge } from './StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { PDFViewerModal } from '../../../staff/components/examHistory/PDFViewerModal';
import { 
  FileText, 
  Calendar, 
  User, 
  X,
  ExternalLink,
  Info,
  Building,
  Mail,
  MapPin,
  Briefcase,
  Clock,
  IdCard,
  Users
} from 'lucide-react';

export const ExamModal = ({ selectedExam, isModalOpen, onClose }) => {
  
  if (!selectedExam || !isModalOpen) return null;

  const [PDFModal, setPDFModal] = useState(false);
  const handlePDFModal = () => setPDFModal(!PDFModal);
  const isOverdue = selectedExam.fecha_vencimiento && new Date(selectedExam.fecha_vencimiento) < new Date();

  const hasPDF = selectedExam.PDF_url && selectedExam.PDF_url !== 'SIN PDF';
  const isIngresoOrEgreso = ['Ingreso', 'Egreso'].includes(selectedExam.tipo_examen);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSimpleDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return 'N/A';
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 9);
    return new Date(`${year}-${month}-${day}`).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateAge = (birthDate) => {
    if (!birthDate || birthDate.length !== 8) return 'N/A';
    const today = new Date();
    const birth = new Date(
      birthDate.substring(0, 4),
      birthDate.substring(4, 6) - 1,
      birthDate.substring(6, 8)
    );
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
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
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/40"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600`}>
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Examen Médico Ocupacional</h2>
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
            {/* Estado y badges */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <StatusBadge status={selectedExam.estado_item} size="md" />
              <div className="flex items-center gap-2 flex-wrap">
                {!isIngresoOrEgreso && selectedExam.es_requerido === 'SI' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    Requerido
                  </span>
                )}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedExam.estado_empleado === 'ACTIVO' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedExam.estado_empleado}
                </span>
              </div>
            </div>

            {/* Información del empleado */}
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Información del Empleado
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nombre Completo</p>
                  <p className="text-lg font-medium text-gray-900">{selectedExam.Nombre || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cédula</p>
                  <p className="text-lg font-mono font-medium text-gray-900">{selectedExam.cc_empleado}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Edad</p>
                  <p className="text-lg font-medium text-gray-900"> 
                    {selectedExam["Fecha de nacimiento"] && (
                      <span >
                        {calculateAge(selectedExam["Fecha de nacimiento"])} años
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Género</p>
                  <p className="text-lg font-medium text-gray-900">{selectedExam.Genero || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Correo
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {selectedExam["Correo Electronico"] || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Ciudad
                  </p>
                  <p className="text-lg font-medium text-gray-900">{selectedExam.Ciudad || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Información laboral */}
            <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Información Laboral
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    Empresa
                  </p>
                  <p className="text-lg font-medium text-gray-900">{selectedExam.Empresa || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cargo</p>
                  <p className="text-lg font-medium text-gray-900">{selectedExam["Desc. Cargo"] || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de Ingreso</p>
                  <p className="text-lg font-medium text-gray-900">
                    {formatSimpleDate(selectedExam["Fecha de ingreso"])}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Centro de Costos</p>
                  <p className="text-lg font-medium text-gray-900">{selectedExam["Centro de costos"] || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Grupo
                  </p>
                  <p className="text-lg font-medium text-gray-900">{selectedExam["Grupo empleado"] || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <IdCard className="w-4 h-4 mr-1" />
                    Tipo de Contrato
                  </p>
                  <p className="text-lg font-medium text-gray-900">{selectedExam["Tipo de contrato"] || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Fechas del examen */}
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
              
              {!isIngresoOrEgreso && (
                <div className={`rounded-2xl p-4 ${isOverdue ? 'bg-red-50/80' : 'bg-blue-50/80'}`}>
                  <h4 className={`text-sm font-semibold mb-2 flex items-center ${isOverdue ? 'text-red-700' : 'text-blue-700'}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Fecha Vencimiento
                  </h4>
                  <p className={`text-lg font-medium ${isOverdue ? 'text-red-900' : 'text-blue-900'}`}>
                    {formatDate(selectedExam.fecha_vencimiento)}
                  </p>
                </div>
              )}
            </div>

            {/* Información adicional (solo para exámenes que no son ingreso/egreso) */}
            {!isIngresoOrEgreso && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50/80 rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Frecuencia
                  </h4>
                  <p className="text-lg text-gray-900 font-medium">{selectedExam.frecuencia_dias} días</p>
                </div>
                <div className="bg-gray-50/80 rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Estado del Tipo de Examen</h4>
                  <p className="text-lg text-gray-900 font-medium">{selectedExam.estado_tipo_examen || 'N/A'}</p>
                </div>
              </div>
            )}

            {/* Observaciones */}
            {selectedExam.observaciones && selectedExam.observaciones.trim() && (
              <div className="bg-amber-50/80 rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-amber-700 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Observaciones
                </h4>
                <p className="text-amber-900 leading-relaxed">{selectedExam.observaciones}</p>
              </div>
            )}

            {/* Acciones */}
            <div className="flex items-center justify-center pt-4 border-t border-gray-200/50">
              {hasPDF ? (
                <motion.button
                  onClick={handlePDFModal}
                  className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Ver Documento PDF</span>
                </motion.button>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-2">No hay documento PDF disponible</p>
                  <p className="text-sm text-gray-400">El documento puede estar siendo procesado</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

        {PDFModal && (
          <AnimatePresence>
            <PDFViewerModal exam={selectedExam} open={PDFModal} onClose={handlePDFModal} />
          </AnimatePresence>
        )}
    </AnimatePresence>
  );
};