import React from "react";
import EditUser from "../form/editUser";

const UserModal = ({ user }) => {

    let dataTarget = "#userModal" + user.id;
    let targetId = "userModal" + user.id;

    return (
        <div>

            <button type="button" className="btn btn-sm btn-primary d-inline" data-bs-toggle="modal" data-bs-target={dataTarget}>Modifier</button>

            <div className="modal fade" id={targetId} tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="userModalLabel">Modification de l'utilisateur</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <EditUser user={user} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserModal;