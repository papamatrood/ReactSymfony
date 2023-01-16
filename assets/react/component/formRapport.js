import React from "react";

const FormRapport = () => {

    function handleSubmit(event) {
        event.preventDefault();
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
                                <input type="date" className="form-control form-control-sm" value={defaultDate} disabled="disabled" />
                            </td>
                            <td width="10%"><input type="number" className="form-control form-control-sm" /></td>
                            <td width="10%"><input type="number" className="form-control form-control-sm" /></td>
                            <td width="12%"><input type="number" className="form-control form-control-sm" /></td>
                            <td width="10%"><input type="number" className="form-control form-control-sm" /></td>
                            <td width="10%"><input type="number" className="form-control form-control-sm" /></td>
                            <td width="18%"><input type="text" className="form-control form-control-sm" /></td>
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