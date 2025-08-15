import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export const Pagination = ({ meta, currentPage, onPageChange }) => {
  if (!meta || meta.totalPages <= 1) return null;

  const getVisiblePages = () => {
    const totalPages = meta.totalPages;
    const current = currentPage;
    const delta = 2;
    
    let start = Math.max(1, current - delta);
    let end = Math.min(totalPages, current + delta);
    
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(totalPages, start + 4);
      } else {
        start = Math.max(1, end - 4);
      }
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-between mt-8 px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg">
      {/* Información de paginación */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span>Mostrando</span>
        <span className="font-semibold text-gray-900">
          {((currentPage - 1) * meta.limit) + 1}
        </span>
        <span>a</span>
        <span className="font-semibold text-gray-900">
          {Math.min(currentPage * meta.limit, meta.totalRegisters)}
        </span>
        <span>de</span>
        <span className="font-semibold text-gray-900">{meta.totalRegisters}</span>
        <span>resultados</span>
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center space-x-2">
        {/* Botón anterior */}
        <motion.button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`p-2 rounded-lg transition-all duration-200 ${
            currentPage <= 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Primera página */}
        {visiblePages[0] > 1 && (
          <>
            <motion.button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              1
            </motion.button>
            {visiblePages[0] > 2 && (
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            )}
          </>
        )}

        {/* Páginas visibles */}
        {visiblePages.map(page => (
          <motion.button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              page === currentPage
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {page}
          </motion.button>
        ))}

        {/* Última página */}
        {visiblePages[visiblePages.length - 1] < meta.totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < meta.totalPages - 1 && (
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            )}
            <motion.button
              onClick={() => onPageChange(meta.totalPages)}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {meta.totalPages}
            </motion.button>
          </>
        )}

        {/* Botón siguiente */}
        <motion.button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= meta.totalPages}
          className={`p-2 rounded-lg transition-all duration-200 ${
            currentPage >= meta.totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          whileHover={currentPage < meta.totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage < meta.totalPages ? { scale: 0.95 } : {}}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};