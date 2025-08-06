import { motion } from 'framer-motion';
import { 
    CalendarClock, 
    Clock, 
    Download, 
    Eye, 
    FileText, 
    FileX, 
    MessageSquare,
    Calendar,  
    Edit3
} from 'lucide-react';
import { useState } from 'react';
import { ExamFormModal } from './ExamFormModal';

export const ExamHistoryCard = ({ 
    status, 
    cardVariants, 
    formatDate, 
    StatusIcon,
    daysRemaining,
    record
}) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  return (
    <motion.div
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
                    >
                        <Download className="w-4 h-4" />
                    </motion.button>
                </>
                )}
                <motion.button
                        onClick={handleModal}
                        className="p-2 bg-green-400 hover:bg-green-400/80 text-white rounded-lg transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Edit3 className="w-4 h-4" />
                </motion.button>
            </div>
            </div>
        </div>
        <ExamFormModal open={modal} onClose={handleModal} recordData={record} />
        </div>
    </motion.div>
  )
}

