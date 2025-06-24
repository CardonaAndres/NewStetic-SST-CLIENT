import { useEffect, useState } from 'react';
import { useStaffHook } from '../hooks/useStaffHook';
import { toast } from 'react-toastify';
import { ArrowLeft, Award, User, Folder } from 'lucide-react';
import { LocalLoading } from './LocalLoading';
import { WorkHistoryModal } from './WorkHistoryModal';

export const UserDetailComponent = ({ user, onClose }) => {
  const { loading, getUserFromBook, formatInfo } = useStaffHook();
  const [ pictureURL, setPictureURL ] = useState(null);
  const { infoSections, formatDate, getStatusColor, getStatusText, calculateAge } = formatInfo(user); 
  const [ modal, setModal ] = useState(false);
  const handleModal = () => setModal(!modal);

  useEffect(() => {
    getUserFromBook(user)
    .then(result => setPictureURL(result))
    .catch(() => toast.error(err.message || 'Error al buscar la img'));
  }, []);
  
  if(loading) return <LocalLoading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="mb-6">
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-blue-200/60 rounded-2xl text-sm text-blue-700 font-semibold hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Volver al Buscador
          </button>
        </div>
        
        {/* Main Profile Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Enhanced Avatar Section */}
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
              { 
                pictureURL 
                ? 
                  <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-3xl overflow-hidden border-4 border-white">
                    <img src={pictureURL} className='w-full h-full object-cover' 
                      alt='IMG PERSONA' loading='lazy' 
                    />
                    <div className="absolute inset-0"></div>
                  </div>
                : 
                  <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-3xl md:text-4xl shadow-2xl border-4 border-white">
                    <User className="w-16 h-16 md:w-20 md:h-20 opacity-30 absolute" />
                  </div>
              }
            </div>
            
            {/* Enhanced Profile Information */}
            <div className="flex-1 space-y-6">
              {/* Name and Title Section */}
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 leading-tight">
                  {user.Nombre}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <p className="text-lg md:text-xl text-slate-600 font-semibold">
                    {user["Desc. Cargo"]}
                  </p>
                  <div className="hidden sm:block w-2 h-2 bg-slate-300 rounded-full"></div>
                  <p className="text-slate-500 font-medium">
                    {infoSections[0].items[1].value}: {user.f200_nit}
                  </p>
                </div>
              </div>

              {/* Status and Date Information */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 ${getStatusColor(user["Estado Empleado"])} shadow-lg`}>
                    {getStatusText(user["Estado Empleado"])}
                  </span>
                  {/* New Button Below Status */}
                  <button onClick={handleModal} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                    <Folder className="w-4 h-4" />
                    Trayectoria laboral
                  </button>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Ingreso: {formatDate(user["Fecha de ingreso"])}
                  </span>
                </div>
              </div>
              
              {/* Enhanced Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                  <span className="w-2 h-2 bg-white/50 rounded-full group-hover:animate-ping"></span>
                  Acción Principal
                </button>
                <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                  <span className="w-2 h-2 bg-white/50 rounded-full group-hover:animate-ping"></span>
                  Reportes
                </button>
                <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                  <span className="w-2 h-2 bg-white/50 rounded-full group-hover:animate-ping"></span>
                  Configuración
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Information Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {infoSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="group bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Enhanced Section Header */}
              <div className={`bg-gradient-to-r ${section.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 transform -skew-y-1 scale-110"></div>
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
              </div>
              
              {/* Enhanced Section Content */}
              <div className="p-6 space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="group/item flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 transition-all duration-200 hover:shadow-md border border-transparent hover:border-slate-200/50"
                  >
                    <div className="text-slate-400 mt-0.5 group-hover/item:text-slate-600 transition-colors duration-200">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        {item.label}
                      </p>
                      <p className={`text-sm font-bold break-words ${
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

        {/* Enhanced Statistics Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              Resumen Estadístico
            </h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group text-center p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-3xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {calculateAge(user["Fecha de nacimiento"])}
              </div>
              <div className="text-sm text-slate-600 font-semibold">Años de Edad</div>
            </div>
            
            <div className="group text-center p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-3xl font-black text-emerald-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {new Date().getFullYear() - parseInt(user["Fecha de ingreso"].substring(0, 4))}
              </div>
              <div className="text-sm text-slate-600 font-semibold">Años en la Empresa</div>
            </div>
                 
            <div className="group text-center p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-3xl font-black text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {user.CodigoJefeImediato || 'N/A'}
              </div>
              <div className="text-sm text-slate-600 font-semibold">Código Jefe</div>
            </div>
          </div>
        </div>
      </div>

      <WorkHistoryModal user={user} open={modal} onClose={handleModal} />
    </div>
  );
};