import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText } from 'lucide-react';
import { FormModal } from './FormModal';
import { useSearchParams, useLocation } from 'react-router-dom';
import { router } from '../../../app/config/config';

export const Header = ({ total = 0 }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  const title = location.pathname === router.incomeExam ? 'Ingreso' : 'Egreso';
  
  return (
    <motion.div 
        className="mb-8" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Side - Title and Description */}
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Exámenes de {title}
                </h1>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50 min-w-0">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">Total de exámenes</p>
                  <p className="text-2xl font-bold text-gray-900"> {total} </p>
                  <p className="text-xs text-gray-500">Este mes</p>
                </div>
              </div>

              {/* Add Button */}
              <motion.button onClick={handleModal}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl group min-w-fit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-5 h-5"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-5 h-5" />
                </motion.div>
                <span className="whitespace-nowrap">Nuevo Examen</span>
              </motion.button>
            </div>
          </div>
        </div>

        <FormModal open={modal} onClose={handleModal} cc={searchParams.get("cc")} />
    </motion.div>
  )
}