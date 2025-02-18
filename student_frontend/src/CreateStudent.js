import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        first_name: "",
        last_name: "",
        dob: "",
        gender: "",
        email: "",
        phone_number: ""
    });

    const [loading, setLoading] = useState(false);

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
        setStudent((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        setLoading(true); // Start loading
    
        try {
            const response = await axios.post("http://localhost:8080/index.php/create", student, {
                headers: { "Content-Type": "application/json" }
            });
    
            console.log("Raw Response:", response); // Log the full response object
            console.log("Response Data:", response.data); // Log the actual data
    
            // Parse the response data if it contains extra quotes
            const responseData = typeof response.data === 'string' ? JSON.parse(response.data.replace(/^<|>$/g, '')) : response.data;
    
            console.log("Parsed Response:", responseData); // Log parsed response
    
            if (responseData.status === "success") {
                alert("Student created successfully!");
                setStudent({
                    first_name: "",
                    last_name: "",
                    dob: "",
                    gender: "",
                    email: "",
                    phone_number: ""
                });
    
                navigate("/view"); // Redirect to student list page
            } else {
                alert("Failed to create student. Please check your input.");
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };
    

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Create Student</h1>
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
                        <select style={styles.dropdown}>
                            <option value="+91">+91</option>
                            <option value="+61">+61</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+49">+49</option>
                            <option value="+33">+33</option>
                        </select>
                        <input type="tel" name="phone_number" value={student.phone_number} onChange={handleChange} placeholder="XXXXXXXXXX" style={styles.phoneInput} />
                    </div>

                    <button type="submit" style={styles.button}>Create Student</button>
                </form>
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
        backdropFilter: "blur(15px)",
    },

    title: {
        fontSize: "32px",
        fontWeight: "bold",
        color: "black",
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

export default CreateStudent;
