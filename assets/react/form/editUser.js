import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userOptions } from "../helpers/userHelpers";
import UserServices from "../services/userServices";

function EditUser({ user }) {
    const [form, setForm] = useState({
        id: { value: user.id, isValid: true },
        firstname: { value: user.firstname, isValid: true },
        lastname: { value: user.lastname, isValid: true },
        email: { value: user.email, isValid: true },
        roles: { value: user.roles, isValid: true },
        password: { value: '', isValid: true },
        passwordRepeated: { value: '', isValid: true }

    });

    const [alert, setAlert] = useState(false);

    let navigate = useNavigate();


    const handleChange = (event) => {
        const newField = event.target.name;
        const newValue = event.target.value;
        const newForm = { [newField]: { value: newValue } };
        setForm({ ...form, ...newForm });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let editUser = 'Avant'
        if (form.passwordRepeated.value === form.password.value) {
            editUser = {
                id: form.id.value,
                firstname: form.firstname.value,
                lastname: form.lastname.value,
                email: form.email.value,
                role: form.roles.value,
                password: form.password.value
            }
            console.log(editUser);
            UserServices.editUser(editUser).then(() => navigate('/users'));
            setAlert(false);
        } else {
            setAlert(true);
            editUser = 'Pas de contenu !'
        }
    }


    return <form onSubmit={handleSubmit}>
        {alert && <div className="alert alert-warning">Les mots de passe ne sont pas les mêmes !</div>}
        <div className="modal-body">
            <div className="row mb-3">
                <div className="col">
                    <label for="firstname" className="form-label">Prénom:</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="firstname"
                        name="firstname"
                        value={form.firstname.value}
                        onChange={handleChange} />
                </div>
                <div className="col">
                    <label for="lastname" className="form-label">Nom:</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="lastname"
                        name="lastname"
                        value={form.lastname.value}
                        onChange={handleChange} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label for="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control form-control-sm"
                        id="email"
                        name="email"
                        value={form.email.value}
                        onChange={handleChange} />
                </div>
                <div className="col">
                    <label for="roles" className="form-label">Rôles:</label>
                    <select
                        className="form-select form-select-sm"
                        id="roles"
                        name="roles"
                        value={form.roles.value}
                        onChange={handleChange} >
                        {userOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label for="password" className="form-label">Mot de passe:</label>
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        id="password"
                        name="password"
                        value={form.password.value}
                        onChange={handleChange} />
                </div>
                <div className="col">
                    <label for="passwordRepeated" className="form-label">Confirmer le mot de passe:</label>
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        id="passwordRepeated"
                        name="passwordRepeated"
                        value={form.passwordRepeated.value}
                        onChange={handleChange} />
                </div>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Modifier l'utilisateur</button>
        </div>
    </form>
}

export default EditUser;