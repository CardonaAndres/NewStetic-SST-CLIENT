import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Download, X, Eye, FileIcon } from 'lucide-react';

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
      <div className="bg-gradient-to-br from-white via-slate-50 to-gray-100 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl h-full relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="w-24 h-24 bg-gradient-to-br from-slate-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-gray-200/50"
          >
            <FileIcon className="w-12 h-12 text-gray-400" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text"
          >
            PDF No Disponible
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 max-w-md leading-relaxed"
          >
            No hay ningún documento PDF asociado a este registro en este momento.
          </motion.p>
          {onClose && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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

  const handleDownload = async () => {
    if (pdfUrl && pdfUrl !== 'SIN PDF') {
      try {
        const response = await fetch(pdfUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'documento.pdf';
        link.setAttribute('download', 'documento.pdf');
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error al descargar el PDF:', error);
        window.open(pdfUrl, '_blank');
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-gray-100 backdrop-blur-xl rounded-lg border border-white/40 shadow-2xl overflow-hidden h-full flex flex-col relative">
      
      {/* Modern Header */}
      {pdfUrl && pdfUrl !== 'SIN PDF' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-between p-5 border-b border-white/30 bg-white/60 backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Eye className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">Visor PDF</h3>

              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleDownload}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-blue-400/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Descargar PDF"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Descargar</span>
            </motion.button>
            
            {onClose && (
              <motion.button
                onClick={onClose}
                className="flex items-center justify-center w-12 h-12 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded-xl transition-all duration-300 border border-gray-200/50 hover:border-gray-300/70 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title="Cerrar visor"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* PDF Content Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50/50 to-white/80 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-3 border-blue-500/30 border-t-blue-500 rounded-full mb-6 shadow-lg"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Cargando documento</h4>
                <p className="text-gray-600">Por favor espera un momento...</p>
              </motion.div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              >
                <AlertCircle className="w-10 h-10 text-red-500" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Error al cargar</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
              <motion.button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Intentar de nuevo
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-full h-full p-2"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200/50 bg-white">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-0 bg-white"
                  title="Documento PDF"
                  onLoad={() => setLoading(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};