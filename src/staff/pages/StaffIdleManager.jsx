import { useEffect, useState } from 'react';
import { NavigationLayout } from "../../app/layouts/NavigationLayout"
import { useStaffHook } from '../hooks/useStaffHook';
import { LoadingScreen } from '../../app/components/LoadingScreen';
import { Header } from '../components/Header';
import { Pagination } from '../../app/components/Pagination';
import { UserCard } from '../components/UserCard';

export const StaffIdleManager = () => {
  const { loading, getAllUsersIdle, getUserByProperty, users, meta } = useStaffHook();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchModeLoading, setSearchModeLoading] = useState(false);
  const [limit, setLimit] = useState(() => {
    const storedLimit = sessionStorage.getItem('staff_idle_limit');
    return storedLimit ? parseInt(storedLimit, 10) : 30;
  });

  const handlePageChange = (newPage) => {
    if (newPage < 1 || (meta && newPage > meta.total_pages)) return;
    setCurrentPage(newPage);
  };
  
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    sessionStorage.setItem('staff_idle_limit', newLimit); 
    setCurrentPage(1);
  };
  
  // Función para manejar la búsqueda desde el Header
  const handleSearch = async (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) {
      setIsSearchMode(false);
      setSearchResults(null);
      return;
    }

    try {
      setSearchModeLoading(true);
      setIsSearchMode(true);
      const results = await getUserByProperty(searchTerm, false);
      setSearchResults(results);
      setSearchModeLoading(false);
    } catch (err) {
      toast.error('Error en la búsqueda: ' + err.message)
      setSearchResults([]);
    }
  };
  
  const clearSearch = () => { setIsSearchMode(false); setSearchResults(null) };

  useEffect(() => {
    if (!isSearchMode) getAllUsersIdle(currentPage, limit);
  }, [currentPage, limit]);
  
  const displayUsers = isSearchMode ? (searchResults || []) : users;
  
  if(loading) return <LoadingScreen />

  return (
    <NavigationLayout title="Gestión Del Personal Inactivo">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-indigo-100 p-6 rounded-xl">  
        <div>
          <Header 
            meta={meta} 
            limit={limit} 
            handleLimitChange={handleLimitChange}
            onSearch={handleSearch}
            onClearSearch={clearSearch}
            isSearchMode={isSearchMode}
          />

           {isSearchMode && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-red-700 font-medium">
                    Mostrando resultados de búsqueda ({searchResults?.length || 0} encontrados)
                  </span>
                  <button 
                    onClick={clearSearch}
                    className="text-red-600 hover:text-red-800 underline text-sm"
                  >
                    Mostrar todos los usuarios
                  </button>
                </div>
              </div>
            )}
          
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {displayUsers.map((user, key) => (
                <UserCard
                  key={key} 
                  user={user} 
                />
              ))}
            </div>
  
            {isSearchMode && !searchModeLoading && (!searchResults || searchResults.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No se encontraron usuarios que coincidan con la búsqueda</p>
              </div>
            )}


          {(!isSearchMode && meta?.totalUsers > 30) && (
            <Pagination
              meta={meta} 
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}

        </div>
      </div>
    </NavigationLayout>
  )
}
