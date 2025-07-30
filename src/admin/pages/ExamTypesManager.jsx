import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { NavigationLayout } from "../../app/layouts/NavigationLayout";
import { useExamTypesHook } from "../hooks/useExamTypesHook";
import { LoadingScreen } from "../../app/components/LoadingScreen";
import { FileText } from "lucide-react";
import { Header } from "../components/examTypes/Header";
import { Content } from "../components/examTypes/Content";

export const ExamTypesManager = () => {
  const { loading, getExamTypes, examTypes } = useExamTypesHook();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    getExamTypes()
  }, []);

  // Filtrar tipos de examen
  const filteredExamTypes = examTypes?.filter(exam => {
    const matchesSearch = exam.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.tipo_examen.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && exam.estado === 'Activo') ||
                         (filterStatus === 'inactive' && exam.estado === 'Inactivo');
    
    return matchesSearch && matchesStatus;
  }) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  if(loading) return <LoadingScreen />

  return (
    <NavigationLayout title="Tipos de Exámenes - NewStetic">
      {/* Header */}
      <Header 
        filteredExamTypes={filteredExamTypes} 
        setViewMode={setViewMode} 
        setSearchTerm={setSearchTerm}
        setFilterStatus={setFilterStatus}
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        viewMode={viewMode}
      /> 

      {/* Content */}
      <Content
        viewMode={viewMode}
        containerVariants={containerVariants}
        filteredExamTypes={filteredExamTypes}
        cardVariants={cardVariants}
      />

      {/* Empty State */}
      {filteredExamTypes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron tipos de examen
            </h3>
            <p className="text-gray-600 mb-6">
              No hay tipos de examen que coincidan con tu búsqueda o filtros.
            </p>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Crear Primer Tipo de Examen
            </motion.button>
          </div>
        </motion.div>
      )}
    </NavigationLayout>
  )
}