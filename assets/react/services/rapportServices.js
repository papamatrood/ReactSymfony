export default class RapportServices {

    static updateRapport(rapport) {
        return fetch(`http://localhost:8000/api/rapport/${rapport.id}`, {
            method: 'PUT',
            body: JSON.stringify(rapport),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static deleteRapport(rapport) {
        return fetch(`http://localhost:8000/api/rapport/delete/${rapport.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static handleError(error) {
        console.log(error);
    }


}