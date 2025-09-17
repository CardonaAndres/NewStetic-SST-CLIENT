import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExamCheckListModalForm } from './ExamCheckListModalForm';
import { router } from '../../../app/config/config';
import { IfCan } from "../../../admin/middlewares/IfCan";
import { User, Plus, Activity, ArrowLeft } from "lucide-react";

export const Header = ({ cc }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  return (
    <>
    <motion.div 
        className="mb-8" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              {/* Back Button */}
              <motion.button
                onClick={() => navigate(router.staff)}
                className="w-10 h-10 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Volver al listado de colaboradores"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              </motion.button>
              
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Listado De Exámenes
                    </h1>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="font-medium">CC: {cc}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Gestiona los exámenes médicos asignados a este colaborador
                </p>
              </div>
            </div>
            
            <IfCan permission="examChecklist.create" >
              <motion.button onClick={handleModal}
                className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              > 
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Agregar</span>
              </motion.button>
            </IfCan>

          </div>
        </div>
      </motion.div>

      <ExamCheckListModalForm open={modal} onClose={handleModal} />
    </>
  )
}