import { useState } from "react";
import { toast } from 'react-toastify';
import { ExamRecordsAPI } from "../API/examRecords";

export const useExamRecordsHook = () => {
    const [loading, setLoading] = useState(false);
    const [examRecords, setExamRecords] = useState([]);
    const [exam, setExam] = useState({});
    const [meta, setMeta] = useState({});

    const getExamRecords = async (checkListItemID, page = 1, limit = 10) => {
        try {
            setLoading(true);
            const res = await ExamRecordsAPI.getExamRecords(checkListItemID, page, limit);
            if(!res.success) throw new Error(res.message)

            const { records, ...examInfo } = res.data.examCheckListItem;   

            setMeta(res.data.meta)
            setExam(examInfo)
            setExamRecords(records);

        } catch (err) {
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    const registerOrUpdateExam = async (isEditing, onClose, recordData) => {
        try {
            setLoading(true);
            const checklistItemID = (recordData.has('checklist_item_id') && isEditing) 
             ? recordData.get('checklist_item_id') 
             : null

            const res = isEditing 
             ? await ExamRecordsAPI.updateExam(recordData, checklistItemID)
             : await ExamRecordsAPI.registerExam(recordData);

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

    const deleteExam = async (itemInfo, onClose, setIsDeleting, setShowFinalConfirmation) => {
        try {
            setIsDeleting(true);
            setLoading(true);

            const res = await ExamRecordsAPI.delete(itemInfo.itemID, itemInfo.deletionReason);
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
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setIsDeleting(false);
            setLoading(false);
            setShowFinalConfirmation(false);
        }
    }

    return {
        loading,
        examRecords,
        exam,
        meta,
        getExamRecords,
        registerOrUpdateExam,
        deleteExam
    }
}