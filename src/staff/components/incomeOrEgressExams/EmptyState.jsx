import { motion } from "framer-motion";
import { FileText, Plus } from "lucide-react";

export const EmptyState = ({ exams }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12 p-6 lg:p-8">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No hay exámenes registrados
        </h3>

        <p className="text-gray-500 mb-6 max-w-md">
            {exams.length === 0 
            ? 'Comienza agregando el primer examen de ingreso de un colaborador para llevar un control de su estado de salud inicial.'
            : 'No hay exámenes disponibles en este momento.'
            }
        </p>

        {exams.length === 0 && (
            <motion.button
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Plus className="w-5 h-5" />
                <span>Agregar Primer Examen</span>
            </motion.button>
        )}
    </div>
  )
}

