import React, { useState } from "react";
import UserServices from "../services/userServices";

const Login = () => {

    const [form, setForm] = useState({
        email: { value: '', isValid: true },
        password: { value: '', isValid: true }
    });

    const [alert, setAlert] = useState(false);


    const handleChange = (event) => {
        const newField = event.target.name;
        const newValue = event.target.value;
        const newForm = { [newField]: { value: newValue } };
        setForm({ ...form, ...newForm });
    }

    function handleSubmit(event) {
        event.preventDefault();
        let user = ''
        if (form.email.value !== "" && form.password.value !== "") {
            user = {
                email: form.firstname.value,
                password: form.password.value
            }
            console.log(user);
            UserServices.Login(user).then(() => navigate('/'));
            setAlert(false);
            setForm({
                email: { value: '', isValid: true },
                password: { value: '', isValid: true }
            });
        } else {
            setAlert(true);
            user = 'Veuillez remplir le formulaire correctement !'
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                {alert && <div className="alert alert-danger">Veuillez remplir le formulaire correctement !</div>}
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2>Se connecter</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-3">
                            <label for="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Entrez l'e-mail"
                                name="email"
                                value={form.email.email}
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label for="password">mot de passe:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Entrer le mot de passe"
                                name="password"
                                value={form.email.password}
                                onChange={handleChange} />
                        </div>
                        {/* <div className="form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                    </label>
                </div> */}
                        <button type="submit" className="btn btn-primary">Se connecter</button>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>

        </div>
    )
}

export default Login;