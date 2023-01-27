export default class UserServices {

    static getUsers() {
        return fetch(`http://localhost:8000/api/users`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static addUser(user) {
        return fetch(`http://localhost:8000/api/user`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static editUser(user) {
        return fetch(`http://localhost:8000/api/edit_user`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static updateUser(user) {
        return fetch(`http://localhost:8000/api/user/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static deleteUser(user) {
        return fetch(`http://localhost:8000/api/user/delete/${user.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static Login(user) {
        return fetch(`http://localhost:8000/api/login/${user.id}`, {
            method: 'GET',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static handleError(error) {
        console.log(error);
    }


}