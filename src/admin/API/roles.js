import Cookies from 'js-cookie';

const baseURL = `${String(import.meta.env.VITE_BASE_APIGATEWAY)}`;

export class RolesAPI {
    static async getRoles(){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/roles/`, {
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