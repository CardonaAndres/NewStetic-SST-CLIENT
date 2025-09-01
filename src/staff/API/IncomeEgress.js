import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_BASE_APIGATEWAY);

export class IncomeOrEgressExamsAPI {
    static async getExams(userDoc, typeExam = 'income'){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/exam-records/inc-eg/${userDoc}/?typeExam=${typeExam}`, { 
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

    static async registerExam(recordData, examType = 'income'){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/exam-records/inc-eg/?typeExam=${examType}`, { 
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
    
}