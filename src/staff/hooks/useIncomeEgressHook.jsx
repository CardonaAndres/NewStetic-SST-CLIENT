import { useState } from "react";
import { toast } from 'react-toastify';
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

  return {
    loading,
    exams,
    examType,
    getExams
  }
}


