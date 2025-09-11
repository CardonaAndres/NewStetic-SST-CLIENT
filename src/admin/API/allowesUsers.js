import Cookies from 'js-cookie';

const baseURL = `${String(import.meta.env.VITE_BASE_APIGATEWAY)}`;

export class AllowedUsersAPI {
    static async getUsers(){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/allowed-users/`, {
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

    static async giveAccess(userInfo){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/allowed-users/`, {
                method : 'POST', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}` 
                }, 
                credentials : 'include',
                body: JSON.stringify(userInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message || 'Internal Server Error')
            return { success : true, data }
            

        } catch (err) {
            return { success: false, message: err.message  }
        }
    }
    
    static async updateAccess(userInfo){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/allowed-users/${userInfo.userID}`, {
                method : 'PATCH', headers : { 
                    'Content-Type': 'application/json', 
                    "authorization": `Bearer ${token}` 
                },
                credentials : 'include',
                body: JSON.stringify(userInfo)
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message || 'Internal Server Error')
            return { success : true, data }
            

        } catch (err) {
            return { success: false, message: err.message  }
        }
    }

}