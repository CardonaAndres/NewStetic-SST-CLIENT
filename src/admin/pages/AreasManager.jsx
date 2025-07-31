import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '../../app/components/LoadingScreen';
import { useAreasHook } from "../hooks/useAreasHook";
import { NavigationLayout } from '../../app/layouts/NavigationLayout';
import { Building2, Edit3, Trash2, CheckCircle, XCircle, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from '../components/areas/Header';
import { AreaCard } from '../components/areas/AreaCard';
import { AreaTableItem } from '../components/areas/AreaTableItem';

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

export const AreasManager = () => {
    const { loading, getAreasPaginate, areas, meta, getAreas } = useAreasHook();
    
    // Estados para filtros y búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [allAreas, setAllAreas] = useState([]); 
    const [filteredAreas, setFilteredAreas] = useState([]);
    
    // Paginación desde sessionStorage
    const getStoredPage = () => {
        const stored = sessionStorage.getItem('areasPage');
        return stored ? parseInt(stored) : 1;
    };
    
    const getStoredLimit = () => {
        const stored = sessionStorage.getItem('areasLimit');
        return stored ? parseInt(stored) : 20;
    };
    
    const [page, setPage] = useState(getStoredPage());
    const [limit, setLimit] = useState(getStoredLimit());

    // Guardar en sessionStorage cuando cambien
    useEffect(() => {
        sessionStorage.setItem('areasPage', page.toString());
    }, [page]);
    
    useEffect(() => {
        sessionStorage.setItem('areasLimit', limit.toString());
    }, [limit]);

    // Cargar áreas paginadas al inicio
    useEffect(() => {
        getAreasPaginate(page, limit);
    }, [page, limit]);

    // Cargar todas las áreas para búsqueda
    useEffect(() => {
        const loadAllAreas = async () => {
            try {
                const allAreasData = await getAreas();
                setAllAreas(allAreasData || []);
            } catch (error) {
                console.error('Error loading all areas:', error);
                setAllAreas([]);
            }
        };
        loadAllAreas();
    }, []);

    // Filtrar áreas basado en búsqueda y filtros
    useEffect(() => {
        let areasToFilter = searchTerm ? allAreas : areas;
        
        const filtered = areasToFilter?.filter(area => {
            const matchesSearch = !searchTerm || 
                area.nombre.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'all' || 
                (filterStatus === 'active' && area.estado === 'Activa') ||
                (filterStatus === 'inactive' && area.estado === 'Inactiva');
            
            return matchesSearch && matchesStatus;
        }) || [];
        
        setFilteredAreas(filtered);
    }, [areas, allAreas, searchTerm, filterStatus]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= (meta?.totalPages || 1)) {
            setPage(newPage);
            setSearchTerm(''); // Limpiar búsqueda al cambiar página
        }
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
        setSearchTerm(''); // Limpiar búsqueda al cambiar límite
    };

    if(loading) return <LoadingScreen />

    return (
        <NavigationLayout title='Áreas - NewStetic'>
            <Header 
                searchTerm={searchTerm}
                filteredAreas={filteredAreas}
                meta={meta}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                limit={limit}
                handleLimitChange={handleLimitChange}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />


            {/* Content */}
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
                        {filteredAreas.map((area, index) => (
                            <AreaCard area={area} key={index} cardVariants={cardVariants} />
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
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200/50">
                                    {filteredAreas.map((area, index) => (
                                        <AreaTableItem area={area} index={index} key={index} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pagination - Only show when not searching */}
            {!searchTerm && meta && meta.totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl border border-white/40 shadow-lg p-4"
                >
                    <div className="text-sm text-gray-700">
                        Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, meta.totalAreas)} de {meta.totalAreas} áreas
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <motion.button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                page <= 1 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                            }`}
                            whileHover={page > 1 ? { scale: 1.05 } : {}}
                            whileTap={page > 1 ? { scale: 0.95 } : {}}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                        
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(pageNum => (
                                <motion.button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        pageNum === page
                                            ? 'bg-teal-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {pageNum}
                                </motion.button>
                            ))}
                        </div>
                        
                        <motion.button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= meta.totalPages}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                page >= meta.totalPages 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                            }`}
                            whileHover={page < meta.totalPages ? { scale: 1.05 } : {}}
                            whileTap={page < meta.totalPages ? { scale: 0.95 } : {}}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Empty State */}
            {filteredAreas.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {searchTerm ? 'No se encontraron áreas' : 'No hay áreas registradas'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm 
                                ? 'No hay áreas que coincidan con tu búsqueda o filtros.'
                                : 'Comienza creando la primera área de New Stetic SST.'
                            }
                        </p>
                        <motion.button
                            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {searchTerm ? 'Limpiar Búsqueda' : 'Crear Primera Área'}
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </NavigationLayout>
    )
}