export default class AuthenticatorServices {
    static isAuthenticated = false;

    static login(username, password) {
        const isAuthenticated = (username === "admin@afribonemali.net" && password === "admin");

        return new Promise(resolve => {
            setTimeout(() => {
                this.isAuthenticated = isAuthenticated;
                resolve(isAuthenticated);
            }, 1000);
        })
    }

    static logout() {
        const isAuthenticated = false;

        return new Promise(resolve => {
            setTimeout(() => {
                this.isAuthenticated = isAuthenticated;
                resolve(isAuthenticated);
            }, 1000);
        })
    }

}