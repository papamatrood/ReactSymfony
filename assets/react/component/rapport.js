import React from "react";
import dateHelper from "../helpers/helpers";
import RapportServices from "../services/rapportServices";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";

const Rapport = ({ rapport }) => {

    let myDate = dateHelper(rapport.createdAt);
    let navigate = useNavigate();

    const handleDelete = () => {
        if (confirm("êtes vous sûr de cette action ?")) {
            RapportServices.deleteRapport(rapport).then(() => navigate('/list'));
        }
    }

    return (
        <tr>
            <td>{myDate}</td>
            <td>{rapport.installation}</td>
            <td>{rapport.interqualite}</td>
            <td>{rapport.interdepannage}</td>
            <td>{rapport.visite}</td>
            <td>{rapport.recuperation}</td>
            <td>{rapport.autre}</td>
            <td>
                <div className="btn-group" role="group">
                    {/* <a
                        className="btn btn-sm btn-primary d-inline"
                        href=""
                    >Modifier</a> */}
                    <Modal rapport={rapport} />
                    <a className="btn btn-sm btn-danger d-inline" onClick={handleDelete}>Supprimer</a>
                </div>


            </td>
        </tr>
    )
}

export default Rapport;