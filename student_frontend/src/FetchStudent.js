import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import the search icon

const FetchStudent = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false); // State to toggle search input visibility

    const recordsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/index.php/read");
            if (response.data.status === "success" && Array.isArray(response.data.data)) {
                setStudents(response.data.data);
                setFilteredStudents(response.data.data);
            } else {
                alert(response.data.message || "No students found");
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            alert("Failed to fetch students.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        sessionStorage.setItem("studentId", id);
        navigate("/update");
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Are you sure you want to delete this student?`)) return;
        try {
            const response = await axios.delete(`http://localhost:8080/index.php/delete/${id}`);
            if (response.data.status === "success") {
                setMessage("✅ Student deleted successfully.");
                setStudents(students.filter(student => student.id !== id));
                setFilteredStudents(filteredStudents.filter(student => student.id !== id));
                setTimeout(() => setMessage(''), 2000);
            } else {
                setMessage(`⚠️ ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error deleting student:", error);
            setMessage(`Failed to delete student. ${error.message}`);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredStudents(
            students.filter(student => 
                student.first_name.toLowerCase().includes(query) || 
                student.last_name.toLowerCase().includes(query)
            )
        );
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredStudents.length / recordsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Student List</h1>
            <div style={styles.searchContainer}>
                <FaSearch
                    onClick={() => setShowSearch(!showSearch)} // Toggle the visibility of search input
                    style={styles.searchIcon}
                />
                {showSearch && (
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={styles.searchInput}
                    />
                )}
            </div>
            {loading ? <p>Loading...</p> : (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                            <tr>
                                <th style={styles.tableHeader}>ID</th>
                                <th style={styles.tableHeader}>First Name</th>
                                <th style={styles.tableHeader}>Last Name</th>
                                <th style={styles.tableHeader}>DOB</th>
                                <th style={styles.tableHeader}>Gender</th>
                                <th style={styles.tableHeader}>Email</th>
                                <th style={styles.tableHeader}>Phone Number</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={styles.tableBody}>
                            {currentRecords.length > 0 ? (
                                currentRecords.map((student) => (
                                    <tr key={student.id} style={styles.tableRow}>
                                        <td>{student.id}</td>
                                        <td>{student.first_name}</td>
                                        <td>{student.last_name}</td>
                                        <td>{student.dob}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone_number}</td>
                                        <td style={styles.actionsContainer}>
                                            <button onClick={() => handleEdit(student.id)} style={styles.editButton}>Edit</button>
                                            <button onClick={() => handleDelete(student.id)} style={styles.deleteButton}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={styles.noData}>No students found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <div style={styles.paginationContainer}>
                <button onClick={prevPage} disabled={currentPage === 1} style={styles.paginationButton}>Previous</button>
                <span style={styles.pageInfo}>Page {currentPage} of {Math.ceil(students.length / recordsPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(students.length / recordsPerPage)} style={styles.paginationButton}>Next</button>
            </div>
        </div>
    );
};

const styles = {
    container: { 
        backgroundImage: "url('/create.avif')",
        backgroundSize: "90%",
        minHeight: "100vh",
        textAlign: "center", 
        padding: "20px"
    },

    title: { 
        color: "black",
        marginTop: "3px"
    },

    searchIcon: { 
        cursor: "pointer", 
        fontSize: "24px", 
        position: "absolute", 
        top: "30px", 
        right: "10%" 
    },

    searchInput: {
        padding: "8px",
        marginBottom: "10px", 
        width: "100px", 
        position: "absolute", 
        top: "60px", 
        right: "5%" 
    },

    tableContainer: { 
        margin: "20px auto", 
        width: "100%",
        marginTop: "-20px"
    },

    table: { 
        width: "100%", 
        borderCollapse: "collapse", 
        height: "auto",  // Change to auto so it adapts to content
        backgroundColor: "white" 
    },

    tableHead: { 
        backgroundColor: "#008080", 
        color: "white" 
    },

    tableHeader: { 
        padding: "10px", 
        border: "1px solid #ddd" 
    },
    
    tableRow: { 
        textAlign: "center" 
    },

    actionsContainer: { 
        display: "flex", 
        justifyContent: "space-around", 
        width: "160px", 
        margin: "0 auto"
    },

    editButton: { 
        backgroundColor: "#4CAF50", 
        color: "white", 
        border: "none", 
        padding: "10px 20px", 
        margin: "5px", 
        cursor: "pointer",
        width: "80px"
    },

    deleteButton: { 
        backgroundColor: "#F44336", 
        color: "white", 
        border: "none", 
        padding: "10px 20px", 
        margin: "5px", 
        cursor: "pointer",
        width: "80px"
    },

    paginationContainer: { 
        marginTop: "20px" 
    },

    paginationButton: { 
        margin: "5px", 
        padding: "10px 15px", 
        backgroundColor: "#008080", 
        color: "white", 
        fontWeight:"bolder",
        border: "none", 
        cursor: "pointer" ,
        borderRadius:"5px"
    },

    noData: { 
        textAlign: "center", 
        padding: "20px", 
        color: "#8B0000" 
    }
};

export default FetchStudent;
