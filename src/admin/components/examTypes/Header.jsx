import { useState } from "react";
import { motion } from "framer-motion";
import { ExamTypeFormModal } from "./ExamTypeFormModal";
import { IfCan } from "../../middlewares/IfCan";
import { FileText, Filter, Plus, Search } from "lucide-react";

export const Header = ({
    filteredExamTypes, 
    setViewMode, 
    setSearchTerm, 
    setFilterStatus, 
    searchTerm,
    filterStatus,
    viewMode
}) => {
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
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Gestión de Tipos de Exámenes
                    </h1>
                    <p className="text-gray-600">
                        Configura y administra los diferentes tipos de exámenes médicos del sistema
                    </p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200/50">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">Total</p>
                        <p className="text-xl font-bold text-gray-900">{filteredExamTypes.length}</p>
                    </div>
                    </div>

                    <IfCan permission="examtypes.create">
                        <motion.button
                            onClick={handleModal}
                            className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Nuevo</span>
                        </motion.button>

                    </IfCan>
                
                </div>
                </div>
            </div>
        </motion.div>

        <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 shadow-md p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Buscar tipos de examen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                />
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 bg-white/80 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                    >
                    <option value="all">Todos los estados</option>
                    <option value="active">Activos</option>
                    <option value="inactive">Inactivos</option>
                    </select>
                </div>

                {/* View Toggle */}
                <div className="flex bg-gray-100/80 rounded-lg p-1">
                    <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'grid' 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    >
                    Tarjetas
                    </button>
                    <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'table' 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    >
                    Tabla
                    </button>
                </div>
                </div>
            </div>
            </div>
        </motion.div>

        <ExamTypeFormModal open={modal} onClose={handleModal} />
    </>
  )
}
