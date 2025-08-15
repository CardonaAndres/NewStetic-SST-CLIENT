import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const StatusBadge = ({ status, size = 'sm' }) => {
  // Función para obtener el estado visual
  const getStatusConfig = (status) => {
    const configs = {
      'Completado': { 
        bg: 'bg-green-100', 
        text: 'text-green-700', 
        icon: CheckCircle,
        dot: 'bg-green-500'
      },
      'Pendiente': { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-700', 
        icon: AlertCircle,
        dot: 'bg-yellow-500'
      },
      'Vencido': { 
        bg: 'bg-red-100', 
        text: 'text-red-700', 
        icon: AlertCircle,
        dot: 'bg-red-500'
      },
      'Reprogramado': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: Clock,
        dot: 'bg-blue-500'
      }
    };
    return configs[status] || configs['Pendiente'];
  };

  const statusConfig = getStatusConfig(status);
  
  const sizeClasses = {
    xs: {
      container: 'px-2 py-0.5 text-xs',
      dot: 'w-1 h-1 mr-1'
    },
    sm: {
      container: 'px-2.5 py-1 text-xs',
      dot: 'w-1.5 h-1.5 mr-1.5'
    },
    md: {
      container: 'px-4 py-2 text-sm',
      dot: 'w-2 h-2 mr-2'
    }
  };

  const currentSize = sizeClasses[size] || sizeClasses.sm;

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${statusConfig.bg} ${statusConfig.text} ${currentSize.container}`}>
      <div className={`${statusConfig.dot} rounded-full ${currentSize.dot}`}></div>
      <span className="truncate">{status}</span>
    </span>
  );
};