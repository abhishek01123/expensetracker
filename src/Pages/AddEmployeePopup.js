// import React, { useState, useEffect } from "react";
// import { GetRoleNames, postEmployeeData, GetExpenseApprovers, GetFinalApprovers,GetExpensegroup } from "../Services/Auth";
// import "../Styles/AddEmployeePopup.css";



// const AddEmployeePopup = ({ onClose, onEmployeeAdded }) => {
//   const [employeeData, setEmployeeData] = useState({
//     employee_Id: "",
//     firstName: "",
//     lastName: "",
//     email_Id: "",
//     phoneNo: "",
//     roleName: "",
//     expense_Approver: "",
//     final_Approver: "",
//     level: "",
//   });

//   const [roles, setRoles] = useState([]);
//   const [expenseApprovers, setExpenseApprovers] = useState([]); // Expense Approvers
//   const [finalApprovers, setFinalApprovers] = useState([]); // Final Approvers
//   const [levels, setLevels] = useState([]);

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);


//   // Fetch company ID from localStorage and update employeeData
//   useEffect(() => {
//     const sysaccountUuid = localStorage.getItem("sysAccount_UUId"); // Fetch SysAccount_uuid
//     const syscompanyUuid = localStorage.getItem("companyID"); // Fetch SysCompany_uuid

//     setEmployeeData((prevData) => ({
//       ...prevData,
//       PostedBy: sysaccountUuid || "", // Assign SysAccount_uuid
//       CompanyId: syscompanyUuid || "", // Assign SysCompany_uuid
//     }));

//     if (sysaccountUuid) {
//       fetchApprovers(sysaccountUuid); // Fetch Expense Approvers
//       fetchFinalApprovers(sysaccountUuid); // Fetch Final Approvers
//     }

//     if (syscompanyUuid) {
//       fetchExpenseGroups(syscompanyUuid);
//     }
//   }, []);

  
//   // Fetch role names from API
//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const roleNames = await GetRoleNames();
//       setRoles(roleNames || []);
//     } catch {
//       setMessage("Error fetching roles. Please try again.");
//     }
//   };

  

//   // Fetch Expense Approvers
//   const fetchApprovers = async (sysAccountUuid) => {
//     try {
//       const approverNames = await GetExpenseApprovers(sysAccountUuid);
//       setExpenseApprovers(approverNames || []);
//     } catch {
//       setMessage("Error fetching expense approvers. Please try again.");
//     }
//   };


//   // Fetch Final Approvers
//   const fetchFinalApprovers = async (sysAccountUuid) => {
//     try {
//       const finalApproverNames = await GetFinalApprovers(sysAccountUuid);
//       setFinalApprovers(finalApproverNames || []);
//     } catch {
//       setMessage("Error fetching final approvers. Please try again.");
//     }
//   };

//   const fetchExpenseGroups = async (companyId) => {
//     try {
//       const groups = await GetExpensegroup(companyId);
//       console.log(groups);

      
//       setLevels(groups || []);
//     } catch {
//       setMessage("Error fetching expense groups. Please try again.");
//     }
//   };


//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await postEmployeeData(employeeData);

//       if (response && response.message === "Employee registered successfully!") {
//         setMessage("Employee added successfully!");
//         onEmployeeAdded(response);
//         onClose();
//       }
//     } catch (error) {
//       setMessage("Error adding employee. Please try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="modal-container">
//       <form onSubmit={handleSubmit} className="modal-form">
//         <h2>Add Employee</h2>
//         {message && <p className="message">{message}</p>}

//         <div className="form-row">
//           <input type="text" name="employee_Id" placeholder="Employee ID" value={employeeData.employee_Id} onChange={handleChange} />
//           <input type="text" name="firstName" placeholder="First Name" value={employeeData.firstName} onChange={handleChange} />
//         </div>

//         <div className="form-row">
//           <input type="text" name="lastName" placeholder="Last Name" value={employeeData.lastName} onChange={handleChange} />
//           <input type="email" name="email_Id" placeholder="Email" value={employeeData.email_Id} onChange={handleChange} />
//         </div>

//         <div className="form-row">
//           <input type="text" name="phoneNo" placeholder="Phone Number" value={employeeData.phoneNo} onChange={handleChange} />
//           <select name="roleName" value={employeeData.roleName} onChange={handleChange}>
//             <option value="">Select Role</option>
//             {roles.length > 0 ? roles.map((role, index) => (
//               <option key={index} value={role.value || role.text}>{role.text || role.value}</option>
//             )) : <option disabled>Loading roles...</option>}
//           </select>
//         </div>

//         <div className="form-row">
//           <select name="expense_Approver" value={employeeData.expense_Approver} onChange={handleChange}>
//             <option value="">Select Expense Approver</option>
//             {expenseApprovers.length > 0 ? expenseApprovers.map((approver, index) => (
//               <option key={index} value={approver.value}>{approver.text}</option>
//             )) : <option disabled>Loading approvers...</option>}
//           </select>

//           <select name="final_Approver" value={employeeData.final_Approver} onChange={handleChange}>
//             <option value="">Select Final Approver</option>
//             {finalApprovers.length > 0 ? finalApprovers.map((approver, index) => (
//               <option key={index} value={approver.value}>{approver.text}</option>
//             )) : <option disabled>Loading final approvers...</option>}
//           </select>
//         </div>


