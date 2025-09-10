import { Edit2, Eye, Trash2 } from "lucide-react"

export const UserItem = ({ user }) => {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                {user.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
            </div>
            <div>
                <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{user.username || 'Sin username'}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    user.estado === 'Activo' ? 'bg-green-100 text-green-800' :
                    user.estado === 'Inactivo' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                    {user.estado || 'Sin estado'}
                </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                <span>{user.numero_documento || 'Sin documento'}</span> • <span>{user.email || 'Sin email'}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                <span className="font-medium">{user.nombre || 'Sin rol'}</span> 
                {user.descripcion && ` - ${user.descripcion}`}
                </div>
            </div>
            </div>
            
            <div className="flex items-center space-x-2">
            <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Ver detalles"
            >
                <Eye className="h-4 w-4" />
            </button>
            
            <button
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Editar usuario"
            >
                <Edit2 className="h-4 w-4" />
            </button>
            
            <button
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar usuario"
            >
                <Trash2 className="h-4 w-4" />
            </button>
            </div>
        </div>
    </div>
  )
}
