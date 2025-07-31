import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaFormModal } from './AreaFormModal';
import { Building2, CheckCircle, Edit3, XCircle } from 'lucide-react';

export const AreaCard = ({ area, cardVariants }) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  return (
    <motion.div                        
        variants={cardVariants}
        className="group h-full"
        whileHover={{ y: -8 }}
    >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
            {/* Card Header - Flex grow para ocupar espacio disponible */}
            <div className="p-6 pb-4 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
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
                </div>

                {/* Título con altura fija para mantener consistencia */}
                <div className="flex-grow flex items-start">
                    <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors leading-tight">
                        {area.nombre}
                    </h3>
                </div>
            </div>

            {/* Card Actions - Siempre en la parte inferior */}
            <div className="px-6 pb-6 mt-auto">
                <div className="flex items-center space-x-2">
                    <motion.button onClick={handleModal}
                        className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-teal-100/80 hover:bg-teal-200/80 text-teal-700 rounded-lg transition-all duration-200 text-sm font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Edit3 className="w-4 h-4" />
                        <span>Editar</span>
                    </motion.button>
                </div>
            </div>
        </div>

        <AreaFormModal onClose={handleModal} open={modal} areaData={area} />
    </motion.div>
  )
}


