import { useEffect, useState } from 'react';
import { useStaffHook } from '../hooks/useStaffHook';
import { toast } from 'react-toastify';
import { ArrowLeft, Award } from 'lucide-react';
import { LocalLoading } from './LocalLoading';

export const UserDetailComponent = ({ user, onClose }) => {
  const { loading, getUserFromBook, formatInfo } = useStaffHook();
  const [ pictureURL, setPictureURL ] = useState(null);
  const { 
    infoSections, 
    formatDate, 
    getInitials, 
    getStatusColor, 
    getStatusText, 
    calculateAge
  } = formatInfo(user); 

  useEffect(() => {
    getUserFromBook(user)
    .then(result => setPictureURL(result))
    .catch(() => toast.error(err.message || 'Error al buscar la img'));
  }, []);
  
  if(loading) return <LocalLoading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-full text-sm text-blue-700 font-medium mb-6 hover:bg-white/90 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Buscador
          </button>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                { 
                  pictureURL 
                  ? 
                    <>
                      <div className="w-52 h-52 rounded-3xl flex items-center justify-center font-bold shadow-xl">
                        <img src={pictureURL} className='rounded-2xl' alt='IMG PERSONA' loading='lazy' />
                      </div>
                    </>
                  : <>
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                      {getInitials(user.Nombre)}
                    </div>
                  </> 
                }
              </div>
              
              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 mb-2">
                      {user.Nombre}
                    </h1>
                    <p className="text-lg text-slate-600 font-medium mb-2">
                      {user["Desc. Cargo"]}
                    </p>
                    <p className="text-slate-500">
                      {user["Tipo de identificacion"]}: {user.f200_nit}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(user["Estado Empleado"])} text-center`}>
                      {getStatusText(user["Estado Empleado"])}
                    </span>
                    <div className="text-xs text-slate-500 text-center">
                      Ingreso: {formatDate(user["Fecha de ingreso"])}
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    Boton 1
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    Boton 2
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    Boton 3
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {infoSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
            >
              {/* Section Header */}
              <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                <div className="flex items-center gap-3">
                  {section.icon}
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
              </div>
              
              {/* Section Content */}
              <div className="p-6 space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors duration-200"
                  >
                    <div className="text-slate-400 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      <p className={`text-sm font-semibold break-words ${
                        item.status !== undefined 
                          ? item.status === 1 ? 'text-emerald-700' : 'text-red-700'
                          : 'text-slate-700'
                      }`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Resumen Estadístico
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {calculateAge(user["Fecha de nacimiento"])}
              </div>
              <div className="text-xs text-slate-600 font-medium">Años de Edad</div>
            </div>
            
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {new Date().getFullYear() - parseInt(user["Fecha de ingreso"].substring(0, 4))}
              </div>
              <div className="text-xs text-slate-600 font-medium">Años en la Empresa</div>
            </div>
            
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {user.PeriodoIngreso}
              </div>
              <div className="text-xs text-slate-600 font-medium">Período Ingreso</div>
            </div>
            
            <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {user.CodigoJefeImediato || 'N/A'}
              </div>
              <div className="text-xs text-slate-600 font-medium">Código Jefe</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};