import { useState } from 'react';
import { toast } from 'react-toastify';
import { ExamLogsAPI } from '../API/examLogs.js';

export const useExamLogsHook = () => {
    const [examLogs, setExamLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const getLogs = async (checkListItemID, onClose) => {
        try {
            setLoading(true);
            const res = await ExamLogsAPI.getLogs(checkListItemID);
            if(!res.success) throw new Error(res.message)

            setExamLogs(res.data.logs)

        } catch (err) {
            onClose();
            toast.error(err.message || 'Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

    return {
        getLogs,
        examLogs,
        loading
    }
}
