import { motion } from 'framer-motion';
import { FileText, User, Calendar } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const ExamRow = ({ result, index, onExamClick }) => {
  // Corregir la lógica - usar result en lugar de onExamClick para los datos
  const isOverdue = result.fecha_vencimiento && new Date(result.fecha_vencimiento) < new Date();
  const isIngresoOrEgreso = ['Ingreso', 'Egreso'].includes(result.tipo_examen);

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
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={`hover:bg-gray-50/80 transition-all duration-200 cursor-pointer ${
        isOverdue && !isIngresoOrEgreso ? 'bg-red-50/30' : ''
      }`}
      onClick={() => onExamClick(result)}
    >
      {/* Tipo de Examen */}
      <td className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isOverdue && !isIngresoOrEgreso ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}>
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900 truncate" title={result.tipo_examen}>
              {result.tipo_examen}
            </div>
            {result.es_requerido === 'SI' && (
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full mt-1">
                Requerido
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Estado */}
      <td className="px-4 py-4">
        <StatusBadge status={result.estado_item} />
      </td>

      {/* Empleado (CC) */}
      <td className="px-4 py-4">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm font-mono text-gray-900 truncate">{result.cc_empleado}</span>
        </div>
      </td>

      {/* Fecha Vencimiento - Solo mostrar si NO es Ingreso o Egreso */}
      {!isIngresoOrEgreso && (
        <td className="px-4 py-4">
          <div className="flex items-center space-x-2">
            <Calendar className={`w-4 h-4 flex-shrink-0 ${isOverdue ? 'text-red-500' : 'text-blue-500'}`} />
            <span className={`text-sm truncate ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
              {formatDate(result.fecha_vencimiento)}
            </span>
          </div>
        </td>
      )}

      {isIngresoOrEgreso && (
        <td className="px-4 py-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 flex-shrink-0 text-green-500" />
            <span className="text-sm text-gray-900 truncate">
              N / A
            </span>
          </div>
        </td>
      )}

    </motion.tr>
  );
};