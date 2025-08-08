import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, AlertCircle } from 'lucide-react';

export const PDFViewer = ({ pdfUrl, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pdfUrl) {
      setLoading(true);
      setError(null);
      
      const loadTimeout = setTimeout(() => {
        if (pdfUrl === 'SIN PDF' || !pdfUrl) {
          setError('No hay PDF disponible');
        } else {
          setLoading(false);
        }
      }, 500);

      return () => clearTimeout(loadTimeout);
    }
  }, [pdfUrl]);

  if (!pdfUrl || pdfUrl === 'SIN PDF') {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg h-full">
        <div className="flex flex-col items-center justify-center h-full p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            PDF No Disponible
          </h3>
          <p className="text-gray-600 mb-6">
            No hay ningún documento PDF asociado a este registro.
          </p>
          {onClose && (
            <motion.button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cerrar
            </motion.button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden h-full flex flex-col">

      {/* PDF Content */}
      <div className="relative bg-gray-100/50 flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mb-4"
              />
              <p className="text-gray-600 font-medium">Cargando documento...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar PDF</h3>
              <p className="text-gray-600 mb-4">{error}</p>
            </motion.div>
          ) : (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full h-full p-4"
            >
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                className="w-full h-full border-0 rounded-lg shadow-2xl bg-white"
                title="Documento PDF"
                onLoad={() => setLoading(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};