//         <div className="form-row">
//           <select name="level" value={employeeData.level} onChange={handleChange}>
//             <option value="">Select Level</option>
//             {levels.map((level, index) => (
//               <option key={index} value={level.value}>{level.text}</option>
//             ))}
//           </select>
//         </div>


//         <div className="button-group">
//           <button type="submit" className="submit-button" disabled={loading}>
//             {loading ? "Adding..." : "Add"}
//           </button>
//           <button type="button" className="close-modal-button" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddEmployeePopup;

import React, { useState, useEffect } from "react";
import { GetRoleNames, postEmployeeData, GetExpenseApprovers, GetFinalApprovers, GetExpensegroup } from "../Services/Auth";
import "../Styles/AddEmployeePopup.css";

const AddEmployeePopup = ({ onClose, onEmployeeAdded }) => {
  const [employeeData, setEmployeeData] = useState({
    employee_Id: "",
    firstName: "",
    lastName: "",
    email_Id: "",
    phoneNo: "",
    roleName: "",
    expense_Approver: "",
    final_Approver: "",
    level: "",
  });

  const [roles, setRoles] = useState([]);
  const [expenseApprovers, setExpenseApprovers] = useState([]);
  const [finalApprovers, setFinalApprovers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sysaccountUuid = localStorage.getItem("sysAccount_UUId");
    const syscompanyUuid = localStorage.getItem("companyID");

    setEmployeeData((prevData) => ({
      ...prevData,
      PostedBy: sysaccountUuid || "",
      CompanyId: syscompanyUuid || ""
    }));

    if (sysaccountUuid) {
      fetchApprovers(sysaccountUuid);
      fetchFinalApprovers(sysaccountUuid);
    }

    if (syscompanyUuid) {
      fetchLevels(syscompanyUuid);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const roleNames = await GetRoleNames();
      setRoles(roleNames || []);
    } catch {
      setMessage("Error fetching roles. Please try again.");
    }
  };

  const fetchApprovers = async (sysAccountUuid) => {
    try {
      const approverNames = await GetExpenseApprovers(sysAccountUuid);
      setExpenseApprovers(approverNames || []);
    } catch {
      setMessage("Error fetching expense approvers. Please try again.");
    }
  };

  const fetchFinalApprovers = async (sysAccountUuid) => {
    try {
      const finalApproverNames = await GetFinalApprovers(sysAccountUuid);
      setFinalApprovers(finalApproverNames || []);
    } catch {
      setMessage("Error fetching final approvers. Please try again.");
    }
  };


  const fetchLevels = async (companyId) => {
    try {
      const levelsData = await GetExpensegroup(companyId);
      setLevels(levelsData.map(item => ({
        value: item.employee_grade,
        text: item.employee_grade
      })));
    } catch {
      setMessage("Error fetching levels. Please try again.");
    }
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postEmployeeData(employeeData);

      if (response && response.message === "Employee registered successfully!") {
        setMessage("Employee added successfully!");
        onEmployeeAdded(response);
        onClose();
      }
    } catch (error) {
      setMessage("Error adding employee. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Add Employee</h2>
        {message && <p className="message">{message}</p>}

        <div className="form-row">
          <input type="text" name="employee_Id" placeholder="Employee ID" value={employeeData.employee_Id} onChange={handleChange} />
          <input type="text" name="firstName" placeholder="First Name" value={employeeData.firstName} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input type="text" name="lastName" placeholder="Last Name" value={employeeData.lastName} onChange={handleChange} />
          <input type="email" name="email_Id" placeholder="Email" value={employeeData.email_Id} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input type="text" name="phoneNo" placeholder="Phone Number" value={employeeData.phoneNo} onChange={handleChange} />
          <select name="roleName" value={employeeData.roleName} onChange={handleChange}>
            <option value="">Select Role</option>
            {roles.length > 0 ? roles.map((role, index) => (
              <option key={index} value={role.value || role.text}>{role.text || role.value}</option>
            )) : <option disabled>Loading roles...</option>}
          </select>
        </div>

        <div className="form-row">
          <select name="expense_Approver" value={employeeData.expense_Approver} onChange={handleChange}>
            <option value="">Select Expense Approver</option>
            {expenseApprovers.length > 0 ? expenseApprovers.map((approver, index) => (
              <option key={index} value={approver.value}>{approver.text}</option>
            )) : <option disabled>Loading approvers...</option>}
          </select>

          <select name="final_Approver" value={employeeData.final_Approver} onChange={handleChange}>
            <option value="">Select Final Approver</option>
            {finalApprovers.length > 0 ? finalApprovers.map((approver, index) => (
              <option key={index} value={approver.value}>{approver.text}</option>
            )) : <option disabled>Loading final approvers...</option>}
          </select>
        </div>

        <div className="form-row">
        <select name="level" value={employeeData.level} onChange={handleChange}>
        <option value="">Select Level</option>
         {levels.length > 0 ? (
         levels.map((level, index) => (
         <option key={index} value={level.value}>{level.text}</option>
        ))
       ) : (
        <option disabled>Loading levels...</option>
  )}
</select>
      </div>

        <div className="button-group">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
          <button type="button" className="close-modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePopup;


