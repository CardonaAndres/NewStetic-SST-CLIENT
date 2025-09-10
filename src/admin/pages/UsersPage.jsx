import { useState, useEffect } from 'react';
import { NavigationLayout } from "../../app/layouts/NavigationLayout";
import { useAllowedUsersHook } from '../hooks/useAllowedUsersHook';
import { LoadingScreen } from '../../app/components/LoadingScreen';
import { Header } from '../components/users/Header';
import { StatisticsCards } from '../components/users/StatisticsCards';
import { UserItem } from '../components/users/UserItem';
import { Search, UserX } from 'lucide-react';

export const UsersPage = () => {
  const { loading, users, getUsers } = useAllowedUsersHook();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos los estados');
  const [roleFilter, setRoleFilter] = useState('Todos');

  useEffect(() => {
    getUsers();
  }, []);

  // Filter users
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.numero_documento?.includes(searchTerm) ||
        user.nombre?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'Todos los estados' || user.estado === statusFilter;
      const matchesRole = roleFilter === 'Todos' || user.nombre === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });

    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, roleFilter, users]);

  // Statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.estado === 'Activo').length;
  const inactiveUsers = users.filter(u => u.estado === 'Inactivo').length;

  // Get unique roles for filter dropdown
  const uniqueRoles = [...new Set(users.map(user => user.nombre).filter(Boolean))];

  if (loading) return <LoadingScreen />;

  return (
    <NavigationLayout title='Usuarios Autorizados'>
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="space-y-6">
          {/* Statistics Cards */}
          <StatisticsCards 
            totalUsers={totalUsers} 
            activeUsers={activeUsers}
            inactiveUsers={inactiveUsers}
          />

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-[160px] bg-white"
                >
                  <option value="Todos los estados">Todos los estados</option>
                  <option value="Activo">Activos</option>
                  <option value="Inactivo">Inactivos</option>
                </select>
                
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-[120px] bg-white"
                >
                  <option value="Todos">Todos</option>
                  {uniqueRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
                <p className="text-gray-500">No hay usuarios que coincidan con los filtros aplicados.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <UserItem user={user} key={user.user_id} />
                ))}
              </div>
            )}
          </div>

        </div>
    </NavigationLayout>
  );
};