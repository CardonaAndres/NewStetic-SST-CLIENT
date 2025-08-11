import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, FileText, Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { LoadingScreen } from '../../../app/components/LoadingScreen';
import { useExamLogsHook } from '../../hooks/useExamLogsHook';

const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split('.')[0].split(':');

    const date = new Date(year, month - 1, day);

    return {
        date: date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }),
        time: `${hour}:${minute}`
    };
};

const getActionConfig = (accion) => {
    const configs = {
        'CREACIÓN': {
            icon: Plus,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'from-green-50 to-emerald-50',
            textColor: 'text-green-700',
            borderColor: 'border-green-200'
        },
        'ACTUALIZACIÓN': {
            icon: Edit,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'from-blue-50 to-blue-50',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-200'
        },
        'ELIMINACIÓN': {
            icon: Trash2,
            color: 'from-red-500 to-red-600',
            bgColor: 'from-red-50 to-red-50',
            textColor: 'text-red-700',
            borderColor: 'border-red-200'
        }
    };

    return configs[accion] || {
        icon: FileText,
        color: 'from-gray-500 to-gray-600',
        bgColor: 'from-gray-50 to-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200'
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

const itemVariants = {
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

export const ExamLogs = ({ checkListItemID, onClose }) => {
    const { loading, getLogs, examLogs } = useExamLogsHook();

    useEffect(() => {
        getLogs(checkListItemID, onClose);
    }, []);

    if(loading) return <LoadingScreen />

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 w-full max-w-4xl max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200/50 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Historial de Cambios
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        Registro de todas las modificaciones del examen
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </motion.button>
                        </div>

                        {/* Stats */}
                        <div className="mt-4 flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700">
                                    {examLogs.length} {examLogs.length === 1 ? 'cambio registrado' : 'cambios registrados'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        {examLogs.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No hay registros disponibles
                                </h3>
                                <p className="text-gray-500">
                                    No se encontraron cambios para este examen.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4"
                            >
                                {examLogs.map((log, index) => {
                                    const actionConfig = getActionConfig(log.accion);
                                    const ActionIcon = actionConfig.icon;
                                    const formattedDate = formatDate(log.fecha_accion);
                                    const isLast = index === examLogs.length - 1;

                                    return (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className={`relative bg-gradient-to-r ${actionConfig.bgColor} border ${actionConfig.borderColor} rounded-xl p-6 group hover:shadow-lg transition-all duration-300`}
                                        >
                                            {/* Timeline Line */}
                                            {!isLast && (
                                                <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent"></div>
                                            )}

                                            <div className="flex items-start space-x-4">
                                                {/* Action Icon */}
                                                <div className={`w-12 h-12 bg-gradient-to-r ${actionConfig.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                                    <ActionIcon className="w-6 h-6 text-white" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className={`text-lg font-bold ${actionConfig.textColor} mb-1`}>
                                                                {log.accion}
                                                            </h3>
                                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                                <div className="flex items-center space-x-1">
                                                                    <User className="w-4 h-4" />
                                                                    <span className="font-medium">
                                                                        {log.usuario_responsable}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center space-x-1">
                                                                    <Calendar className="w-4 h-4" />
                                                                    <span>
                                                                        {formattedDate.date}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center space-x-1">
                                                                    <Clock className="w-4 h-4" />
                                                                    <span>
                                                                        {formattedDate.time}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Observaciones */}
                                                    {log.observaciones && (
                                                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                                                            <div className="flex items-start space-x-2">
                                                                <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                                                        Observaciones:
                                                                    </p>
                                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                                        {log.observaciones}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}