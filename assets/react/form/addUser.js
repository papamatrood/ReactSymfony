import React, { useState } from "react";
import UserServices from "../services/userServices";
import { useNavigate } from "react-router-dom";

const AddUser = () => {

    const [form, setForm] = useState({
        firstname: { value: '', isValid: true },
        lastname: { value: '', isValid: true },
        email: { value: '', isValid: true },
        roles: { value: '', isValid: true },
        password: { value: '', isValid: true },
        passwordRepeated: { value: '', isValid: true }
    });

    let navigate = useNavigate();

    const handleChange = (event) => {
        const newField = event.target.name;
        const newValue = event.target.value;
        const newForm = { [newField]: { value: newValue } };
        setForm({ ...form, ...newForm });

    }

    function handleSubmit(event) {
        event.preventDefault();
        const rapport = {
            firstname: +form.firstname.value,
            lastname: +form.lastname.value,
            email: +form.email.value,
            roles: +form.roles.value,
            password: +form.password.value,
            passwordRepeated: form.passwordRepeated.value
        }
        
        UserServices.addUser(rapport).then(() => navigate('/list'));
    }

    return (
        <form className="add-rapport mt-5" onSubmit={handleSubmit}>
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
                                onChange={handleChange}
                            /></td>
                            <td width="10%"><input
                                name="lastname"
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Nom"
                                onChange={handleChange}
                            /></td>
                            <td width="12%"><input
                                name="email"
                                type="email"
                                className="form-control form-control-sm"
                                placeholder="Email"
                                onChange={handleChange}
                            /></td>
                            <td width="10%">
                                <select
                                name="roles"
                                className="form-select form-select-sm"
                                onChange={handleChange}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </td>
                            <td width="10%"><input
                                name="password"
                                type="password"
                                className="form-control form-control-sm"
                                placeholder="Mot de passe"
                                onChange={handleChange}
                            /></td>
                            <td width="18%"><input
                                name="passwordRepeated"
                                type="passwor"
                                className="form-control form-control-sm"
                                placeholder="Confirmation de mot de passe"
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