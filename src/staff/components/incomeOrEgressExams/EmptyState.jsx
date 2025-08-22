import { FileText } from "lucide-react";

export const EmptyState = ({ exams }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12 p-6 lg:p-8">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No hay exámenes registrados
        </h3>

        <p className="text-gray-500 mb-6 max-w-md">
            {exams.length === 0 
            ? 'Comienza agregando el examen a un colaborador para llevar un control de su estado de salud inicial.'
            : 'No hay exámenes disponibles en este momento.'
            }
        </p>
    </div>
  )
}

