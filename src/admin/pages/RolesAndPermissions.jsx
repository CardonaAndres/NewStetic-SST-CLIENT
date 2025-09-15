import { useEffect, useState } from "react";
import { useRolesHook } from "../hooks/useRolesHook";
import { NavigationLayout } from "../../app/layouts/NavigationLayout";
import { LoadingScreen } from "../../app/components/LoadingScreen";
import { Shield, Plus, Search } from "lucide-react";
import { RoleCard } from "../components/rolesAndPermissions/RoleCard";
import { Header } from "../components/rolesAndPermissions/Header";
import { ControlsSection } from "../components/rolesAndPermissions/ControlsSection";
import { usePermissionsHook } from "../hooks/usePermissionsHook";

export const RolesAndPermissions = () => {
  const { getPermissions } = usePermissionsHook();
  const { roles, getRoles, loading: rolesLoading } = useRolesHook();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (roles) {
      const filtered = roles.filter(role => 
        role.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoles(filtered);
    }
  }, [roles, searchTerm]);


  if(rolesLoading) return <LoadingScreen />

  return (
    <NavigationLayout title="Roles y Permisos">
      <div className="space-y-6">
        {/* Header Section */}
        <Header roles={roles} />

        {/* Controls Section */}
        <ControlsSection 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm} 
        />

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <RoleCard role={role} key={role.rol_id} />
          ))}
        </div>

        {/* Empty State */}
        {filteredRoles.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron roles</h3>
            <p className="text-gray-500">
              No hay roles que coincidan con "{searchTerm}"
            </p>
          </div>
        )}

        {/* No Roles State */}
        {roles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay roles configurados</h3>
            <p className="text-gray-500 mb-4">
              Comienza creando el primer rol del sistema
            </p>
            <button
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl mx-auto"
            >
              <Plus className="w-4 h-4" />
              Crear Primer Rol
            </button>
          </div>
        )}
      </div>
    </NavigationLayout>
  )
}