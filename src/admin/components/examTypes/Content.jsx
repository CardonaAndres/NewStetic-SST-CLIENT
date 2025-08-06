import { AnimatePresence, motion } from 'framer-motion'
import { ExamTypeCard } from "./ExamTypeCard";
import { ExamTypeItemTable } from "./ExamTypeItemTable";

export const Content = ({ 
    viewMode,
    containerVariants,
    filteredExamTypes,
    cardVariants  
 }) => {

  return (
    <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          /* Grid View */
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredExamTypes.map((examType, index) => (
              <ExamTypeCard 
                cardVariants={cardVariants}
                examType={examType} 
                key={index}
              />
            ))}
          </motion.div>
        ) : (
          /* Table View */
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80 border-b border-gray-200/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tipo de Examen</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredExamTypes.map((examType, index) => (
                    <ExamTypeItemTable examType={examType} key={index} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
    </AnimatePresence>
  )
}