import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./index.css"; 

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = (event) => {
    event.stopPropagation(); // Prevents event bubbling
    setMenuOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu") && !event.target.closest(".dropdown")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="overlay">
      <nav>
        <ul className="right">
          <li className="menu" onClick={toggleMenu} aria-label="Toggle menu">≡</li>
        </ul>
      </nav>
      <ul className={`dropdown ${menuOpen ? "show" : ""}`}>
        <li><Link to="/create">Create Student</Link></li>
        <li><Link to="/view">View Student</Link></li>
        <li><Link to="/update">Update Student</Link></li>
        <li><Link to="/delete">Delete Student</Link></li>
      </ul>
    </div>
  );
};

export default Home;


