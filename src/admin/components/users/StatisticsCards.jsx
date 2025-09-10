import { UserX, UserCheck } from "lucide-react";

export const StatisticsCards = ({ totalUsers, activeUsers, inactiveUsers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
                <p className="text-sm text-gray-600">Total asignados</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                </div>
            </div>
            <div>
                <p className="text-sm text-gray-600">Activos</p>
                <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
            </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                <UserX className="w-3 h-3 text-white" />
                </div>
            </div>
            <div>
                <p className="text-sm text-gray-600">Inactivos</p>
                <p className="text-2xl font-bold text-gray-900">{inactiveUsers}</p>
            </div>
            </div>
        </div>
    </div>
  )
}
