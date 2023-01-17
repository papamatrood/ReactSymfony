import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dateHelper from "../helpers/helpers";
import RapportServices from "../services/rapportServices";

function RapportForm({ rapport }) {
    const [form, setForm] = useState({
        installation: { value: rapport.installation, isValid: true },
        interqualite: { value: rapport.interqualite, isValid: true },
        interdepannage: { value: rapport.interdepannage, isValid: true },
        visite: { value: rapport.visite, isValid: true },
        recuperation: { value: rapport.recuperation, isValid: true },
        autre: { value: rapport.autre, isValid: true },
        createdAt: { value: rapport.createdAt, isValid: true }

    });

    let navigate = useNavigate();
    let rapportDate = dateHelper(form.createdAt.value);


    const handleChange = (event) => {
        const newField = event.target.name;
        const newValue = event.target.value;

        const newForm = { [newField]: { value: newValue } };

        setForm({ ...form, ...newForm });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        rapport.installation = form.installation.value;
        rapport.interqualite = form.interqualite.value;
        rapport.interdepannage = form.interdepannage.value;
        rapport.visite = form.visite.value;
        rapport.recuperation = form.recuperation.value;
        rapport.autre = form.autre.value;
        console.log(rapport);
        RapportServices.updateRapport(rapport).then(() => navigate('/list'));
    }


    return <form onSubmit={handleSubmit}>
        <div className="modal-body">
            <div className="row mb-3">
                <div className="col">
                    <label for="installations" className="form-label">Installations:</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        id="installations"
                        name="installation"
                        value={form.installation.value}
                        onChange={handleChange} />
                </div>
                <div className="col">
                    <label for="interqualites" className="form-label">Inter-Qualités:</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        id="interqualites"
                        name="interqualite"
                        value={form.interqualite.value}
                        onChange={handleChange} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label for="interdepannages" className="form-label">Inter-Dépannages:</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        id="interdepannages"
                        name="interdepannage"
                        value={form.interdepannage.value}
                        onChange={handleChange} />
                </div>
                <div className="col">
                    <label for="visites" className="form-label">Visites:</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        id="visites"
                        name="visite"
                        value={form.visite.value}
                        onChange={handleChange} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label for="recuperations" className="form-label">Récuperations:</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        id="recuperations"
                        name="recuperation"
                        value={form.recuperation.value}
                        onChange={handleChange} />
                </div>
                <div className="col">
                    <label for="autres" className="form-label">Autres:</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="autres"
                        name="autre"
                        value={form.autre.value}
                        onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label for="rapportDate" className="form-label">Date:</label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        id="rapportDate"
                        name="createdAt"
                        value={rapportDate}
                        onChange={handleChange} />
                </div>
                <div className="col"></div>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Modifier le rapport</button>
        </div>
    </form>
}

export default RapportForm;