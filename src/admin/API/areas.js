import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_STAFF_SERVICE);

export class AreasAPI {
    static async getAreasPaginate(page = 1, limit = 20) {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/areas?page=${page}&limit=${limit}`, {
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

    static async getAreas(){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/areas/without-paginate`, {
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

    static async create(areaInfo){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/areas/`, {
                method : 'POST', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}` 
                },
                credentials : 'include', body : JSON.stringify(areaInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message || 'Internal Server Error')
            return { success : true, data }

        } catch (err) {
            return { success: false, message: err.message  }
        }
    }

    static async update(areaInfo){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/areas/${areaInfo.area_id}`, {
                method : 'PATCH', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}` 
                },
                credentials : 'include', body : JSON.stringify(areaInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message || 'Internal Server Error')
            return { success : true, data }

        } catch (err) {
            return { success: false, message: err.message  }
        }
    }
}