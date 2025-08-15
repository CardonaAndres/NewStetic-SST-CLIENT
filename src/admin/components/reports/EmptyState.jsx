import { motion } from 'framer-motion';
import { FileText, Filter } from 'lucide-react';

export const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay resultados</h3>
      <p className="text-gray-500 text-center max-w-md">
        Utiliza los filtros para buscar exámenes médicos específicos o ajusta los criterios de búsqueda.
      </p>
      <motion.div
        className="mt-4 flex items-center space-x-2 text-sm text-blue-600"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Filter className="w-4 h-4" />
        <span>Aplica filtros para ver resultados</span>
      </motion.div>
    </motion.div>
  );
};