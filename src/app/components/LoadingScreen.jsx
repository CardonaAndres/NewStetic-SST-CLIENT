import Logo from '../assets/imgs/LOGO_NS_SINFONDO.png';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, CheckCircle } from 'lucide-react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingMessages = [
    "Inicializando sistema...",
    "Conectando con servidor...",
    "Cargando módulos SST...",
    "Verificando permisos...",
    "Preparando dashboard...",
    "¡Listo para comenzar!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          return prev;
        }
        return prev + 2;
      });
    }, 100);

    const stageTimer = setInterval(() => {
      setLoadingStage(prev => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(stageTimer);
    };
  }, []);

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const particleVariants = {
    animate: (i) => ({
      y: [0, -30, 0],
      x: [0, Math.sin(i) * 20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400/30 to-cyan-500/30"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i * 5)}%`,
            }}
            variants={particleVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>

      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-yellow-300/10 to-yellow-400/10 blur-2xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-2xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 25, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo Container */}
        <motion.div
          className="mb-8"
          variants={logoVariants}
          initial="initial"
          animate={["animate", "pulse"]}
        >
          <div className="relative">
            {/* Logo Background Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main Logo */}
            <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl mx-auto">
              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <img src={Logo} alt='logo NS' className='w-24' />
              </motion.div>
            </div>

            {/* Orbiting Icons */}
            <motion.div
              className="absolute inset-0 w-24 h-24 mx-auto"
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.2 }}
              >
                <Activity className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute inset-0 w-24 h-24 mx-auto"
              animate={{ rotate: -360 }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.2 }}
              >
                <CheckCircle className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Company Name */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-gray-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
              New Stetic
            </span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">Sistema SST</p>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div
          className="w-80 mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Progress Bar Background */}
          <div className="relative h-3 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
            {/* Animated Progress Bar */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-cyan-500 to-blue-600 rounded-full shadow-lg"
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
            
            {/* Shimmer Effect */}
            <motion.div
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between items-center mt-3">
            <motion.span
              className="text-sm font-medium text-gray-600"
              key={loadingStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingMessages[loadingStage]}
            </motion.span>
            <motion.span
              className="text-sm font-bold text-blue-700"
              animate={{ scale: progress % 10 === 0 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Completion Animation */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/30"
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-lg font-semibold text-gray-800">¡Sistema Listo!</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
