import { Filter, Search, Sparkles, Loader2, X, UserX } from 'lucide-react';
import { useStaffHook } from '../../hooks/useStaffHook';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { router } from '../../../app/config/config';

export const Header = ({ meta, limit, handleLimitChange, onSearch, onClearSearch, isSearchMode }) => {
    const location = useLocation();
    const isStaffIdlePage = location.pathname === router.staffIdle;
    const { register, handleSubmit, watch, reset } = useForm();
    const { loading } = useStaffHook();
    const limitOptions = [10, 30, 50, 100, meta.totalUsers];
    const timeoutRef = useRef(null);
    const searchValue = watch('property');
    const onSubmited = handleSubmit(async data => {if (data.property) onSearch(data.property) });

    const handleClearSearch = () => { reset(); onClearSearch(); };
    
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (searchValue && searchValue.trim()) 
            timeoutRef.current = setTimeout(() => { onSubmited() }, 1500)

        if (searchValue === '' || !searchValue) onClearSearch();
        
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        
    }, [searchValue]);
    
    return (
        <>
            <div className="mb-8">       
                <h1 className={`text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${ isStaffIdlePage ? 'from-red-700 via-red-400 to-red-200' : 'from-emerald-600 via-teal-500 to-cyan-400' } mb-3 drop-shadow-sm`}>
                    Gestión del Personal
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                    Encuentra y consulta información de colaboradores registrados en el sistema.
                </p>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 p-5 mb-8 overflow-hidden">
                {/* Subtle background pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${isStaffIdlePage ? 'from-red-50/20 via-red-50/15 to-red-50/20' : 'from-emerald-50/20 via-teal-50/15 to-cyan-50/20'} pointer-events-none`}/>
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${isStaffIdlePage ? 'from-red-200/15' : 'from-emerald-200/15'} to-transparent rounded-full blur-xl`}></div>
                
                <div className="relative flex flex-col lg:flex-row gap-5 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
                        {/* Compact Search Input */}
                        <div className="relative flex-1 max-w-md group">
                            <div className={`absolute inset-0 bg-gradient-to-r ${isStaffIdlePage ? 'from-red-400/15 to-red-400/15' : 'from-emerald-400/15 to-teal-400/15'} rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className={`relative flex bg-white/70 border rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${isStaffIdlePage ? 'hover:border-red-300/60 focus-within:ring-2 focus-within:ring-red-400/30 focus-within:border-red-400' : 'hover:border-emerald-300/60 focus-within:ring-2 focus-within:ring-emerald-400/30 focus-within:border-emerald-400'} focus-within:shadow-lg ${isSearchMode ? (isStaffIdlePage ? 'border-red-400 ring-2 ring-red-400/30' : 'border-emerald-400 ring-2 ring-emerald-400/30') : 'border-slate-200/70'}`}>
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                                    {loading ? (
                                        <Loader2 className={`w-4 h-4 ${isStaffIdlePage ? 'text-red-500' : 'text-emerald-500'} animate-spin`} />
                                    ) : (
                                        <Search className={`w-4 h-4 transition-colors duration-200 ${isSearchMode ? (isStaffIdlePage ? 'text-red-500' : 'text-emerald-500') : (isStaffIdlePage ? 'text-slate-400 group-focus-within:text-red-500' : 'text-slate-400 group-focus-within:text-emerald-500')}`} />
                                    )}
                                </div>
                                <input 
                                    type="text" autoComplete='off'
                                    placeholder="Buscar por cédula, nombre, correo o cargo ..." 
                                    className="flex-1 pl-10 pr-10 py-2.5 bg-transparent focus:outline-none text-slate-700 placeholder-slate-400" 
                                    {...register('property')}
                                />
                                {searchValue && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                                        title="Limpiar búsqueda"
                                    >
                                        <X className="w-3 h-3 text-slate-400 hover:text-slate-600" />
                                    </button>
                                )}
                                {searchValue && !loading && (
                                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                        <div className={`w-2 h-2 ${isStaffIdlePage ? 'bg-red-400' : 'bg-emerald-400'} rounded-full animate-pulse`}></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Compact Limit Selector - solo visible en modo normal */}
                        {!isSearchMode && (
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-50 rounded-lg border border-slate-200/50 group-hover:shadow-sm transition-all duration-200">
                                    <Filter className={`w-4 h-4 text-slate-500 transition-colors ${isStaffIdlePage ? 'group-hover:text-red-600' : 'group-hover:text-emerald-600'}`} />
                                </div>
                                <select 
                                    value={limit}
                                    onChange={(e) => handleLimitChange(Number(e.target.value))}
                                    className={`px-3 py-2.5 bg-white/70 border border-slate-200/70 rounded-xl focus:outline-none transition-all duration-300 text-slate-700 hover:shadow-md backdrop-blur-sm cursor-pointer ${isStaffIdlePage ? 'focus:ring-2 focus:ring-red-400/30 focus:border-red-400' : 'focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400'}`}
                                >
                                    {limitOptions.map((option, key) => (
                                        <option key={key} value={option}>
                                            {option === meta.totalUsers ? 'Todos' : option} resultados
                                        </option>
                                    ))}
                                </select> 
                            </div>
                        )}

                        <div className="flex items-center">
                            <Link to={isStaffIdlePage ? router.staff : router.staffIdle}
                                type="button"
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border border-slate-200/70 rounded-xl transition-all duration-300 hover:shadow-md hover:border-slate-300/60 focus:outline-none focus:ring-2 focus:ring-slate-400/30 focus:border-slate-400 backdrop-blur-sm group"
                            >
                                <div className="p-1 bg-gradient-to-br from-slate-400 to-slate-500 rounded-md group-hover:from-slate-500 group-hover:to-slate-600 transition-all duration-200">
                                    <UserX className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors duration-200">
                                    { isStaffIdlePage ? 'Activos' : 'Inactivos' }
                                </span>
                            </Link>
                            </div> 
                    </div>

                    {/* Compact Results Count */}
                    {!isSearchMode && (
                        <div className={`flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r ${isStaffIdlePage ? 'from-red-50 via-red-50 to-red-50 border-red-100/50' : 'from-emerald-50 via-teal-50 to-cyan-50 border-emerald-100/50'} rounded-xl border shadow-md hover:shadow-lg transition-all duration-300`}>
                            <div className={`p-1.5 bg-gradient-to-br ${isStaffIdlePage ? 'from-red-400 to-red-500' : 'from-emerald-400 to-teal-400'} rounded-lg shadow-sm`}>
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                    Personal NS
                                </span>
                                <span className={`text-lg font-bold ${isStaffIdlePage ? 'text-red-700' : 'text-emerald-700'}`}>
                                    {meta.totalUsers || 0}
                                </span>
                            </div>
                        </div>
                    )}

                </div>

                {/* Subtle progress indicator */}
                {loading && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-200 overflow-hidden rounded-b-2xl">
                        <div className={`h-full bg-gradient-to-r ${isStaffIdlePage ? 'from-red-400 to-red-500' : 'from-emerald-400 to-teal-400'} animate-pulse`}></div>
                    </div>
                )}
            </div>

        </>
    )
}