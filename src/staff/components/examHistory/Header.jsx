import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, FileText, UserPlus, XCircle } from "lucide-react";
import { useState } from "react";
import { ExamFormModal } from "./ExamFormModal";

export const Header = ({ exam, meta, examRecords, getDaysRemaining }) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal)

  return (
    <motion.div 
        className="mb-8" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-6">
          {/* Navigation and Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100/50">
            <motion.button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 rounded-xl font-medium transition-all duration-200 self-start"
              whileHover={{ scale: 1.02, x: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </motion.button>

            <motion.button onClick={handleModal}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Registrar</span>
              <span className="sm:hidden">Registrar</span>
            </motion.button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {exam?.nombre || 'Examen'}
                  </h1>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 self-start ${
                    exam?.estado === 'Activo' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {exam?.estado === 'Activo' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    <span>{exam?.estado}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Es Requerido:</span>
                      <span className={`font-medium ${exam?.es_requerido === 'SI' ? 'text-red-600' : 'text-gray-700'}`}>
                        {exam?.es_requerido || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 min-w-0 lg:min-w-fit">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200/50">
                <div className="text-center">
                  <p className="text-xs font-medium text-blue-700">Total</p>
                  <p className="text-lg font-bold text-blue-900">{meta?.totalExamRecords || 0}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200/50">
                <div className="text-center">
                  <p className="text-xs font-medium text-green-700">Completados</p>
                  <p className="text-lg font-bold text-green-900">
                    {examRecords?.filter(r => r.estado === 'Completado').length || 0}
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 border border-yellow-200/50">
                <div className="text-center">
                  <p className="text-xs font-medium text-yellow-700">Pendientes</p>
                  <p className="text-lg font-bold text-yellow-900">
                    {examRecords?.filter(r => r.estado === 'Pendiente').length || 0}
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 border border-red-200/50">
                <div className="text-center">
                  <p className="text-xs font-medium text-red-700">Vencidos</p>
                  <p className="text-lg font-bold text-red-900">
                    {examRecords?.filter(r => {
                      const days = getDaysRemaining(r.fecha_vencimiento);
                      return r.estado === 'Pendiente' && days !== null && days < 0;
                    }).length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ExamFormModal open={modal} onClose={handleModal} />
        </div>
    </motion.div>
  )
}
