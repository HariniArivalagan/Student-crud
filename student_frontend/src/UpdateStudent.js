import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UpdateStudent = () => {
    const [studentId, setStudentId] = useState(sessionStorage.getItem("studentId") || "");
    const [student, setStudent] = useState(null);
    const [error, setError] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        if (studentId) {
            fetchStudent(); // Fetch student details when component mounts
        }
    }, [studentId]);

    const fetchStudent = async () => {
        if (!studentId.trim()) {
            setError("No Student ID found.");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/index.php/fetch/${studentId}`);
            if (response.data.status === "success") {
                let studentData = response.data.data;

                // Remove country code if present
                if (studentData.phone_number.startsWith("+")) {
                    studentData.phone_number = studentData.phone_number.replace(/^\+\d{1,3}/, "");
                }

                setStudent(studentData);
                setError("");
            } else {
                setStudent(null);
                setError("Student not found.");
            }
        } catch (error) {
            console.error("Error fetching student:", error);
            setStudent(null);
            setError("Failed to fetch student. Please try again.");
        }
    };

    const validateForm = () => {
        let errorMessages = [];
        if (!student.first_name.trim()) errorMessages.push("First name is required.");
        if (!student.last_name.trim()) errorMessages.push("Last name is required.");
        if (!student.dob) errorMessages.push("Date of birth is required.");
        if (!student.gender) errorMessages.push("Gender is required.");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!student.email.trim()) {
            errorMessages.push("Email is required.");
        } else if (!emailRegex.test(student.email)) {
            errorMessages.push("Invalid email format.");
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!student.phone_number.trim()) {
            errorMessages.push("Phone number is required.");
        } else if (!phoneRegex.test(student.phone_number)) {
            errorMessages.push("Phone number must be 10 digits.");
        }

        if (errorMessages.length > 0) {
            alert(errorMessages.join("\n"));
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.put(
                `http://localhost:8080/index.php/update/${studentId}`,
                { ...student, phone_number: countryCode + student.phone_number },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.status === "success") {
                alert("Student updated successfully!");
                navigate("/view"); // Redirect back to View Students after update
            } else {
                alert("Failed to update student.");
            }
        } catch (error) {
            console.error("Error updating student:", error);
            alert("Failed to update student.");
        }
    };

    if (!student) return <p>Loading student details...</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Update Student</h1>

            {!student && (
                <div style={styles.idInputContainer}>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Enter Student ID"
                        style={styles.input}
                    />
                    <button onClick={fetchStudent} style={styles.button}>Fetch Student</button>
                    {error && <p style={styles.error}>{error}</p>}
                </div>
            )}

            {student && (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input type="text" name="first_name" value={student.first_name} onChange={handleChange} placeholder="First Name" style={styles.input} />
                    <input type="text" name="last_name" value={student.last_name} onChange={handleChange} placeholder="Last Name" style={styles.input} />
                    <input type="date" name="dob" value={student.dob} onChange={handleChange} style={styles.input} />
                    
                    <select name="gender" value={student.gender} onChange={handleChange} style={styles.input}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <input type="email" name="email" value={student.email} onChange={handleChange} placeholder="Email" style={styles.input} />

                    <div style={styles.phoneContainer}>
                        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={styles.dropdown}>
                            <option value="+91">+91</option>
                            <option value="+61">+61</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+49">+49</option>
                            <option value="+33">+33</option>
                        </select>
                        <input type="tel" name="phone_number" value={student.phone_number} onChange={handleChange} placeholder="XXXXXXXXXX" style={styles.phoneInput} />
                    </div>

                    <button type="submit" style={styles.button}>Update Student</button>
                </form>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/create.avif')",
        backgroundSize: "90%",
        backgroundPosition: "center",
        backdropFilter: "blur(5px)",
    },
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        color: "#263238",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
        width: "400px",
    },
    input: {
        padding: "12px",
        fontSize: "16px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        backgroundColor: "#f5f5f5",
        color: "#263238",
    },
    button: {
        padding: "14px",
        fontSize: "18px",
        backgroundColor: "#008080",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    phoneContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    dropdown: {
        padding: "12px",
        fontSize: "16px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        backgroundColor: "#f5f5f5",
    },
    phoneInput: {
        flex: "1",
        padding: "12px",
        fontSize: "16px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        backgroundColor: "#f5f5f5",
    },
};

export default UpdateStudent;