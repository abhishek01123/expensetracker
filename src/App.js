import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SuperAdmindashboard from "./Pages/SuperAdmindashboard";
import MasterEmployee from "./Pages/MasterEmployee";  // ✅ Import MasterEmployee page



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<SuperAdmindashboard />} />
        <Route path="/masteremployee" element={<MasterEmployee />} /> {/* CompanyAdmin's page */}

        <Route path="/login" element={<Login />} />  {/* ✅ Ensure this route exists */}

      </Routes>
    </Router>
  );
}

export default App;
