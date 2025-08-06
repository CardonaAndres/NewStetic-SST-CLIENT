import { useState } from "react";
import { toast } from 'react-toastify';
import { ExamTypesAPI } from "../API/examTypes";

export const useExamTypesHook = () => {
    const [examTypes, setExamTypes] = useState([]);
    const [loading, setLoading] = useState();
    
    const getExamTypes = async (condition = '') => {
        try {
            setLoading(true);

            const res = await ExamTypesAPI.getExamTypes(condition);
            if(!res.success) throw new Error(res.message)
            setExamTypes(res.data.examTypes)

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const createOrEditExamType = async (isEdit, examTypeData, onClose) => {
        try {
            setLoading(true);

            const res = isEdit ? await ExamTypesAPI.update(examTypeData) 
             : await ExamTypesAPI.create(examTypeData)

            if(!res.success) throw new Error(res.message)

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

    return {
        loading,
        examTypes,
        getExamTypes,
        createOrEditExamType
    }
}