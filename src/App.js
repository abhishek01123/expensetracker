import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SuperAdmindashboard from "./Pages/SuperAdmindashboard";
import MasterEmployee from "./Pages/MasterEmployee";  // ✅ Import MasterEmployee page
import Expensetypes from "./Pages/Expensetypes"; // ✅ Import Expensetypes page
// import Navbar from "./Pages/Navbar";
// import DarkModeToggle from "./Pages/DarkModeToggle"; 
import Expensegroup from "./Pages/Expensegroup"; // ✅ Import Expensetypes page
import Masterexpensegroupdetails from "./Pages/Masterexpensegroupdetails"; // ✅ Import Expensegroupdetails


function App() {
  return (
    <Router>
        {/* <DarkModeToggle /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<SuperAdmindashboard />} />
        <Route path="/masteremployee" element={<MasterEmployee />} />
        <Route path="/expensetypes" element={<Expensetypes />} /> {/* ✅ Add route for Expensetypes */}
        <Route path="/expensegroup" element={<Expensegroup />} /> {/* ✅ Add route for Expensegroup */}
        <Route path="/login" element={<Login />} />  {/* ✅ Ensure this route exists */}


      </Routes>

      <Masterexpensegroupdetails />

    </Router>
  );
}

export default App;
