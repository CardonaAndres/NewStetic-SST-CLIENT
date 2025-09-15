import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { FormModal } from "./FormModal";

export const ControlsSection = ({ searchTerm, setSearchTerm }) => {
  const [ modalForm, setModalForm ] = useState(false);
  const handleModalForm = () => setModalForm(!modalForm);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
        />
        <input
          type="text"
          placeholder="Buscar roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button onClick={handleModalForm} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
          <Plus className="w-4 h-4" />
          Nuevo Rol
        </button>
      </div>

      <FormModal onClose={handleModalForm} open={modalForm} />
    </div>
  );
};
