import { useState } from 'react';
import { motion } from 'framer-motion'
import { CheckCircle, Edit3, XCircle, FileText } from "lucide-react"
import { ExamTypeFormModal } from './ExamTypeFormModal';

export const ExamTypeItemTable = ({ examType, index }) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  return (
    <motion.tr                
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="hover:bg-gray-50/50 transition-colors duration-200"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{examType.nombre}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-700 font-medium">
        {examType.tipo_examen}
      </td>
      <td className="px-6 py-4">
        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
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
      </td>
      <td className="px-6 py-4">
        {!['Ingreso', 'Egreso'].includes(examType.nombre) && (
          <div className="flex items-center justify-center space-x-2">
            <motion.button onClick={handleModal}
              className="p-2 bg-blue-100/80 hover:bg-blue-200/80 text-blue-600 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit3 className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </td>

      <ExamTypeFormModal open={modal} onClose={handleModal} examTypeData={examType} />
    </motion.tr>
  )
}

