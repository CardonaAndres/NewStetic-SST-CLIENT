import { useEffect, useState } from 'react';
import { NavigationLayout } from '../../app/layouts/NavigationLayout';
import { useStaffHook } from '../hooks/useStaffHook';
import { LoadingScreen } from '../../app/components/LoadingScreen';
import { Header } from '../components/Header';
import { UserCard } from '../components/UserCard';
import { Pagination } from '../../app/components/Pagination';

export const StaffManager = () => {
  const { loading, getAllUsers, users, meta } = useStaffHook();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(30);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || (meta && newPage > meta.total_pages)) return;
    setCurrentPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };


  useEffect(() => { getAllUsers(currentPage, limit) }, [currentPage, limit]);

  if(loading) return <LoadingScreen />

  return (
    <NavigationLayout title="Gestión Del Personal">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 rounded-xl">  
        <div className="max-w-7xl mx-auto">
          <Header meta={meta} limit={limit} handleLimitChange={handleLimitChange } />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {users.map((user) => (
              <UserCard
                key={user.f200_nit} 
                user={user} 
              />
            ))}
          </div>
         
          <Pagination
            meta={meta} 
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

        </div>
      </div>
    </NavigationLayout>
  );
}