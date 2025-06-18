import Cookies from 'js-cookie';

const baseURL = String(import.meta.env.VITE_STAFF_SERVICE);

export class StaffAPI {
    static async getUserByProperties(property){
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${baseURL}/${property}`, { 
                method : 'GET', credentials : 'include',
                headers : {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                }, 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message)

            return {
                succes : true,
                data
            }

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

            const res = await fetch(`${baseURL}/?page=${page}&limit=${limit}`, { 
                method : 'GET', credentials : 'include',
                headers : {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                }, 
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message)
 
            return {
                succes : true,
                data
            }

        } catch (err) {
            return {
                succes : false,
                message : err.message || 'Internal Server Error'
            }
        }
    }
}