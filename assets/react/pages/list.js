import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormRapport from "../form/formRapport";
import Rapport from "../component/rapport";
import Graph from "../component/graph";
import Pagination from "../component/pagination";
import RapportServices from "../services/rapportServices";
import { useGetRapports } from "../hooks/rapportHooks";



const List = () => {
    const { rapports, load, loading, setRapports } = useGetRapports('http://localhost:8000/api/rapports');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(7);

    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentRapports = rapports.slice(firstIndex, lastIndex);

    const addRapport = useCallback(rapport => {
        setRapports(rapports => [rapport, ...rapports]);
    });

    useEffect(() => {
        load()
    }, []);


    //console.log(rapports);
    let location = useLocation();
    let navigate = useNavigate();
    if (location.pathname === "/list") {
        navigate('/');
        document.location.reload();
    }

    return (

        <div className="container-fluid">

            <div className="row">
                <div className="col-md-4 pt-3">
                    <Graph />
                </div>
                <div className="col-md-8">
                    {loading && 'Chargement...'}
                    <div className="table-responsive p-3">
                        <fieldset className="border p-2">
                            <legend>Les rapports d'activités</legend>
                            <table className="table table-sm table-bordered table-striped text-center mb-0">
                                <thead>
                                    <tr>
                                        <th width="13%">Date de création</th>
                                        <th width="10%">Installations</th>
                                        <th width="10%">Inter-Qualités</th>
                                        <th width="12%">Inter-Dépannages</th>
                                        <th width="10%">Visites</th>
                                        <th width="10%">Récuperations</th>
                                        <th width="18%">Autres</th>
                                        <th width="15%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rapports ? (
                                        currentRapports.map((rapport) => <Rapport key={rapport.id} rapport={rapport} />)
                                    ) : (
                                        <tr>
                                            <td colspan="8">Aucun enregistrement trouvé</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </fieldset>
                        {rapports && <Pagination
                            totalRapports={rapports.length}
                            perPage={perPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage} />}
                        <FormRapport onRapport={addRapport} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;