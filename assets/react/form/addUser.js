import React, { useState } from "react";
import UserServices from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { userOptions } from "../helpers/userHelpers";

const AddUser = () => {

    const [form, setForm] = useState({
        firstname: { value: '', isValid: true },
        lastname: { value: '', isValid: true },
        email: { value: '', isValid: true },
        roles: { value: 'ROLE_USER', isValid: true },
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

    function handleSubmit(event) {
        event.preventDefault();
        let user = 'Avant'
        if (form.passwordRepeated.value === form.password.value) {
            user = {
                firstname: form.firstname.value,
                lastname: form.lastname.value,
                email: form.email.value,
                role: form.roles.value,
                password: form.password.value
            }
            console.log(user);
            UserServices.addUser(user).then(() => navigate('/'));
            setAlert(false);
            setForm({
                firstname: { value: '', isValid: true },
                lastname: { value: '', isValid: true },
                email: { value: '', isValid: true },
                roles: { value: 'ROLE_USER', isValid: true },
                password: { value: '', isValid: true },
                passwordRepeated: { value: '', isValid: true }
            });
        } else {
            setAlert(true);
            user = 'Pas de contenu !'
        }
    }

    return (
        <form className="add-user mt-5" onSubmit={handleSubmit}>
            {alert && <div className="alert alert-warning">Les mots de passe ne sont pas les mêmes !</div>}
            <fieldset className="border p-2">
                <legend>Ajouter un utilisateur</legend>
                <table className="table table-sm table-bordered table-striped text-center">
                    <tbody>
                        <tr>
                            <td width="10%"><input
                                name="firstname"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Prénom"
                                value={form.firstname.value}
                                onChange={handleChange}
                            /></td>
                            <td width="10%"><input
                                name="lastname"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Nom"
                                value={form.lastname.value}
                                onChange={handleChange}
                            /></td>
                            <td width="12%"><input
                                name="email"
                                type="email"
                                className="form-control form-control-sm"
                                placeholder="Email"
                                value={form.email.value}
                                onChange={handleChange}
                            /></td>
                            <td width="10%">
                                <select
                                    name="roles"
                                    className="form-select form-select-sm"
                                    value={form.roles.value}
                                    onChange={handleChange}
                                >
                                    {userOptions.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </td>
                            <td width="10%"><input
                                name="password"
                                type="password"
                                className="form-control form-control-sm"
                                placeholder="Mot de passe"
                                value={form.password.value}
                                onChange={handleChange}
                            /></td>
                            <td width="18%"><input
                                name="passwordRepeated"
                                type="password"
                                className="form-control form-control-sm"
                                placeholder="Confirmation de mot de passe"
                                value={form.passwordRepeated.value}
                                onChange={handleChange}
                            /></td>
                            <td width="15%">
                                <div className="d-grid gap-2">
                                    <button className="btn btn-sm btn-success" type="submit">Ajouter</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    )
}

export default AddUser;