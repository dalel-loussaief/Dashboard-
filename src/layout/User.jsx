import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import FormAgent from "./FormAgent";

const Agent = () => {
    const [agents, setAgents] = useState([
        { id: 1, name: "Samir Ben Othmen", address: "123 Main St", phone: "24587410" },
        { id: 2, name: "Jamil Bensallah", address: "456 Elm St", phone: "52145625" },
        { id: 3, name: "Bilel Benlahmer", address: "789 Oak St", phone: "50241568" },
        { id: 4, name: "safa loussaief", address: "789 Oak St", phone: "50241568" },
        { id: 5, name: "med benjbali", address: "789 Oak St", phone: "50241568" },
        { id: 6, name: "aymen safir", address: "789 Oak St", phone: "50241568" },
        { id: 7, name: "mounir ezzine", address: "789 Oak St", phone: "50241568" },
        { id: 8, name: "sarra jbali", address: "789 Oak St", phone: "50241568" },
        { id: 9, name: "Bilel bellghith", address: "789 Oak St", phone: "50241568" },
        { id: 10, name: "soumaya saffar", address: "789 Oak St", phone: "50241568" }
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const agentsPerPage = 4; // Nombre d'agents par page

    // Fonction pour filtrer les agents en fonction du terme de recherche
    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculer l'index de début et de fin de la liste des agents à afficher pour la pagination
    const indexOfLastAgent = currentPage * agentsPerPage;
    const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
    const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent);

    // Fonction pour changer de page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const styles = {
        userContainer: {
            textAlign: "center",
        },
        h2: {
            marginBottom: "10px",
            display: "inline-block",
        },
        searchContainer: {
            float: "right",
            marginRight: "10px",
        },
        searchInput: {
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "150px",
        },
        searchButton: {
            padding: "6px",
            borderRadius: "4px",
        },
        table: {
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "80%",
        },
        th: {
            backgroundColor: "#f2f2f2",
            padding: "8px",
            fontWeight: "bold",
            border: "1px solid #ddd",
        },
        td: {
            padding: "8px",
            border: "1px solid #ddd",
        },
        editButton: {
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px",
            cursor: "pointer",
            marginRight: "4px",
        },
        deleteButton: {
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px",
            cursor: "pointer",
        },
        editIcon: {
            verticalAlign: "middle",
        },
        deleteIcon: {
            verticalAlign: "middle",
        },
        pagination: {
            marginTop: "20px",
            textAlign: "center",
        },
        pageLink: {
            margin: "0 5px",
            cursor: "pointer",
        },
    };

    // Rendu de la pagination
    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredAgents.length / agentsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <div style={styles.pagination}>
                {pageNumbers.map(number => (
                    <span key={number} style={styles.pageLink} onClick={() => paginate(number)}>
                        {number}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div style={styles.userContainer}>
            <h2 style={styles.h2}>Liste User</h2>
            <div style={styles.searchContainer}>
                <form className="d-flex" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit" style={styles.searchButton}>
                        Search
                    </button>
                </form>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Nom</th>
                        <th style={styles.th}>Adresse</th>
                        <th style={styles.th}>Téléphone</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAgents.map(agent => (
                        <tr key={agent.id}>
                            <td style={styles.td}>{agent.name}</td>
                            <td style={styles.td}>{agent.address}</td>
                            <td style={styles.td}>{agent.phone}</td>
                            <td style={styles.td}>
                                <button style={styles.editButton}>
                                    {/* Utilisation de Link pour rediriger vers la page FormAgent */}
                                    <Link to={`/FormUser/${agent.id}`} state={{ agentData: agent }}>
                                        <MdEdit style={styles.editIcon} />
                                    </Link>

                                </button>
                                <button style={styles.deleteButton}>
                                    <MdDelete style={styles.deleteIcon} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {renderPagination()}

        </div>
    );
};

export default Agent;
