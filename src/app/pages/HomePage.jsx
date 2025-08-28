import Logo from '../assets/imgs/LOGO_NS_SINFONDO.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Lock, ChevronRight, Star, Eye, Menu, X, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { LoginModal } from '../../auth/components/LoginModal';
import { useAuth } from '../../auth/context/AuthContext';
import { Link } from 'react-router-dom';

// Array de imágenes de fondo para el carrusel
const backgroundImages = [
  '/Background_Fondo_NS.webp',
  '/Background_Fondo_NS2.webp',
  '/Background_Fondo_NS3.webp',
  '/Background_Fondo_NS4.webp'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Variantes para el carrusel de fondo
const backgroundVariants = {
  enter: {
    opacity: 0,
    scale: 1.1
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 1.5,
      ease: "easeIn"
    }
  }
};

// Variantes para el menú navbar
const navbarVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const menuItemVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const menuItems = [
  { icon: AlertTriangle, label: 'Reportar Incidentes', href: '' }
];

export const HomePage = () => {
  const { isAuth } = useAuth();
  const [modal, setModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const handleModal = () => setModal(!modal);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Carrusel de Imágenes de Fondo */}
      <div className="absolute inset-0">
        <AnimatePresence >
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImages[currentImageIndex]}')`
            }}
            variants={backgroundVariants}
            initial="enter"
            animate="center"
            exit="exit"
          />
        </AnimatePresence>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-5">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-yellow-300/30 to-yellow-400/30 blur-2xl"
          animate={{
            x: [0, 40, 0],
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
          className="absolute top-40 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/30 to-cyan-500/30 blur-2xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-28 h-28 rounded-full bg-gradient-to-r from-teal-600/25 to-teal-700/25 blur-2xl"
          animate={{
            x: [0, 35, 0],
            y: [0, -35, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-4 h-4 bg-yellow-400/60 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-500/60 rotate-45"
          animate={{
            y: [0, 15, 0],
            rotate: [45, 90, 45],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Header */}
          <header className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-15 h-15 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <img src={Logo} alt="" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">New Stetic</h1>
                <p className="text-sm text-gray-600 font-medium">Sistema SST</p>
              </div>
            </div>

            {/* Menu y Login Buttons */}
            <div className="flex items-center space-x-4">
              {/* Menu Toggle Button */}
              <motion.button
                onClick={toggleMenu}
                className="flex bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 items-center space-x-2 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">Más opciones</span>
              </motion.button>

              {/* Login Button */}
              <motion.button 
                onClick={handleModal}
                className="flex bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white items-center space-x-2 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAuth ? 
                  <>
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Bienvenido
                    </span>
                  </> :
                  <>
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Iniciar Sesión
                    </span>
                  </>
                }
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </header>

          {/* Horizontal Navbar Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                className="w-full bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
                variants={navbarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Menu Items Container */}
                <div className="flex flex-wrap items-center justify-center gap-2 p-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      className="flex items-center space-x-3 px-6 py-3 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group min-w-fit"
                      variants={menuItemVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-600/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-teal-600/30 transition-all duration-200">
                        <item.icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 whitespace-nowrap">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Decorative bottom gradient */}
                <div className="h-1 bg-gradient-to-r from-cyan-500 via-yellow-400 to-teal-600" />
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className={`flex flex-col lg:flex-row items-center justify-between gap-12 transition-all duration-500 ${
            isMenuOpen ? 'min-h-[60vh]' : 'min-h-[70vh]'
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-cyan-500/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/40 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Sistema Activo</span>
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
              </motion.div>
            </motion.div>

            <motion.h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="text-gray-900">Gestión</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-cyan-500 bg-clip-text text-transparent">
                SST
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Inteligente
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed font-medium"
              variants={itemVariants}
            >
              Plataforma integral para la gestión de Seguridad y Salud en el Trabajo.
              Optimiza procesos, reduce riesgos y garantiza el cumplimiento normativo con tecnología de vanguardia.
            </motion.p>
          </div>

          {/* Right Content - Enhanced Floating Cards */}
          <div className="flex-1 relative">
            <motion.div
              className="relative w-full max-w-md mx-auto"
              variants={itemVariants}
            >
              {/* Main Card */}
              <motion.div
                className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30"
                variants={floatingVariants}
                animate="animate"
              >
                <div className="relative flex items-center space-x-4 left-[11%]">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
                    <img src={Logo} alt="logo ns" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl">SST Inteligente</h3>
                    <p className="text-l text-gray-600">Seguridad y Salud en el Trabajo</p>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Floating Card 1 */}
              <motion.div
                className="absolute -top-6 -right-6 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-5 shadow-2xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Users className="w-7 h-7 text-white" />
                <div className="text-white text-xs font-medium mt-2">Team</div>
              </motion.div>

              {/* Enhanced Floating Card 2 */}
              <motion.div
                className="absolute -bottom-6 -left-6 rounded-2xl p-5 shadow-2xl bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-500"
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Shield className="w-7 h-7 text-gray-400" />
                <div className="text-gray-600 text-xs font-medium mt-2">Security</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <LoginModal open={modal} onClose={handleModal} />
    </div>
  );
};