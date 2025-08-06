import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_STAFF_SERVICE);

export class ExamTypesAPI {
    static async getExamTypes(condition = '') {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/examtypes/${condition}`, {
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

    static async create(examType) {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/examtypes/`, {
                method : 'POST', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}` 
                },
                credentials : 'include', body: JSON.stringify(examType)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message || 'Internal Server Error')
            return { success : true, data }

        } catch (err) {
            return { success: false, message: err.message  }
        }
    }

    static async update(examType) {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/examtypes/${examType.exam_type_id}`, {
                method : 'PATCH', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}` 
                },
                credentials : 'include', body: JSON.stringify(examType)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message || 'Internal Server Error')
            return { success : true, data }

        } catch (err) {
            return { success: false, message: err.message  }
        }
    }

}