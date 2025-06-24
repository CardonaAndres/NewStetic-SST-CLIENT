import { Calendar, MapPin, User, Briefcase, Building2, Clock, CheckCircle2, XCircle, ArrowLeft, Award } from 'lucide-react';
import { useStaffHook } from '../hooks/useStaffHook';
import { useEffect } from 'react';
import { LocalLoading } from './LocalLoading';

export const WorkHistory = ({ user, onClose }) => {
    const { loading, getUserWorkHistory, userHistory: careerData } = useStaffHook();

    useEffect(() => {
        getUserWorkHistory(user)
    }, [])

    const formatDate = (dateString) => {
        if (!dateString) return 'Actualidad';
        
        if (dateString.includes('T')) {
            // Formato ISO
            return new Date(dateString).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else {
            // Formato YYYYMMDD
            const year = dateString.substring(0, 4);
            const month = dateString.substring(4, 6);
            const day = dateString.substring(6, 8);
            return new Date(`${year}-${month}-${day}`).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    // Función para calcular duración
    const calculateDuration = (startDate, endDate) => {
        const start = startDate.includes('T') ? new Date(startDate) : 
            new Date(`${startDate.substring(0, 4)}-${startDate.substring(4, 6)}-${startDate.substring(6, 8)}`);

        const end = endDate ? (endDate.includes('T') ? new Date(endDate) : 
            new Date(`${endDate.substring(0, 4)}-${endDate.substring(4, 6)}-${endDate.substring(6, 8)}`)) : new Date();

        const months = Math.floor((end - start) / (1000 * 60 * 60 * 24 * 30.44));
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years > 0) {
            return `${years} año${years > 1 ? 's' : ''} ${remainingMonths > 0 ? `y ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}` : ''}`;
        }
        return `${months} mes${months !== 1 ? 'es' : ''}`;
    };

    // Calcular experiencia total
    const calculateTotalExperience = () => {
        if (!careerData || careerData.length === 0) return 0;
        
        let totalMonths = 0;
        careerData.forEach(job => {
            const start = job["Fecha de ingreso"].includes('T') ? new Date(job["Fecha de ingreso"]) : 
                new Date(`${job["Fecha de ingreso"].substring(0, 4)}-${job["Fecha de ingreso"].substring(4, 6)}-${job["Fecha de ingreso"].substring(6, 8)}`);
            
            const end = job["Fecha de Retiro"] ? 
                (job["Fecha de Retiro"].includes('T') ? new Date(job["Fecha de Retiro"]) : 
                new Date(`${job["Fecha de Retiro"].substring(0, 4)}-${job["Fecha de Retiro"].substring(4, 6)}-${job["Fecha de Retiro"].substring(6, 8)}`)) : 
                new Date();
            
            const months = Math.floor((end - start) / (1000 * 60 * 60 * 24 * 30.44));
            totalMonths += months;
        });
        
        const years = Math.floor(totalMonths / 12);
        return years;
    };

    // Ordenar por fecha de ingreso (más reciente primero)
    const sortedData = careerData ? [...careerData].sort((a, b) => {
        const dateA = a["Fecha de ingreso"];
        const dateB = b["Fecha de ingreso"];
        return dateB.localeCompare(dateA);
    }) : [];

    if (loading) return <LocalLoading />

    if (!careerData || careerData.length === 0) {
     return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header con botón de regreso */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 border border-gray-200"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="font-medium">Volver a usuarios</span>
                    </button>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <h1 className="text-2xl font-bold text-gray-800">Trayectoria Laboral</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                    <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No hay datos disponibles</h2>
                    <p className="text-gray-600">No se encontró información de trayectoria laboral para este usuario.</p>
                </div>
            </div>
        </div>
     );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header mejorado con botón de regreso */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 border border-gray-200 group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        <span className="font-medium">Volver a usuarios</span>
                    </button>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg">
                            <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Trayectoria Laboral</h1>
                            <p className="text-gray-600 text-sm">Historial completo de empleos</p>
                        </div>
                    </div>
                </div>

                {/* Tarjeta de información del empleado */}
                <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-yellow-500 p-6">
                        <div className="flex items-center gap-4 text-white">
                            <div>
                                <h2 className="text-2xl font-bold">{careerData[0]?.Nombre}</h2>
                                <div className="flex items-center gap-6 mt-2 text-white/90">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{careerData[0]?.Ciudad}, {careerData[0]?.Departamento}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>Doc: {careerData[0]?.f200_nit}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas rápidas */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200">
                                <div className="flex items-center justify-center mb-2">
                                    <Briefcase className="h-6 w-6 text-teal-600" />
                                </div>
                                <div className="text-2xl font-bold text-teal-700">{careerData.length}</div>
                                <div className="text-sm text-teal-600 font-medium">Posiciones</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline mejorado */}
                <div className="relative">
                    {/* Línea vertical con gradiente más suave */}
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 via-teal-500 to-yellow-400 rounded-full shadow-sm"></div>

                    {sortedData.map((job, index) => (
                        <div key={index} className="relative mb-10 last:mb-0">
                            {/* Círculo indicador mejorado */}
                            <div className={`absolute left-6 w-6 h-6 rounded-full border-4 border-white shadow-xl flex items-center justify-center ${
                                job.ESTADO === 'ACTIVO' ? 'bg-gradient-to-r from-teal-400 to-teal-600' : 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                            }`}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>

                            {/* Contenido de la tarjeta mejorado */}
                            <div className="ml-20">
                                <div className={`bg-white rounded-2xl shadow-xl border-l-4 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                                    job.ESTADO === 'ACTIVO' ? 'border-l-teal-500' : 'border-l-yellow-500'
                                }`}>
                                    
                                    {/* Header de la tarjeta mejorado */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`p-2 rounded-xl ${
                                                    job.ESTADO === 'ACTIVO' ? 'bg-teal-100' : 'bg-yellow-100'
                                                }`}>
                                                    <Building2 className={`h-5 w-5 ${
                                                        job.ESTADO === 'ACTIVO' ? 'text-teal-600' : 'text-yellow-600'
                                                    }`} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-800">{job.Empresa}</h3>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 mb-2">
                                                <Briefcase className="h-5 w-5 text-gray-500" />
                                                <span className="text-xl font-semibold text-gray-700">{job["Desc. Cargo"]}</span>
                                            </div>
                                            
                                            <p className="text-gray-600 text-lg">{job.Gerencia} • {job["Centro de costos"]}</p>
                                        </div>
                                        
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                                            job.ESTADO === 'ACTIVO' 
                                                ? 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700 border border-teal-300' 
                                                : 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border border-yellow-300'
                                        }`}>
                                            {job.ESTADO === 'ACTIVO' ? 
                                                <CheckCircle2 className="h-4 w-4" /> : 
                                                <XCircle className="h-4 w-4" />
                                            }
                                            {job.ESTADO}
                                        </div>
                                    </div>

                                    {/* Información de fechas mejorada */}
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500 font-medium">Fecha de ingreso</span>
                                                <p className="font-bold text-gray-800">{formatDate(job["Fecha de ingreso"])}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="p-2 bg-orange-100 rounded-lg">
                                                <Clock className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500 font-medium">
                                                    {job["Fecha de Retiro"] ? 'Fecha de retiro' : 'Duración actual'}
                                                </span>
                                                <p className="font-bold text-gray-800">
                                                    {job["Fecha de Retiro"] ? 
                                                        formatDate(job["Fecha de Retiro"]) : 
                                                        calculateDuration(job["Fecha de ingreso"], job["Fecha de Retiro"])
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Información adicional mejorada */}
                                    <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                                            <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Tipo de contrato</span>
                                            <p className="font-bold text-blue-800 mt-1">{job["Tipo de contrato"]}</p>
                                        </div>
                                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                                            <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">Grupo empleado</span>
                                            <p className="font-bold text-green-800 mt-1">{job["Grupo empleado"]}</p>
                                        </div>
                                    </div>

                                    {/* Duración total mejorada */}
                                    {job["Fecha de Retiro"] && (
                                        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-teal-100 rounded-full border border-teal-200">
                                                <Award className="h-4 w-4 text-teal-600" />
                                                <span className="text-sm text-teal-700 font-medium">Duración total: </span>
                                                <span className="font-bold text-teal-800">
                                                    {calculateDuration(job["Fecha de ingreso"], job["Fecha de Retiro"])}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};