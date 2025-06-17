import { Filter, Search, Sparkles } from 'lucide-react';

export const Header = ({ meta, limit, handleLimitChange  }) => {
    const limitOptions = [10, 30, 50, 100, meta.totalUsers];
    
    return (
        <>
            <div className="mb-8">       
                <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-green-400 mb-3">
                    Gestión del Personal
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                    Encuentra y consulta información de colaboradores registrados en el sistema.
                </p>
            </div>

            {/* Search and Controls Section */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" placeholder="Buscar por cédula..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-slate-700"
                    />
                    </div>

                    {/* Limit Selector */}
                    <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-slate-500" />
                    <select value={limit}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-slate-700"
                    >
                        {limitOptions.map((option, key) => (
                        <option key={key} value={option}>{option} por página</option>
                        ))}
                    </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-100 to-indigo-100 rounded-xl">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-medium text-teal-700">
                     Personal NS: { meta.totalUsers }
                    </span>
                </div>
                </div>
            </div>
        
        </>
    )
}
