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

    static async createRole(roleInfo){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/roles/`, {
                method : 'POST', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}` 
                }, 
                credentials : 'include',
                body: JSON.stringify(roleInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message || 'Internal Server Error')
            return { success : true, data }

        } catch (err) {
            return { success: false, message: err.message  }
        }
    }

    static async updateRole(roleInfo){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/roles/${roleInfo.roleID}`, {
                method : 'PATCH', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}` 
                },
                credentials : 'include',
                body: JSON.stringify(roleInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message || 'Internal Server Error')
            return { success : true, data }

        } catch (err) {
            return { success: false, message: err.message  }
        }
    }
}