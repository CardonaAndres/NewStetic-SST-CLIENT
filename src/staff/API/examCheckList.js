import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_STAFF_SERVICE);

export class ExamCheckListAPI {
    static async getCheckListByUserDoc(userDoc){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/exam-checklist/${userDoc}`, { 
                method : 'GET', credentials : 'include',
                headers : { 'Content-Type': 'application/json', "authorization": `Bearer ${token}`} 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }

    static async associateExamType(checkListItemData){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/exam-checklist/`, { 
                method : 'POST', credentials : 'include',
                headers : { 'Content-Type': 'application/json', "authorization": `Bearer ${token}`},
                body: JSON.stringify(checkListItemData) 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }

    static async updateExamType(checkListItemData){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/exam-checklist/${checkListItemData?.checklist_id}`, { 
                method : 'PATCH', credentials : 'include',
                headers : { 'Content-Type': 'application/json', "authorization": `Bearer ${token}`},
                body: JSON.stringify(checkListItemData)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data?.message)
            return { success: true, data }

        } catch (err) {
            return { success: false, message: err.message || 'Internal Server Error' }
        }
    }
}