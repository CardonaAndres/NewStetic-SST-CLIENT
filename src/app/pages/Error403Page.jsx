import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Home, Mail } from 'lucide-react';

export const Error403Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative">
            {/* Decoración de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-yellow-400/5"></div>
            
            <div className="relative px-8 py-16 md:px-16 md:py-24">
              <div className="text-center">
                {/* Icono principal */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-teal-500 to-yellow-400 rounded-full mb-8 shadow-lg">
                  <Shield className="w-12 h-12 text-white" />
                </div>

                {/* Código de error */}
                <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text text-transparent mb-4">
                  403
                </h1>

                {/* Título */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Acceso Prohibido
                </h2>

                {/* Descripción */}
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Lo sentimos, no tienes permisos para acceder a esta página. 
                  Es posible que necesites iniciar sesión o que no tengas los privilegios necesarios.
                </p>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={() => window.history.back()}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver Atrás
                  </button>
                  
                  <Link 
                    onClick={() => window.location.href = '/'}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Ir al Inicio
                  </Link>
                </div>

                {/* Información adicional */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-teal-500" />
                      <span>¿Necesitas ayuda? Contacta al administrador</span>
                    </div>
                    <div className="hidden md:block w-px h-4 bg-gray-300"></div>
                    <span>Código de error: HTTP 403 Forbidden</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer decorativo */}
        <div className="text-center mt-8">
          <div className="inline-flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === 0 ? 'bg-teal-400' : i === 1 ? 'bg-yellow-400' : 'bg-teal-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
