import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export const ResultsHeader = ({ meta }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-between p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900">Resultados del Reporte</h2>
        <p className="text-gray-600 text-sm mt-1">
          {meta?.totalRegisters} exámenes encontrados
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <motion.button
          onClick={() => window.location.reload()}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Actualizar</span>
        </motion.button>
      </div>
    </motion.div>
  );
};