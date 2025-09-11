import { useState } from "react";
import { ModalForm } from "./ModalForm";
import { Plus, UserCheck } from "lucide-react";

export const Header = () => {
  const [ modalForm, setModalForm ] = useState(false);
  const handleModalForm = () => setModalForm(!modalForm)

  return (
    <div className="bg-white border rounded-2xl border-gray-200 mb-6">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                <h1 className="text-xl font-semibold text-gray-900">
                    Gestiona los usuarios autorizados al sistema
                </h1>
                </div>
            </div>
            </div>
            <button onClick={handleModalForm} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors font-medium"
            >
            <Plus className="h-4 w-4" />
            <span>Agregar</span>
            </button>
        </div>

        </div>

        <ModalForm open={modalForm} onClose={handleModalForm} />
    </div>
  )
}
