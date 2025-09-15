import Cookies from 'js-cookie';

const baseURL = `${String(import.meta.env.VITE_BASE_APIGATEWAY)}`;

export class PermissionsAPI {
    static async getPermissions(){
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/roles-permissions`, {
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

    static async getPermissionsByRole(roleID){
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/roles-permissions/${roleID}`, {
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