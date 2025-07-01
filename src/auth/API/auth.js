const baseURL = String(import.meta.env.VITE_AUTH_SERVICE);
const appName = String(import.meta.env.VITE_APP_NAME);

export class AuthAPI {
    static async login(username, password){
        try {
            const res = await fetch(`${baseURL}/login-by-da`, {
                method : 'POST', headers : { 'Content-Type': 'application/json' },
                credentials : 'include', body: JSON.stringify({ username, password, appName })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');
            
            return { success : true, data }

        } catch (err) {
            return { success : false, message : err.message || 'An error occurred during login.' }
        }
    }
}