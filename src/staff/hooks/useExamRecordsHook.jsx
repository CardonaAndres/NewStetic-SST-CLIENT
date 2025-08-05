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

    return {
        loading,
        examRecords,
        exam,
        meta,
        getExamRecords
    }
}

