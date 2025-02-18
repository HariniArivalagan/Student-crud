import React, { useState } from "react";
import axios from "axios";

const DeleteStudent = () => {
    const [id, setId] = useState("");
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        if (!id.trim()) {
            setMessage("Please enter a valid Student ID.");
            return;
        }
    
        const confirmDelete = window.confirm(`Are you sure you want to delete the student with ID ${id}?`);
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`http://localhost:8080/index.php/delete/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            console.log("API Response:", response.data); // Debugging
    
            if (response.data.status === "error") {
                setMessage(`⚠️ ${response.data.message}`);
                return;
            }
            else{
            setMessage(`✅ Student with ID ${id} deleted successfully.`);
            setTimeout(() => setMessage(''), 1000);
            setId("");
            }
        } catch (error) {
            console.error("Error deleting student:", error);
            setMessage(`Failed to delete student. ${error.message}`);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Delete Student</h2>
            <div style={styles.box}>
                <input 
                    type="text" 
                    placeholder="Enter Student ID" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                    style={styles.input}
                />
                <button onClick={handleDelete} style={styles.button}>Delete</button>
            </div>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};
const styles = {
    container: {
        display: "flex",
        flexDirection: "column", 
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('/create.avif')",
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    title: {
        fontSize: "32px",
        color: "#000", 
        marginTop: "10%"
    },
    box: {
        backgroundColor: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        height: "15vh",
        width: "280px", 
        marginBottom: "25%", 
    },
    input: {
        width: "60%", 
        padding: "10px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "15px",
    },
    button: {
        backgroundColor: "#008080",
        color: "#fff",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "50%",
        fontSize: "15px",
        fontWeight: "bolder",
        marginTop: "15px"
    },
    message: {
        marginTop: "10px",
        fontSize: "14px",
        color: "#333",
        fontSize: "16px",
    }
};


export default DeleteStudent;

