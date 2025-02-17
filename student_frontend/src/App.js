// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
// import CreateStudent from "./CreateStudent";
// import FetchStudent from "./FetchStudent";
// import UpdateStudent from "./UpdateStudent";
// import DeleteStudent from "./DeleteStudent";
// import "./App.css"; 

// const App = () => {
//     return (
//         <Router>
//             <MainLayout />
//         </Router>
//     );
// };

// const MainLayout = () => {
//     const location = useLocation();

//     // Check if the current route is for individual pages
//     const isIndividualPage = location.pathname === "/create" || location.pathname === "/students" || location.pathname.startsWith("/update") || location.pathname === "/delete";

//     return (
//         <div className="container">
//             {!isIndividualPage && (
//                 <>
//                     {/* Page Title - Moved slightly up */}
//                     <h1 className="title">Student CRUD Application</h1>

//                     {/* Sidebar */}
//                     <div className="sidebar">
//                         <Link to="/create" className="link">Create Student</Link>
//                         <Link to="/students" className="link">View Students</Link>
//                         <Link to="/update/:id" className="link">Update Student</Link>
//                         <Link to="/delete" className="link">Delete Student</Link>
//                     </div>
//                 </>
//             )}
//             {/* Routes Section */}
//             <Routes>
//                 <Route path="/create" element={<CreateStudent />} />
//                 <Route path="/students" element={<FetchStudent />} />
//                 <Route path="/update/:id" element={<UpdateStudent />} />
//                 <Route path="/delete" element={<DeleteStudent />} />
//             </Routes>
//         </div>
//     );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; 
import CreateStudent from './CreateStudent'; 
import FetchStudent from './FetchStudent'; 
import UpdateStudent from './UpdateStudent';
import DeleteStudent from './DeleteStudent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateStudent />} />
        <Route path="/view" element={<FetchStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
        <Route path="/delete/:id" element={<DeleteStudent />} />
        <Route path="/update" element={<UpdateStudent />} />
        <Route path="/delete" element={<DeleteStudent />} />
      </Routes>
    </Router>
  );
}

export default App;


