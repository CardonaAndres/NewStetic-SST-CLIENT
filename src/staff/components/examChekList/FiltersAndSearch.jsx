import { motion } from "framer-motion";
import { 
  Search,
  Filter,
} from "lucide-react";

export const FiltersAndSearch = ({ 
    searchTerm, 
    setSearchTerm, 
    filterStatus, 
    setFilterStatus,
    filterRequired,
    setFilterRequired
}) => {
  return (
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
                placeholder="Buscar exámenes..."
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
                  <option value="bien">Al día</option>
                  <option value="vencido">Vencidos</option>
                  <option value="proximo">Próximos a vencer</option>
                  <option value="proceso">En proceso</option>
                  <option value="accion">Requieren acción</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="sin_info">Sin información</option>
                  <option value="no_requerido">No requeridos</option>
                  <option value="active">Activos</option>
                  <option value="inactive">Inactivos</option>
                </select>
              </div>

              <select
                value={filterRequired}
                onChange={(e) => setFilterRequired(e.target.value)}
                className="px-3 py-2 bg-white/80 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
              >
                <option value="all">Todos</option>
                <option value="required">Requeridos</option>
                <option value="optional">Opcionales</option>
              </select>
            </div>
          </div>
        </div>
    </motion.div>
  )
}

