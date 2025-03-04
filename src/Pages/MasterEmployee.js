// import React, { useEffect, useState } from "react";
// import { GetMasterEmployee } from "../Services/Auth";
// import "../Styles/MasterEmployee.css";
// import AddEmployeePopup from "./AddEmployeePopup";

// const MasterEmployee = () => {
//   const [employees, setEmployees] = useState([]);

  
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await GetMasterEmployee();
//       if (data) {
//         setEmployees(data);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="master-employee-container">
//       <h2>Master Employee List</h2>
      
//       <button className="add-employee-btn">Add </button>

//       <table className="employee-table">
//         <thead>
//           <tr>
//             <th>Employee ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Phone No</th>
//             <th>Role</th>
//             <th>Expense Approver</th>
//             <th>Final Approver</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee.sysemployee_uuid}>
//               <td>{employee.employee_id}</td>
//               <td>{employee.firstname}</td>
//               <td>{employee.lastname}</td>
//               <td>{employee.email_id}</td>
//               <td>{employee.phoneno}</td>
//               <td>{employee.rolename}</td>
//               <td>{employee.expense_approver}</td>
//               <td>{employee.final_approver || "N/A"}</td>
//               <td>
//                 <button className="edit-btn">Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MasterEmployee;

// import React, { useEffect, useState } from "react";
// import { GetMasterEmployee } from "../Services/Auth";
// import "../Styles/MasterEmployee.css";
// import AddEmployeePopup from "../Pages/AddEmployeePopup";
// import EditEmployeePopup from "../Pages/EditEmployeePopup"; // Import Edit Popup

// const MasterEmployee = () => {
//   const [employees, setEmployees] = useState([]);
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await GetMasterEmployee();
//       if (data) {
//         setEmployees(data);
//       }
//     };
//     fetchData();
//   }, []);

//   // Handle adding a new employee
//   const handleEmployeeAdded = (newEmployee) => {
//     setEmployees((prev) => [...prev, newEmployee]);
//   };

//   // Handle opening edit popup
//   const handleEditClick = (employee) => {
//     console.log(employee,"handle edit employee")
//     setSelectedEmployee(employee);
//     setShowEditPopup(true);
//   };

//   // Handle updating employee data
//   const handleEmployeeUpdated = (updatedEmployee) => {
//     setEmployees((prevEmployees) =>
//       prevEmployees.map((emp) =>
//         emp.sysemployee_uuid === updatedEmployee.sysemployee_uuid
//           ? updatedEmployee
//           : emp
//       )
//     );
//   };

//   return (
//     <div className="master-employee-container">
//       <h2>Master Employee</h2>

//       <button className="add-employee-btn" onClick={() => setShowAddPopup(true)}>
//         Add
//       </button>

//       {showAddPopup && (
//         <AddEmployeePopup
//           onClose={() => setShowAddPopup(false)}
//           onEmployeeAdded={handleEmployeeAdded}
//         />
//       )}


//       {showEditPopup && selectedEmployee && (
//         <EditEmployeePopup
//           onClose={() => setShowEditPopup(false)}
//           employee={selectedEmployee}
//           onEmployeeUpdated={handleEmployeeUpdated}
//         />
//       )}



//       <table className="employee-table">
//         <thead>
//           <tr>
//             <th>Employee ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Phone No</th>
//             <th>Role</th>
//             <th>Expense Approver</th>
//             <th>Final Approver</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee.sysemployee_uuid}>
//               <td>{employee.employee_id}</td>
//               <td>{employee.firstname}</td>
//               <td>{employee.lastname}</td>
//               <td>{employee.email_id}</td>
//               <td>{employee.phoneno}</td>
//               <td>{employee.rolename}</td>
//               <td>{employee.expense_approver}</td>
//               <td>{employee.final_approver || "N/A"}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => handleEditClick(employee)}>
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MasterEmployee;



import React, { useEffect, useState } from "react";
import { GetMasterEmployee } from "../Services/Auth";
import "../Styles/MasterEmployee.css";
import AddEmployeePopup from "../Pages/AddEmployeePopup";
import EditEmployeePopup from "../Pages/EditEmployeePopup";

const MasterEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetMasterEmployee();
      if (data) {
        setEmployees(data);
      }
    };
    fetchData();
  }, []);

  const handleEmployeeAdded = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditPopup(true);
  };
  

  const handleEmployeeUpdated = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.sysemployee_uuid === updatedEmployee.sysemployee_uuid
          ? updatedEmployee
          : emp
      )
    );
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark text-white shadow-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold" href="#">Employee Management</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="masterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Master
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="masterDropdown">
                  <li><a className="dropdown-item" href="#">Employee</a></li>

                  <li>
                  <a
                 className="dropdown-item"
                 href="/expensetypes"
                    >
                 Expenses
                  </a>
                  </li>
                  <li>
                  <a
                 className="dropdown-item"
                 href="/expensegroup"
                    >
                 Expensegroup
                  </a>
                  </li>

                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="master-employee-container">
        <h2 className="text-center my-4">Master Employee</h2>

        <button className="btn btn-primary mb-3 fw-bold shadow-lg" style={{ position: "absolute", left: "39px", top: "96px", borderRadius: "20px", padding: "6px 12px" }} onClick={() => setShowAddPopup(true)}>
          ➕ Add
        </button>

        {showAddPopup && (
          <AddEmployeePopup
            onClose={() => setShowAddPopup(false)}
            onEmployeeAdded={handleEmployeeAdded}
          />
        )}

        {showEditPopup && selectedEmployee && (
          <EditEmployeePopup onClose={() => setShowEditPopup(false)} employee={selectedEmployee} onEmployeeUpdated={handleEmployeeUpdated}/> )}

        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Role</th>
              <th>Expense Approver</th>
              <th>Final Approver</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.sysemployee_uuid}>
                <td>{employee.employee_id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email_id}</td>
                <td>{employee.phoneno}</td>
                <td>{employee.rolename}</td>
                <td>{employee.expense_approver}</td>
                <td>{employee.final_approver || "N/A"}</td>
                <td>{employee.level || "N/A"}</td>

                <td>
                  <button
                    className="btn btn-primary btn-sm fw-bold shadow-sm"
                    style={{ borderRadius: "15px", padding: "6px 12px" }}
                    onClick={() => handleEditClick(employee)}
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination d-flex justify-content-center">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`btn ${currentPage === number + 1 ? "btn-primary" : "btn-outline-primary"} mx-1`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterEmployee;


