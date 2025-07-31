import { motion } from 'framer-motion';
import { Building2, CheckCircle, Edit3, XCircle } from 'lucide-react';

export const AreaTableItem = ({ area, index }) => {
  return (
    <motion.tr
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="hover:bg-gray-50/50 transition-colors duration-200"
    >
        <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                    <div className="font-semibold text-gray-900">{area.nombre}</div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4">
            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                area.estado === 'Activa' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
            }`}>
                {area.estado === 'Activa' ? (
                    <CheckCircle className="w-3 h-3" />
                ) : (
                    <XCircle className="w-3 h-3" />
                )}
                <span>{area.estado}</span>
            </div>
        </td>
        <td className="px-6 py-4">
            <div className="flex items-center justify-center space-x-2">
                <motion.button
                    className="p-2 bg-teal-100/80 hover:bg-teal-200/80 text-teal-600 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Edit3 className="w-4 h-4" />
                </motion.button>
            </div>
        </td>
    </motion.tr>
  )
}

