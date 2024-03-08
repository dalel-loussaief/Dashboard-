
// Importer les éléments nécessaires
import React, { useState } from "react";
import { MdEdit, MdDelete, MdCheckCircle, MdCancel } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap'; // Importer le composant Modal de Bootstrap

// Définir le composant ListRDV
const Profil = () => {
    // Initialiser l'état des RDVs
    const [rdvs, setRdvs] = useState([
        { id: 1, name: "safa souilmi", email: "safa@gmail.com", date: "2024-03-07", description: "je veux prendre rdv pour cette maison" },
        { id: 2, name: "mohamed frjani", email: "safa@gmail.com", date: "2024-03-08", description: "je veux prendre rdv pour cette studio" },
        { id: 3, name: "siwar amara", email: "safa@gmail.com", date: "2024-03-08", description: "je veux prendre rdv pour cette appartement" },
        { id: 4, name: "dalel loussaief", email: "safa@gmail.com", date: "2024-03-08", description: "je veux prendre rdv pour cette local commercial" },
        { id: 5, name: "sami ksountni", email: "safa@gmail.com", date: "2024-03-08", description: "je veux prendre rdv pour cette maison" },
    ]);

    // Initialiser l'état de la modal d'acceptation
    const [acceptModal, setAcceptModal] = useState(null);

    // Initialiser l'état de la modal de suppression
    const [deleteModal, setDeleteModal] = useState(null);

    // Initialiser l'état du RDV sélectionné pour la suppression
    const [selectedRdvId, setSelectedRdvId] = useState(null);

    // Initialiser l'état de la recherche
    const [searchTerm, setSearchTerm] = useState("");

    // Initialiser l'état de la page actuelle
    const [currentPage, setCurrentPage] = useState(1);

    // Nombre de RDVs par page
    const rdvsPerPage = 4;

    // Ouvrir la modal d'acceptation
    const openAcceptModal = () => {
        acceptModal.show();
    };

    // Fermer la modal d'acceptation
    const closeAcceptModal = () => {
        acceptModal.hide();
    };

    // Ouvrir la modal de suppression
    const openDeleteModal = (rdvId) => {
        setSelectedRdvId(rdvId);
        deleteModal.show();
    };

    // Fermer la modal de suppression
    const closeDeleteModal = () => {
        setSelectedRdvId(null);
        deleteModal.hide();
    };

    // Rendu des RDVs
    const renderRDVs = () => {
        // Filtrer les RDVs en fonction du terme de recherche
        const filteredRdvs = rdvs.filter(rdv =>
            rdv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rdv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rdv.date.includes(searchTerm)
        );

        // Index du dernier RDV de la page actuelle
        const indexOfLastRDV = currentPage * rdvsPerPage;
        // Index du premier RDV de la page actuelle
        const indexOfFirstRDV = indexOfLastRDV - rdvsPerPage;
        // RDVs de la page actuelle
        const currentRDVs = filteredRdvs.slice(indexOfFirstRDV, indexOfLastRDV);

        return currentRDVs.map(rdv => (
            <tr key={rdv.id}>
                <td>{rdv.name}</td>
                <td>{rdv.email}</td>
                <td>{rdv.date}</td>
                <td>{rdv.description}</td>
                <td>
                    <button className="btn btn-success" onClick={openAcceptModal}>
                        <MdCheckCircle />
                    </button>
                    <button className="btn btn-danger" onClick={() => openDeleteModal(rdv.id)}>
                        <MdDelete />
                    </button>
                </td>
            </tr>
        ));
    };

    // Effet pour initialiser les modals
    React.useEffect(() => {
        setAcceptModal(new Modal(document.getElementById('acceptModal'), { backdrop: 'static', keyboard: false }));
        setDeleteModal(new Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false }));
    }, []);

    // Fonction pour changer de page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Retourner le contenu du composant
    return (
        <div style={{ textAlign: "center" }}>
            <h2>Liste des RDV</h2>
            <div className="d-flex justify-content-end mb-3">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Rechercher"
                    aria-label="Rechercher"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRDVs()}
                </tbody>
            </table>
            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(rdvs.length / rdvsPerPage))].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Modal d'acceptation */}
            <div className="modal fade" id="acceptModal" tabIndex="-1" aria-labelledby="acceptModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="acceptModalLabel">Accepter le RDV</h5>
                            <button type="button" className="btn-close" onClick={closeAcceptModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeAcceptModal}>Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal de suppression */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Supprimer le RDV</h5>
                            <button type="button" className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Êtes-vous sûr de vouloir supprimer ce rendez-vous ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Annuler</button>
                            <button type="button" className="btn btn-danger" onClick={closeDeleteModal}>Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profil;
