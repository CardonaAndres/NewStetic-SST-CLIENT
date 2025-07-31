import { motion } from "framer-motion";
import { Building2, Filter, Plus, Search } from "lucide-react";
import { useState } from "react";
import { AreaFormModal } from "./AreaFormModal";

export const Header = ({
    searchTerm,
    filteredAreas,
    meta,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    limit,
    handleLimitChange,
    viewMode,
    setViewMode
}) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  return (
    <>
        {/* Header */}
        <motion.div 
            className="mb-8" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                Gestión de Áreas
                            </h1>
                            <p className="text-gray-600">
                                Configura y administra las diferentes áreas de New Stetic
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200/50">
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-700">Total</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {searchTerm ? filteredAreas.length : meta?.totalAreas || 0}
                                </p>
                            </div>
                        </div>
                        
                        <motion.button onClick={handleModal}
                            className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Nueva</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Filters and Search */}
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
                            placeholder="Buscar áreas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-300 transition-all duration-200"
                        />
                    </div>

                    {/* Filters and Controls */}
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-2 bg-white/80 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="active">Activas</option>
                                <option value="inactive">Inactivas</option>
                            </select>
                        </div>

                        {/* Items per page */}
                        {!searchTerm && (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Mostrar:</span>
                                <select
                                    value={limit}
                                    onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                                    className="px-3 py-2 bg-white/80 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        )}

                        {/* View Toggle */}
                        <div className="flex bg-gray-100/80 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                                    viewMode === 'grid' 
                                        ? 'bg-white shadow-sm text-teal-600' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Tarjetas
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                                    viewMode === 'table' 
                                        ? 'bg-white shadow-sm text-teal-600' 
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

        <AreaFormModal open={modal} onClose={handleModal} />
    </>
  )
}

