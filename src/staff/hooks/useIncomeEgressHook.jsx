import { useState } from "react";
import { toast } from 'react-toastify';
import { ExamRecordsAPI } from "../API/examRecords";
import { IncomeOrEgressExamsAPI } from "../API/IncomeEgress";

export const useIncomeEgressHook = () => {
  const [ loading, setLoading ] = useState();
  const [ exams, setExams ] = useState([]);
  const [ examType, setExamType ] = useState('');

  const getExams = async (userDoc, typeExam = 'income') => {
    try {
        setLoading(true);
        const res = await IncomeOrEgressExamsAPI.getExams(userDoc, typeExam);

        if(!res.success) throw new Error(res.message || 'Error al obtener los exámenes');

        setExams(res.data.exams);
        setExamType(typeExam === 'income' ? 'Ingreso' : 'Egreso');
           
    } catch (err) {
        toast.error(err.message || 'Internal Server Error');
    } finally {
        setLoading(false);
    }
  }

  const registerOrUpdate = async (isEditing, onClose, examData, examType = 'income') => {
    try {
      setLoading(true);
      const checklistItemID = (examData.has('checklist_item_id') && isEditing) 
        ? examData.get('checklist_item_id') 
        : null

      const res = isEditing 
        ? await ExamRecordsAPI.updateExam(examData, checklistItemID)
        : await IncomeOrEgressExamsAPI.registerExam(examData, examType);

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
      toast.error(err.message || 'Internal Server Error');
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    exams,
    examType,
    getExams,
    registerOrUpdate
  }
}


