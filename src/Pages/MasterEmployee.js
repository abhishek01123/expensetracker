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



import React, { useEffect, useState } from "react";
import { GetMasterEmployee } from "../Services/Auth";
import "../Styles/MasterEmployee.css";
import AddEmployeePopup from  "../Pages/AddEmployeePopup";


const MasterEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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
    // Add the new employee to the existing list.
    setEmployees(prev => [...prev, newEmployee]);
  };

  return (
    <div className="master-employee-container">
      <h2>Master Employee List</h2>
      
      <button className="add-employee-btn" onClick={() => setShowPopup(true)}>
        Add
      </button>

      {showPopup && (
        <AddEmployeePopup 
          onClose={() => setShowPopup(false)}
          onEmployeeAdded={handleEmployeeAdded}
        />
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Role</th>
            <th>Expense Approver</th>
            <th>Final Approver</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.sysemployee_uuid}>
              <td>{employee.employee_id}</td>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>{employee.email_id}</td>
              <td>{employee.phoneno}</td>
              <td>{employee.rolename}</td>
              <td>{employee.expense_approver}</td>
              <td>{employee.final_approver || "N/A"}</td>
              <td>
                <button className="edit-btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MasterEmployee;

