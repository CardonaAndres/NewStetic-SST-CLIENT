import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_BASE_APIGATEWAY);

export class StaffAPI {
    static async getUserByProperties(property){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/staff/${property}`, { 
                method : 'GET', credentials : 'include',
                headers : { 'Content-Type': 'application/json', "authorization": `Bearer ${token}`} 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message)

            return { succes : true, data }

        } catch (err) {
            return {
                succes : false,
                message : err.message || 'Internal Server Error'
            }
        }
    } 

    static async getUserIdlesByProperties(property){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/staff/idles/${property}`, { 
                method : 'GET', credentials : 'include',
                headers : { 'Content-Type': 'application/json', "authorization": `Bearer ${token}`} 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message)

            return { succes : true, data }

        } catch (err) {
            return {
                succes : false,
                message : err.message || 'Internal Server Error'
            }
        }
    } 

    static async getUsers(page = 1, limit = 30){
        try {
            const token = Cookies.get('token');

            const res = await fetch(`${baseURL}/staff/?page=${page}&limit=${limit}`, { 
                method : 'GET', credentials : 'include',
                headers : {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                }, 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message)
 
            return { succes : true, data }

        } catch (err) {
            return {
                succes : false,
                message : err.message || 'Internal Server Error'
            }
        }
    }

    static async getUsersIdles(page = 1, limit = 30){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/staff/idles?page=${page}&limit=${limit}`, { 
                method : 'GET', credentials : 'include',
                headers : { 'Content-Type': 'application/json', "authorization": `Bearer ${token}`}
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message)
 
            return { succes : true, data }

        } catch (err) {
            return { succes : false, message : err.message || 'Internal Server Error'}
        }
    }

    static async getUserWorkHistory(docNumber){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/staff/history/${docNumber}`, { 
                method : 'GET', credentials : 'include',
                headers : { 'Content-Type': 'application/json', "authorization": `Bearer ${token}` } 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message)
 
            return { succes : true, data }

        } catch (err) {
            return { succes : false, message : err.message || 'Internal Server Error' }
        }
    }

}