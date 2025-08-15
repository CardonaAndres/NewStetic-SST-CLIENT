import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_REPORTS_SERVICE);

export class ReportsAPI {
     static async generateReport(page = 1, limit = 20, complementUrl = '') {
        try {
            const token = Cookies.get('token');
            const res = await fetch(
                `${baseURL}/checklist-exams/?page=${page}&limit=${limit}${complementUrl}`, {
                method : 'GET', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}` 
                },
                credentials : 'include'
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message || 'Internal Server Error')
            return { success : true, data }

        } catch (err) {
            return { success: false, message: err.message  }
        }
    }
}