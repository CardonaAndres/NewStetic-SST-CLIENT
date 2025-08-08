import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_STAFF_SERVICE);

export class ExamRecordsAPI {
    static async getExamRecords(checkListItemID, page = 1, limit = 20){
        try {
            const token = Cookies.get('token');
            const res = await fetch(
                `${baseURL}/exam-records/${checkListItemID}?page=${page}&limit=${limit}`, { 
                method : 'GET', credentials : 'include',
                headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}`
                } 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }

    static async registerExam(recordData){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/exam-records/`, { 
                method : 'POST', credentials : 'include',
                headers : {
                    "authorization": `Bearer ${token}`
                }, body: recordData
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }

    static async updateExam(recordData, checklistItemID){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/exam-records/${checklistItemID}`, { 
                method : 'PATCH', credentials : 'include',
                headers : {
                    "authorization": `Bearer ${token}`
                }, body: recordData
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }

    static async delete(checklistItemID, deletionReason){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/exam-records/${checklistItemID}`, { 
                method : 'DELETE', credentials : 'include',
                headers : {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                }, body: JSON.stringify({ deletionReason })
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }
}