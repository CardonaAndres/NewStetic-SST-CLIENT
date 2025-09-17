import { useState } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import { PDFViewerModal } from '../examHistory/PDFViewerModal';
import { ExamDeleteFormModal } from '../examHistory/ExamDeleteFormModal';
import { ExamLogsModal } from "../examHistory/ExamLogsModal";
import { FormModal } from "./FormModal";
import { IfCan } from "../../../admin/middlewares/IfCan";
import { 
    FileText, 
    Calendar, 
    User, 
    ChevronDown, 
    ChevronUp, 
    Eye, 
    Edit, 
    Trash2, 
    List 
} from 'lucide-react';

export const ExamCard = ({ 
    index, 
    exam, 
    StatusIcon, 
    getStatusColor, 
    formatDate, 
    isExpanded, 
    examId,
    toggleCardExpansion,
}) => {
  const [formModal, setFormModal] = useState(false);
  const [PDFViewer, setPDFViewer] = useState(false); 
  const [logsModal, setLogsModal] = useState(false);
  const [modalOnDelete, setModalOnDelete] = useState(false);

  const handleFormModal = () => setFormModal(!formModal);
  const handleLogsClick = () => setLogsModal(!logsModal);
  const handleDelete = () => setModalOnDelete(!modalOnDelete); 
  const handlePDFClick = () => setPDFViewer(!PDFViewer);

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="group hover:bg-gray-50/50 transition-all duration-200"
    >
        {/* Card Content */}
        <div className="p-6">
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                {/* Left Side - Main Info */}
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-600" />
                    </div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                        CC: {exam.cc_empleado}
                        </h3>
                        <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getStatusColor(exam.estado_item)} text-white text-sm font-medium flex items-center space-x-1.5 flex-shrink-0`}>
                        <StatusIcon className={`w-4 h-4 ${exam.estado_item.toLowerCase() === 'procesando' ? 'animate-spin' : ''}`} />
                        <span>{exam.estado_item}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600 gap-2 sm:gap-0">
                        <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">{exam.tipo_examen}</span>
                        </div>
                        <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{formatDate(exam.fecha_realizado)}</span>
                        </div>
                    </div>
                    </div>
                </div>

            {/* Right Side - Actions */}
            <div className="flex items-center space-x-2 flex-shrink-0">
                
                {exam.PDF_url && exam.PDF_url !== 'SIN PDF' ? (
                <motion.button onClick={handlePDFClick}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Eye className="w-4 h-4" />
                </motion.button>
                ) : (
                <span className="text-xs text-gray-400 px-3 py-2 bg-gray-100 rounded-xl">
                    Sin PDF
                </span>
                )}

                <IfCan permission="examRecords.update">
                    <motion.button onClick={handleFormModal}
                        className="flex items-center space-x-1 px-3 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-200 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Edit className="w-4 h-4" />
                    </motion.button>
                </IfCan>

                <motion.button onClick={handleLogsClick}
                    className="flex items-center space-x-1 px-3 py-2 bg-violet-100 text-violet-700 rounded-xl text-sm font-medium hover:bg-violet-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <List className="w-4 h-4" />
                </motion.button>

                <IfCan permission="examRecords.delete" >
                    <motion.button onClick={handleDelete}
                        className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                </IfCan>


                <motion.button
                    onClick={() => toggleCardExpansion(examId)}
                    className="flex items-center space-x-2 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                <span className="hidden sm:inline">
                    {isExpanded ? 'Menos' : 'Más'}
                </span>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                ) : (
                    <ChevronDown className="w-4 h-4" />
                )}
                </motion.button>
            </div>
            </div>

            {/* Quick Observations Preview */}
            {!isExpanded && exam.observaciones && exam.observaciones !== 'Sin observaciones' && (
            <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                <p className="text-sm text-gray-600 line-clamp-2">
                <span className="font-medium text-gray-700">Observaciones: </span>
                {exam.observaciones}
                </p>
            </div>
            )}

            {/* Expanded Details */}
            <AnimatePresence>
            {isExpanded && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-100"
                >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Details */}
                    <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">
                        Información del Empleado
                        </label>
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                        <p className="text-lg font-bold text-gray-900 mb-1">
                            CC: {exam.cc_empleado}
                        </p>
                        <p className="text-sm text-gray-600">
                            Cédula de ciudadanía del colaborador
                        </p>
                        </div>
                    </div>
                    
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">
                        Tipo de Examen
                        </label>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                        <p className="text-lg font-bold text-emerald-900 mb-1">
                            {exam.tipo_examen}
                        </p>
                        <p className="text-sm text-emerald-600">
                            Examen médico ocupacional
                        </p>
                        </div>
                    </div>
                    </div>

                    {/* Right Column - Status & Date */}
                    <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">
                        Estado Actual
                        </label>
                        <div className={`bg-gradient-to-r ${getStatusColor(exam.estado_item)} rounded-xl p-4`}>
                        <div className="flex items-center space-x-3 text-white">
                            <StatusIcon className={`w-6 h-6 ${exam.estado_item.toLowerCase() === 'procesando' ? 'animate-spin' : ''}`} />
                            <div>
                            <p className="text-lg font-bold">{exam.estado_item}</p>
                            <p className="text-sm opacity-90">
                                Estado del proceso
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">
                        Fecha de Realización
                        </label>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-lg font-bold text-blue-900 mb-1">
                            {formatDate(exam.fecha_realizado)}
                        </p>
                        <p className="text-sm text-blue-600">
                            Fecha de realización del examen
                        </p>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Full Observations */}
                <div className="mt-6">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Observaciones Completas
                    </label>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {exam.observaciones || 'Sin observaciones registradas para este examen.'}
                    </p>
                    </div>
                </div>

                </motion.div>
            )}
            </AnimatePresence>
        </div>

        <FormModal onClose={handleFormModal} open={formModal} exam={exam} />

        <PDFViewerModal exam={exam} open={PDFViewer} onClose={handlePDFClick} />

        <ExamDeleteFormModal 
            itemID={exam.checklist_item_id} 
            open={modalOnDelete}
            onClose={handleDelete}
        />

        <ExamLogsModal 
            open={logsModal} 
            onClose={handleLogsClick} 
            checkListItemID={exam.checklist_item_id} 
        />

    </motion.div>
  )
}