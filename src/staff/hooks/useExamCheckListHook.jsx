import { useState } from "react";
import { toast } from 'react-toastify';
import { ExamCheckListAPI } from "../API/examCheckList";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Ban,
  Info
} from "lucide-react";

export const useExamCheckListHook = () => {
    const [loading, setLoading] = useState(false);
    const [examChekList, setExamChekList] = useState([]);

    const getCheckLiist = async userDoc => {
        try {
            setLoading(true);
            const res = await ExamCheckListAPI.getCheckListByUserDoc(userDoc);
            if(!res.success) throw new Error(res.message)

            setExamChekList(res.data.examsCheckList)

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const associateOrUpdateExamType = async (isEditing, checkListItemData, onClose) => {
        try {
            setLoading(true);
            const res = isEditing ? 
             await ExamCheckListAPI.updateExamType(checkListItemData) : 
             await ExamCheckListAPI.associateExamType(checkListItemData);

            if(!res.success) throw new Error(res.message);

            onClose();
            toast.success('Todo listo, proceso exitoso', {
                position: "top-left",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

        } catch (err) {
            onClose();
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getStatusConfig = (exam) => {
        switch (exam.estado_examen) {
            case 'Bien':
                return {
                    icon: CheckCircle,
                    color: 'text-green-600',
                    bg: 'bg-green-100',
                    label: 'Bien',
                    gradient: 'from-green-500 to-green-600',
                    progress: 100,
                    description: 'Examen aprobado y vigente'
                };
            case 'Vencido':
                return {
                    icon: XCircle,
                    color: 'text-red-600',
                    bg: 'bg-red-100',
                    label: 'Vencido',
                    gradient: 'from-red-500 to-red-600',
                    progress: 0,
                    description: 'Examen vencido, requiere renovación'
                };
            case 'Proximo a vencer':
                return {
                    icon: AlertTriangle,
                    color: 'text-yellow-600',
                    bg: 'bg-yellow-100',
                    label: 'Próximo a vencer',
                    gradient: 'from-yellow-500 to-yellow-600',
                    progress: 80,
                    description: 'Vence en 30 días o menos'
                };
            case 'En proceso':
                return {
                    icon: RefreshCw,
                    color: 'text-blue-600',
                    bg: 'bg-blue-100',
                    label: 'En proceso',
                    gradient: 'from-blue-500 to-blue-600',
                    progress: 60,
                    description: 'Examen en procesamiento o revisión'
                };
            case 'Requiere acción':
                return {
                    icon: AlertCircle,
                    color: 'text-orange-600',
                    bg: 'bg-orange-100',
                    label: 'Requiere acción',
                    gradient: 'from-orange-500 to-orange-600',
                    progress: 30,
                    description: 'Examen rechazado u observado'
                };
            case 'No requerido':
                return {
                    icon: Ban,
                    color: 'text-gray-600',
                    bg: 'bg-gray-100',
                    label: 'No requerido',
                    gradient: 'from-gray-500 to-gray-600',
                    progress: 100,
                    description: 'Marcado como no requerido'
                };
            case 'Pendiente':
                return {
                    icon: Clock,
                    color: 'text-purple-600',
                    bg: 'bg-purple-100',
                    label: 'Pendiente',
                    gradient: 'from-purple-500 to-purple-600',
                    progress: 20,
                    description: 'Examen pendiente de realización'
                };
            case 'Sin información':
            default:
                return {
                    icon: Info,
                    color: 'text-gray-600',
                    bg: 'bg-gray-100',
                    label: 'Sin información',
                    gradient: 'from-gray-500 to-gray-600',
                    progress: 0,
                    description: 'No hay información del examen'
                };
        }
    }

    return {
        loading,
        examChekList,
        getCheckLiist,
        getStatusConfig,
        associateOrUpdateExamType
    }
}


