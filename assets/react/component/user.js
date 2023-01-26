import React from "react";
import UserServices from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { RolesTable } from "../helpers/userHelpers";
import UserModal from "./userModal";

const User = ({ user }) => {

    let navigate = useNavigate();

    const handleDelete = () => {
        if (confirm("êtes vous sûr de cette action ?")) {
            UserServices.deleteUser(user).then(() => navigate('/list'));
        }
    }
    

    return (
        <tr>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{RolesTable[user.roles]}</td>
            <td>
                <div className="btn-group" role="group">
                    {/* <a
                        className="btn btn-sm btn-primary d-inline"
                        href=""
                    >Modifier</a> */}
                    { <UserModal user={user} /> }
                    <a className="btn btn-sm btn-danger d-inline" onClick={handleDelete}>Supprimer</a>
                </div>


            </td>
        </tr>
    )
}

export default User;