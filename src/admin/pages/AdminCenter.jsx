import { motion } from 'framer-motion';
import { FileText, Settings } from 'lucide-react';
import { NavigationLayout } from "../../app/layouts/NavigationLayout";
import { router } from '../../app/config/config';

const adminOptions = [
    {
        id: 'tipos-examenes',
        title: 'Tipos de Exámenes',
        description: 'Gestionar y configurar los diferentes tipos de exámenes médicos',
        icon: FileText,
        color: 'from-blue-500 to-blue-600',
        hoverColor: 'from-blue-600 to-blue-700',
        bgGradient: 'from-blue-50 to-blue-100',
        path: router.examTypesManager
    }
];

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

const cardVariants = {
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
        damping: 20
      }
    }
};

const handleCardClick = option => window.location.href = option.path;

export const AdminCenter = () => {
  return (
    <NavigationLayout title="Administración del Software SST - NewStetic">
        {/* Header */}
        <motion.div className="mb-10 z-0" initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} 
        >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg p-8">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                            <Settings className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Panel de Administración
                        </h1>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                        Gestiona y configura todos los aspectos del sistema SST desde un solo lugar. 
                        <span className="text-gray-500"> Accede a las herramientas de configuración y control.</span>
                        </p>
                    </div>
                    <div className="hidden lg:block">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-700">Total de módulos</p>
                            <p className="text-2xl font-bold text-gray-900">{adminOptions.length}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        >
        {adminOptions.map((option) => {
            const Icon = option.icon;
            
            return (
            <motion.div
                key={option.id}
                variants={cardVariants}
                className="group cursor-pointer"
                onClick={() => handleCardClick(option)}
                whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
            >
                <div className={`
                relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm 
                border border-white/30 shadow-lg hover:shadow-2xl
                transition-all duration-300 group-hover:border-white/50
                h-full
                `}>
                {/* Background Gradient Overlay */}
                <div className={`
                    absolute inset-0 bg-gradient-to-br ${option.bgGradient} opacity-0 
                    group-hover:opacity-30 transition-opacity duration-300
                `} />
                
                {/* Content */}
                <div className="relative p-6 h-full flex flex-col">
                    {/* Icon Container */}
                    <div className={`
                    w-16 h-16 rounded-xl bg-gradient-to-r ${option.color}
                    group-hover:bg-gradient-to-r group-hover:${option.hoverColor}
                    flex items-center justify-center mb-4
                    transition-all duration-300 shadow-lg
                    group-hover:shadow-xl group-hover:scale-110
                    `}>
                    <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {option.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 group-hover:text-gray-700 transition-colors">
                    {option.description}
                    </p>

                    {/* Action Indicator */}
                    <div className="mt-4 flex items-center text-gray-400 group-hover:text-gray-600 transition-colors">
                    <span className="text-sm font-medium">Acceder</span>
                    <motion.div
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                        }}
                    >
                        →
                    </motion.div>
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </motion.div>
            );
        })}
        </motion.div>
    </NavigationLayout>
  )
}