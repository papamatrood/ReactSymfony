import React, { useState } from "react";
import RapportServices from "../services/rapportServices";
import { useNavigate } from "react-router-dom";
import { useAddRapport } from "../hooks/rapportHooks";

const FormRapport = ({ addRapport }) => {

    const [form, setForm] = useState({
        installation: { value: '', isValid: true },
        interqualite: { value: '', isValid: true },
        interdepannage: { value: '', isValid: true },
        visite: { value: '', isValid: true },
        recuperation: { value: '', isValid: true },
        autre: { value: '', isValid: true },
        createdAt: { value: '', isValid: true }
    });

    let navigate = useNavigate();

    const { errors, load, loading } = useAddRapport('http://localhost:8000/api/addRapport', 'POST', addRapport);

    const handleChange = (event) => {
        const newField = event.target.name;
        const newValue = event.target.value;
        const newForm = { [newField]: { value: newValue } };
        setForm({ ...form, ...newForm });

    }

    function handleSubmit(event) {
        event.preventDefault();
        const rapport = {
            installation: +form.installation.value,
            interqualite: +form.interqualite.value,
            interdepannage: +form.interdepannage.value,
            visite: +form.visite.value,
            recuperation: +form.recuperation.value,
            autre: form.autre.value,
            createdAt: new Date()
        }
        console.log(rapport);
        load(rapport);
    }

    const defaultDate = new Date().toISOString().substring(0, 10);

    return (
        <form className="add-rapport mt-5" onSubmit={handleSubmit}>
            <fieldset className="border p-2">
                <legend>Ajouter un rapport d'activité</legend>
                <table className="table table-sm table-bordered table-striped text-center">
                    <tbody>
                        <tr>
                            <td width="13%">
                                <input
                                    name="createdAt"
                                    type="date"
                                    className="form-control form-control-sm"
                                    value={defaultDate} disabled="disabled" />
                            </td>
                            <td width="10%"><input
                                name="installation"
                                type="number"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                            /></td>
                            <td width="10%"><input
                                name="interqualite"
                                type="number"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                            /></td>
                            <td width="12%"><input
                                name="interdepannage"
                                type="number"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                            /></td>
                            <td width="10%"><input
                                name="visite"
                                type="number"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                            /></td>
                            <td width="10%"><input
                                name="recuperation"
                                type="number"
                                className="form-control form-control-sm"
                                onChange={handleChange}
                            /></td>
                            <td width="18%"><input
                                name="autre"
                                type="text"
                                className="form-control form-control-sm"
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

export default FormRapport;