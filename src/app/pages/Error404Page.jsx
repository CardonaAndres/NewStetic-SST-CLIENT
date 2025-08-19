import { motion } from 'framer-motion';
import { Home, ArrowLeft, RefreshCw, Search, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/imgs/LOGO_NS_SINFONDO.png';
import { router } from '../config/config';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const leftVariants = {
  hidden: { 
    opacity: 0, 
    x: -50
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const rightVariants = {
  hidden: { 
    opacity: 0, 
    x: 50
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const Error404Page = () => {
  const handleGoBack = () => window.history.back();
  const handleRefresh = () => window.location.reload();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: `url('/DashboardBackground.webp')` }}
        />
        
        {/* Animated Background Orbs */}
        <motion.div
          className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-red-300/8 to-orange-400/8 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/8 to-purple-400/8 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-yellow-300/6 to-orange-300/6 blur-2xl"
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
      </div>

      {/* Top Header with Logo */}
      <motion.div 
        className="relative z-10 pt-8 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 flex items-center justify-center p-2">
              <img 
                src={Logo} 
                alt='New Stetic Logo' 
                className="w-14 h-12 object-contain" 
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">New Stetic</h1>
              <p className="text-gray-600">Sistema SST</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Horizontal Layout */}
      <div className="relative z-10 flex-1 flex items-center min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Side - 404 Visual */}
            <motion.div 
              className="text-center lg:text-left"
              variants={leftVariants}
            >
              <motion.div 
                className="relative inline-block mb-8"
                variants={floatingVariants}
                animate="animate"
              >
                <h2 className="text-[8rem] lg:text-[12rem] xl:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 leading-none select-none">
                  404
                </h2>
                
                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-80"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-70"
                  animate={{
                    scale: [1, 0.7, 1],
                    rotate: [0, -180, -360]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                <motion.div
                  className="absolute top-1/2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                  animate={{
                    scale: [1, 1.5, 1],
                    x: [0, 10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mb-8"
              >
                <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  ¡Oops!
                </h3>
              </motion.div>
            </motion.div>

            {/* Right Side - Information & Actions */}
            <motion.div 
              className="space-y-8"
              variants={rightVariants}
            >
              {/* Main Message Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/40 shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    Página no encontrada
                  </h4>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  La página que estás buscando no existe, ha sido movida o eliminada. 
                  No te preocupes, estas cosas pasan. Te ayudamos a encontrar lo que necesitas.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to={router.staff || '/'}
                    className="group flex-1"
                  >
                    <motion.button
                      className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                      whileHover={{ 
                        scale: 1.02,
                        y: -2
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Home className="w-5 h-5" />
                      <span>Ir al Dashboard</span>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  </Link>

                  <motion.button
                    onClick={handleGoBack}
                    className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium border border-gray-200"
                    whileHover={{ 
                      scale: 1.02,
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Regresar</span>
                  </motion.button>
                </div>
              </div>

              {/* Helpful Tips Card */}
              <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
                <h5 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Search className="w-5 h-5 mr-3 text-blue-600" />
                  Sugerencias útiles:
                </h5>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">
                      Verifica que la URL esté escrita correctamente
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">
                      La página pudo haber sido movida
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">
                      Usa el menú de navegación principal
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">
                      Contacta al administrador si persiste
                    </p>
                  </div>
                </div>

                {/* Refresh Button */}
                <div className="mt-6 pt-4 border-t border-white/30">
                  <motion.button
                    onClick={handleRefresh}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 text-gray-700 hover:text-gray-900 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                    <span>Recargar página</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};