import { motion } from "framer-motion";
import { CheckCircle, Edit3, Eye, FileText, Shield, XCircle } from "lucide-react";

export const ItemListCard = ({ statusConfig, StatusIcon, cardVariants, exam, index }) => {
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
                    <div className={`w-12 h-12 bg-gradient-to-r ${statusConfig.gradient} rounded-xl flex items-center justify-center`}>
                    <FileText className="w-6 h-6 text-white" />
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
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Estado del Tipo:</span>
                    <div className={`flex items-center space-x-1 ${exam.estado_tipo_examen === 'Activo' ? 'text-green-600' : 'text-gray-600'}`}>
                        {exam.estado_tipo_examen === 'Activo' ? (
                        <CheckCircle className="w-3 h-3" />
                        ) : (
                        <XCircle className="w-3 h-3" />
                        )}
                        <span className="font-medium">{exam.estado_tipo_examen}</span>
                    </div>
                    </div>
                    
                </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6">
                <div className="flex items-center space-x-2">
                    <motion.button
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 rounded-lg transition-all duration-200 text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    >
                    <Eye className="w-4 h-4" />
                    <span>Ver Detalles</span>
                    </motion.button>
                    
                    <motion.button
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
        </motion.div>   
  )
}


