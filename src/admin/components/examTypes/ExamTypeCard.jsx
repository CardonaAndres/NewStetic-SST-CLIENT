import { useState } from 'react';
import { ExamTypeFormModal } from './ExamTypeFormModal';
import { motion } from 'framer-motion';
import { Edit3, FileText, CheckCircle, XCircle  } from 'lucide-react';

export const ExamTypeCard = ({ examType, cardVariants }) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  return (
    <motion.div  variants={cardVariants} className="group" whileHover={{ y: -8 }}>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
            {/* Card Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                    examType.estado === 'Activo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                    {examType.estado === 'Activo' ? (
                        <CheckCircle className="w-3 h-3" />
                    ) : (
                        <XCircle className="w-3 h-3" />
                    )}
                    <span>{examType.estado}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {examType.nombre}
                </h3>
            
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Tipo:</span>
                    <span className="font-medium text-gray-700">{examType.tipo_examen}</span>
                    </div>
                </div>
            </div>

            {/* Card Actions */}
            <div className="px-6 pb-6">
                {!['Ingreso', 'Egreso'].includes(examType.nombre) && (
                    <div className="flex items-center space-x-2">
                        <motion.button onClick={handleModal}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100/80 hover:bg-blue-200/80 text-blue-700 rounded-lg transition-all duration-200 text-sm font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            >
                            <Edit3 className="w-4 h-4" />
                            <span>Editar</span>
                        </motion.button>
                    </div>
                )}  
            </div>
        </div>
        <ExamTypeFormModal open={modal} onClose={handleModal} examTypeData={examType} />
    </motion.div>
  )
}


