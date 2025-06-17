import Logo from '../../app/assets/imgs/LOGO_NS_SINFONDO.png';
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, User, X } from "lucide-react"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { router } from '../../app/config/config';

const fieldVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export const LoginForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const { login, isAuth } = useAuth();
  const onSubmited = handleSubmit(async (userData) => await login(userData.username, userData.password))

  useEffect(() => {
    if(isAuth) navigate(router.staff)
  }, [isAuth, navigate])

  return (
    <motion.div initial="initial" animate="animate" exit="exit" className="relative">
      {/* Fondo simplificado */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20" />

      {/* Contenido */}
      <div className="relative z-10 p-8">
        {/* Encabezado */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-3">
            <img src={Logo} className='w-12 h-12 rounded-xl' />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={onSubmited} className="space-y-6">
          {/* Usuario */}
          <motion.div variants={fieldVariants} transition={{ delay: 0.1 }}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                {...register('username', {
                  required: 'El usuario es requerido',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                })}
                placeholder="Ingresa tu usuario"
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-gray-700 font-medium shadow-sm placeholder-gray-400"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-2 ml-1">
                {errors.username.message}
              </p>
            )}
          </motion.div>

          {/* Contraseña */}
          <motion.div variants={fieldVariants} transition={{ delay: 0.2 }}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                placeholder="Ingresa tu contraseña"
                className="w-full pl-12 pr-12 py-4 bg-white/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-gray-700 font-medium shadow-sm placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 ml-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {/* Botón Enviar */}
          <motion.div variants={fieldVariants} transition={{ delay: 0.3 }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
