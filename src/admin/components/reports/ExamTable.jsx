import { motion } from 'framer-motion';
import { SortableHeader } from './SortableHeader';
import { ExamRow } from './ExamRow';

export const ExamTable = ({ results, sortConfig, setSortConfig, onExamClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/50">
          <thead className="bg-gray-50/80 backdrop-blur-sm">
            <tr>
              <SortableHeader 
                label="Examen" 
                sortKey="tipo_examen" 
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
              />
              <SortableHeader 
                label="Estado" 
                sortKey="estado_item" 
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
              />
              <SortableHeader 
                label="Empleado" 
                sortKey="cc_empleado" 
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
              />
              <SortableHeader 
                label="Vencimiento" 
                sortKey="fecha_vencimiento" 
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
              />
            </tr>
          </thead>
          <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-200/30">
            {results?.map((result, index) => (
              <ExamRow
                key={`${result.checklist_id}-${result.checklist_item_id}`}
                result={result}
                index={index}
                onExamClick={onExamClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};