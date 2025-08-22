import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStaffHook } from '../../hooks/useStaffHook';
import { LocalLoading } from './LocalLoading';
import { WorkHistoryModal } from './WorkHistoryModal';
import { Link } from 'react-router-dom';
import { router } from '../../../app/config/config';
import { 
  ArrowLeft, 
  Award, 
  User, 
  Folder, 
  Calendar, 
  TrendingUp, 
  Building, 
  Clock, 
  MapPin, 
  FileText, 
  List
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

export const UserDetailComponent = ({ user, onClose }) => {
  const { loading, getUserFromBook, formatInfo } = useStaffHook();
  const [ pictureURL, setPictureURL ] = useState(null);
  const { infoSections, formatDate, getStatusColor, getStatusText, calculateAge } = formatInfo(user); 
  const [ modal, setModal ] = useState(false);
  const handleModal = () => setModal(!modal);

  const isActive = getStatusText(user["Estado Empleado"]) === 'Activo';

  const toReportsPage = () => {
    const doubleEncoded = encodeURIComponent(encodeURIComponent(JSON.stringify([user.f200_nit])));
    window.location.href = `${router.reportsPage}?collaborators=${doubleEncoded}`;
  }

  useEffect(() => {
    getUserFromBook(user)
    .then(result => setPictureURL(result))
    .catch((err) => console.log(err.message || 'Error al buscar la img'));
  }, []);
  
  if (loading) return <LocalLoading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/10 to-blue-400/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 p-4 md:p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Navigation */}
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.button
              onClick={onClose}
              className="group inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl text-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                y: -2,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              Volver al Buscador
            </motion.button>
          </motion.div>
          
          {/* Enhanced Main Profile Card */}
          <motion.div 
            className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-8 overflow-hidden relative"
            variants={itemVariants}
          >
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start gap-8">
              {/* Enhanced Avatar Section */}
              <motion.div 
                className="flex-shrink-0 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 rounded-3xl animate-pulse" />
                { 
                  pictureURL 
                  ? 
                    <div className="relative w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                      <img 
                        src={pictureURL} 
                        className='w-full h-full object-cover' 
                        alt='IMG PERSONA' 
                        loading='lazy' 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  : 
                    <div className="relative w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-2xl border-4 border-white">
                      <User className="w-20 h-20 md:w-24 md:h-24 opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl" />
                    </div>
                }
              </motion.div>
              
              {/* Enhanced Profile Information */}
              <div className="flex-1 space-y-6">
                {/* Name and Title Section */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 leading-tight">
                    {user.Nombre}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-600" />
                      <p className="text-lg md:text-xl text-slate-700 font-semibold">
                        {user["Desc. Cargo"]}
                      </p>
                    </div>
                    <div className="hidden sm:block w-2 h-2 bg-slate-300 rounded-full" />
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <p className="text-slate-600 font-medium">
                        ID: {user.f200_nit}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Status and Actions */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <motion.span 
                      className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold border-2 shadow-lg ${getStatusColor(user["Estado Empleado"])}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {getStatusText(user["Estado Empleado"])}
                    </motion.span>
                    
                    {isActive && (
                      <>
                      <motion.button 
                        onClick={handleModal} 
                        className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          backgroundImage: "linear-gradient(to right, rgb(71 85 105), rgb(51 65 85))"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Folder className="w-4 h-4" />
                        Trayectoria laboral
                      </motion.button>
                      </>
                    )}
                      <motion.button 
                        onClick={toReportsPage} 
                        className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          backgroundImage: "linear-gradient(to right, rgb(71 85 105), rgb(51 65 85))"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <List className="w-4 h-4" />
                        Ir a reportes
                      </motion.button>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">
                      Ingreso: {formatDate(user["Fecha de ingreso"])}
                    </span>
                  </div>
                </motion.div>
                <motion.div 
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[
                      { 
                        id: 1,
                        label: 'Exámenes Periódicos', 
                        gradient: 'from-blue-400 to-blue-500',
                        hoverGradient: 'from-blue-600 to-blue-700',
                        icon: <TrendingUp className="w-4 h-4" />,
                        to: `${router.medicalStaffHistory}?cc=${user.f200_nit}`
                      },
                      { 
                        id: 2,
                        label: 'Examen de Ingreso', 
                        gradient: 'from-blue-400 to-blue-500',
                        hoverGradient: 'from-blue-600 to-blue-700',
                        icon: <Clock className="w-4 h-4" />,
                        to: `${router.incomeExam}?cc=${user.f200_nit}&isUserActive=${isActive}`
                      },
                      { 
                        id: 3,
                        label: 'Examen de Egreso', 
                        gradient: 'from-blue-400 to-blue-500',
                        hoverGradient: 'from-blue-600 to-blue-700',
                        icon: <MapPin className="w-4 h-4" />,
                        to: `${router.egressExam}?cc=${user.f200_nit}&isUserActive=${isActive}`
                      }
                    ].map((button, index) => {
                        const buttonsIDToView = isActive ? [1, 2, 3] : [2, 3]
                        if(buttonsIDToView.includes(button.id)){
                          return (
                            <motion.div key={index}>
                              <Link 
                                to={button.to} 
                                className={`group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${button.gradient} text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
                              >
                                {button.icon}
                                {button.label}
                              </Link>
                            </motion.div>
                          )
                        }
                      })}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Information Sections Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
          >
            {infoSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                className="group bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                {/* Enhanced Section Header */}
                <div className={`bg-gradient-to-r ${section.color} p-6 text-white relative overflow-hidden`}>
                  <motion.div 
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%', skewX: -15 }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="relative flex items-center gap-3">
                    <motion.div 
                      className="p-2 bg-white rounded-xl"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {section.icon}
                    </motion.div>
                    <h2 className="text-xl font-bold text-blue-800">{section.title}</h2>
                  </div>
                </div>
                
                {/* Enhanced Section Content */}
                <div className="p-6 space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="group/item flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 border border-transparent hover:border-slate-200/50 transition-all duration-200"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 4px 12px -2px rgb(0 0 0 / 0.1)"
                      }}
                    >
                      <motion.div 
                        className="text-slate-400 mt-0.5 group-hover/item:text-slate-600 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                      >
                        {item.icon}
                      </motion.div>
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Statistics Section */}
          <motion.div 
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div 
                className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-800">
                Resumen Estadístico
              </h3>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {[
                {
                  value: calculateAge(user["Fecha de nacimiento"]),
                  label: "Años de Edad",
                  gradient: "from-blue-500 to-indigo-600",
                  bgGradient: "from-blue-50 to-indigo-50",
                  borderColor: "border-blue-200 hover:border-blue-400",
                  icon: <User className="w-5 h-5" />
                },
                {
                  value: new Date().getFullYear() - parseInt(user["Fecha de ingreso"].substring(0, 4)),
                  label: "Años en la Empresa",
                  gradient: "from-blue-500 to-indigo-600",
                  bgGradient: "from-blue-50 to-blue-50",
                  borderColor: "border-blue-200 hover:border-blue-400",
                  icon: <Building className="w-5 h-5" />
                },
                {
                  value: user.CodigoJefeImediato || 'N/A',
                  label: "Código Jefe Inmediato",
                  gradient: "from-blue-500 to-indigo-600",
                  bgGradient: "from-blue-50 to-blue-50",
                  borderColor: "border-blue-200 hover:border-blue-400",
                  icon: <Award className="w-5 h-5" />
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`group text-center p-6 rounded-3xl bg-gradient-to-br ${stat.bgGradient} border-2 ${stat.borderColor} transition-all duration-300`}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -4,
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
                  }}
                >
                  <motion.div 
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white mb-3 shadow-lg`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div 
                    className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-slate-600 font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence>
          {modal && (
            <WorkHistoryModal user={user} open={modal} onClose={handleModal} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};