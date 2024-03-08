import React, { useState } from "react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Blog = () => {
    const [articles, setArticles] = useState([
        { id: 1, title: "Title 1", date: "2024-03-08", description: "Description 1", image: "https://via.placeholder.com/150" },
        { id: 2, title: "Title 2", date: "2024-03-09", description: "Description 2", image: "https://via.placeholder.com/150" },
        { id: 3, title: "Title 3", date: "2024-03-10", description: "Description 3", image: "https://via.placeholder.com/150" },
        { id: 4, title: "Title 4", date: "2024-03-11", description: "Description 4", image: "https://via.placeholder.com/150" },
        { id: 5, title: "Title 5", date: "2024-03-12", description: "Description 5", image: "https://via.placeholder.com/150" },
        { id: 6, title: "Title 6", date: "2024-03-13", description: "Description 6", image: "https://via.placeholder.com/150" },
        { id: 7, title: "Title 7", date: "2024-03-14", description: "Description 7", image: "https://via.placeholder.com/150" },
        { id: 8, title: "Title 8", date: "2024-03-15", description: "Description 8", image: "https://via.placeholder.com/150" },
        { id: 9, title: "Title 9", date: "2024-03-16", description: "Description 9", image: "https://via.placeholder.com/150" },
        { id: 10, title: "Title 10", date: "2024-03-17", description: "Description 10", image: "https://via.placeholder.com/150" }
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 4; // Nombre d'articles par page

    // Fonction pour filtrer les articles en fonction du terme de recherche
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculer l'index de début et de fin de la liste des articles à afficher pour la pagination
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

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
        addButton: {
            marginBottom: "10px",
            color: "#007bff",
            fontSize: "24px",
            cursor: "pointer",
            marginRight: "5px", // Ajout de la marge à droite
        },
        searchContainer: {
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Alignement à droite
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
        image: {
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
        }
    };

    // Rendu de la pagination
    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredArticles.length / articlesPerPage); i++) {
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
            <h2 style={styles.h2}>Liste Blog </h2>
            <div style={styles.searchContainer}>
                <Link to="/BlogAdd"> {/* Lien vers la page FormBlog */}
                    <MdAdd style={styles.addButton} />
                </Link>
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
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Image</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentArticles.map(article => (
                        <tr key={article.id}>
                            <td style={styles.td}>{article.title}</td>
                            <td style={styles.td}>{article.date}</td>
                            <td style={styles.td}>{article.description}</td>
                            <td style={styles.td}><img src={article.image} alt={article.title} style={styles.image} /></td>
                            <td style={styles.td}>
                                <button style={styles.editButton}>
                                    <Link to={{ pathname: `/FormBlog/${article.id}`, state: { blogData: article } }}>
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

export default Blog;
