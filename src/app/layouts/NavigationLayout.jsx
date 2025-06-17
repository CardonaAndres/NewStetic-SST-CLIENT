import Logo from '../assets/imgs/LOGO_NS_SINFONDO.png';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { useNavigationHook } from '../hooks/useNavigationHook';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { LoadingScreen } from '../components/LoadingScreen';

export const NavigationLayout = ({ children, title = '' }) => {
  const location = useLocation();
  const { logout, user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { sidebarItems } = useNavigationHook(location.pathname);

  // Responsive breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // Desktop: sidebar abierto por defecto, Mobile: cerrado
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { 
      x: isMobile ? '-100%' : 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  if(loading) return <LoadingScreen />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative">
      {/* Background Effects - Optimized for mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 lg:opacity-20"
          style={{ backgroundImage: `url('/DashboardBackground.webp')` }}
        />
        
        {/* Animated Background Orbs - Reduced on mobile */}
        <motion.div
          className="absolute top-10 left-10 w-24 h-24 lg:w-64 lg:h-64 lg:top-20 lg:left-20 rounded-full bg-gradient-to-r from-yellow-300/5 to-cyan-400/5 lg:from-yellow-300/10 lg:to-cyan-400/10 blur-2xl lg:blur-3xl"
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-20 h-20 lg:w-48 lg:h-48 lg:bottom-20 lg:right-20 rounded-full bg-gradient-to-r from-purple-400/5 to-pink-400/5 lg:from-purple-400/10 lg:to-pink-400/10 blur-2xl lg:blur-3xl"
          animate={{
            x: [0, -10, 0],
            y: [0, 10, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="flex h-screen relative z-10 touch-manipulation">
        {/* Sidebar */}
        <motion.div 
          className={`sidebar bg-white/95 backdrop-blur-sm border-r border-white/30 shadow-xl overflow-hidden
            ${isMobile 
              ? 'fixed left-0 top-0 h-full z-50 w-80 max-w-[85vw]' 
              : `relative ${sidebarOpen ? 'w-72' : 'w-20'}`
            }`}
          variants={sidebarVariants}
          animate={sidebarOpen ? "open" : "closed"}
          style={{ 
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        >
          {/* Mobile Close Button */}
          {isMobile && (
            <div className="absolute top-4 right-4 z-10">
              <motion.button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          )}

          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-100/50">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-12 h-12 rounded-xl flex items-center justify-center p-1"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <img 
                  src={Logo} 
                  alt='logo ns' 
                  className="w-12 h-10 object-contain" 
                />
              </motion.div>
              
              <AnimatePresence mode="wait">
                {(sidebarOpen || isMobile) && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-0 flex-1"
                  >
                    <h2 className="font-bold text-gray-900 text-lg truncate">
                      New Stetic
                    </h2>
                    <p className="text-gray-500 text-sm truncate">
                      Sistema SST
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {sidebarItems.map((item, key) => {
              const Icon = item.icon;
              
              return (
                <Link 
                  to={item.path} 
                  key={key} 
                  className={`group w-full flex items-center space-x-1 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    item.isActive 
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100/60 hover:text-gray-900'
                  }`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  {item.isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-xl"
                      layoutId="activeBackground"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <Icon className="w-5 h-5 relative z-10 flex-shrink-0" />
                  
                  <AnimatePresence mode="wait">
                    {(sidebarOpen || isMobile) && (
                      <motion.span
                        className="font-medium relative z-10 text-left min-w-0 flex-1 truncate"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer - Solo en desktop */}
          {!isMobile && (
            <div className="p-4 border-t border-gray-100/50">
              <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {sidebarOpen ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-gray-400 text-center"
                    >
                      v1.0.0
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Navbar */}
          <motion.header
            className="bg-white/95 backdrop-blur-sm border-b border-white/30 shadow-lg px-4 py-4 lg:px-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="flex items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <motion.button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="sidebar-toggle p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-colors duration-200 flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </motion.button>
                
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-bold text-gray-900 truncate lg:text-xl">
                    {title}
                  </h1>
                  <p className="text-sm text-gray-500 truncate hidden sm:block">
                    New Stetic - Sistema SST
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                {/* Notifications */}
                <motion.button className="p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-colors duration-200 relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </motion.button>

                {/* User Menu */}
                <div className="relative user-menu ">
                  <motion.button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
                  </motion.button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-5 w-48 bg-white backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-2 z-[999]"
                      >
                        <div className="px-4 py-2 border-b border-gray-100/50">
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {user?.displayName || 'Usuario Anónimo'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.mail || 'No disponible'}
                          </p>
                        </div>
                        <div className="py-1">
                          <hr className="my-1 border-gray-100/50" />
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 flex items-center space-x-2 transition-colors"
                            onClick={logout}
                          >
                            <LogOut className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">Cerrar Sesión</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="flex-1 p-4 overflow-auto lg:p-6 overscroll-contain">
            <div className="h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};