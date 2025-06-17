import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ meta, currentPage, onPageChange, className = "" }) => {
  if (!meta || meta.total_pages <= 1) return null;

  const generatePageNumbers = () => {
    const { total_pages } = meta;
    const pages = [];
    const maxVisiblePages = 5;

    if (total_pages <= maxVisiblePages) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para páginas cuando hay muchas
      if (currentPage <= 3) {
        // Mostrar las primeras páginas
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
      } else if (currentPage >= total_pages - 2) {
        // Mostrar las últimas páginas
        for (let i = total_pages - maxVisiblePages + 1; i <= total_pages; i++) {
          pages.push(i);
        }
      } else {
        // Mostrar páginas alrededor de la página actual
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className={`flex items-center justify-center gap-4 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 ${className}`}>
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
              pageNum === currentPage
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= meta.total_pages}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Información de página */}
      <div className="ml-4 text-sm text-slate-600">
        Página {currentPage} de {meta.total_pages}
      </div>
    </div>
  );
};