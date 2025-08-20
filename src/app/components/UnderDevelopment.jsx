import { motion } from 'framer-motion';
import { Construction, Hammer, Code, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { router } from '../config/config';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
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
    y: [0, -12, 0],
    rotate: [0, 8, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const UnderDevelopment = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 w-80 h-80 bg-gradient-to-r from-teal-300/8 to-cyan-400/8 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-r from-yellow-300/8 to-amber-400/8 rounded-full blur-3xl"
          animate={{
            x: [0, -35, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-300/6 to-teal-400/6 rounded-full blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Side - Visual */}
          <motion.div 
            className="text-center lg:text-left relative"
            variants={leftVariants}
          >
            {/* Main Development Icon */}
            <motion.div 
              className="relative inline-block mb-10"
              variants={floatingVariants}
              animate="animate"
            >
              <div className="w-48 h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Construction className="w-24 h-24 lg:w-28 lg:h-28 text-white" />
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Hammer className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-6 w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -180, -360]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <Code className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                  x: [0, 15, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>

            {/* Progress Dots */}
            <motion.div 
              className="flex justify-center lg:justify-start space-x-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-teal-400 to-yellow-500"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
            <div className="bg-gradient-to-r from-yellow-100/80 to-teal-100/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">⏱️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Estado del proyecto</p>
                    <p className="text-sm text-gray-600">Desarrollo activo en progreso</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-gradient-to-r from-teal-400 to-yellow-500 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="space-y-8"
            variants={rightVariants}
          >
            {/* Main Message Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-white/40 shadow-2xl p-10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mr-5">
                  <Construction className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Sección en Desarrollo</h2>
                  <p className="text-teal-600 font-medium">Trabajando en nuevas funcionalidades</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Esta funcionalidad está siendo desarrollada cuidadosamente por nuestro equipo. 
                Implementamos las mejores prácticas para ofrecerte una experiencia excepcional.
              </p>

              {/* Features Preview */}
              <div className="bg-gradient-to-r from-teal-50/80 to-yellow-50/80 rounded-2xl p-6 mb-8">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                  Qué puedes esperar:
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">✨</span>
                    </div>
                    <span className="text-sm text-gray-700">Interfaz intuitiva</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">🚀</span>
                    </div>
                    <span className="text-sm text-gray-700">Rendimiento optimizado</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">🔒</span>
                    </div>
                    <span className="text-sm text-gray-700">Máxima seguridad</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">📊</span>
                    </div>
                    <span className="text-sm text-gray-700">Datos en tiempo real</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-5">
                <motion.button
                  onClick={handleGoBack}
                  className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium border-2 border-gray-200 hover:border-gray-300"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Regresar</span>
                </motion.button>
            
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};