import React, { useState, useEffect } from 'react';
import { GetRoleNames, postEmployeeData } from '../Services/Auth';
import '../Styles/AddEmployeePopup.css';

const AddEmployeePopup = ({ onClose, onEmployeeAdded }) => {
  const [employeeData, setEmployeeData] = useState({
    employee_Id: '',
    firstName: '',
    lastName: '',
    email_Id: '',
    phoneNo: '',
    roleName: '',
    expense_Approver: '',
    final_Approver: ''

  });



  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  // Fetch company ID from localStorage
 useEffect(() => {
  const sysaccountUuid = localStorage.getItem('sysAccount_UUId'); // Fetch Sysaccount_uuid
  const syscompanyUuid = localStorage.getItem('companyID'); // Fetch Syscompany_uuid

  

  setEmployeeData(prevData => ({
    ...prevData,
    PostedBy: sysaccountUuid || '',  // Assign Sysaccount_uuid
    CompanyId: syscompanyUuid || ''  // Assign Syscompany_uuid
  }));
}, []);



  // Fetch role names from API
  useEffect(() => {
    fetchRoles();
  }, []);



  const fetchRoles = async () => {
    try {
      const roleNames = await GetRoleNames();
      setRoles(roleNames || []);
    } catch  {
      setMessage(' Error fetching roles. Please try again.');
    }
  };


  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  


  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();


  setLoading(true);
  try {
    console.log('Sending data to API:', employeeData);
    const response = await postEmployeeData(employeeData);


    

    // Ensure response is valid before showing success message
    if (response && response.message === "Employee registered successfully!") {
      setMessage('Employee added successfully!');
      onEmployeeAdded(response);
      onClose();
    } 
  } catch (error) {
    setMessage(' Error adding employee. Please try again.');
  }
  setLoading(false);
};

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Add Employee</h2>
        {message && <p className="message">{message}</p>}

        <div className="form-row">
          <input type="text" name="employee_Id" placeholder="Employee ID" value={employeeData.employee_Id} onChange={handleChange}  />
          <input type="text" name="firstName" placeholder="First Name" value={employeeData.firstName} onChange={handleChange}  />
        </div>

        <div className="form-row">
          <input type="text" name="lastName" placeholder="Last Name" value={employeeData.lastName} onChange={handleChange}  />
          <input type="email" name="email_Id" placeholder="Email" value={employeeData.email_Id} onChange={handleChange}  />
        </div>

        <div className="form-row">
          <input type="text" name="phoneNo" placeholder="Phone Number" value={employeeData.phoneNo} onChange={handleChange}  />
          <select name="roleName" value={employeeData.roleName} onChange={handleChange} >
            <option value="">Select Role</option>
            {roles.length > 0 ? roles.map((role, index) => (
              <option key={index} value={role.value || role.text}>{role.text || role.value}</option>
            )) : <option disabled>Loading roles...</option>}
          </select>
        </div>

        <div className="form-row">
          <input type="text" name="expense_Approver" placeholder="Expense Approver" value={employeeData.expense_Approver} onChange={handleChange}  />
          <input type="text" name="final_Approver" placeholder="Final Approver" value={employeeData.final_Approver} onChange={handleChange}  />
        </div>

        
        <div className="button-group">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
          <button type="button" className="close-modal-button" onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePopup;








// import React, { useState, useEffect, useRef } from 'react';
// import { GetRoleNames, postEmployeeData } from '../Services/Auth';
// import '../Styles/AddEmployeePopup.css';

// const AddEmployeePopup = ({ onClose, onEmployeeAdded }) => {
//   const [employeeData, setEmployeeData] = useState({
//     Employee_Id: '',
//     FirstName: '',
//     LastName: '',
//     Email_Id: '',
//     PhoneNo: '',
//     RoleName: '',
//     PostedBy: '',
//     CompanyId: '',
//     Expense_Approver: '',
//     Final_Approver: ''
//   });

//   const [roles, setRoles] = useState([]);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const isMounted = useRef(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const sysAccount_UUId = localStorage.getItem('sysAccount_UUId');
//         const companyID = localStorage.getItem('companyID');


//         if (isMounted.current) { 
//           setEmployeeData(prevData => ({
//             ...prevData,
//             PostedBy: sysAccount_UUId || '',
//             CompanyId: companyID || ''
//           }));
//         }
//       } catch (error) {
//         console.error("Error accessing localStorage:", error);
//         setMessage("Error loading data. Please try again later.");
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted.current = false; // Set to false when component unmounts
//     };
//   }, []);

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const roleNames = await GetRoleNames();
//       setRoles(roleNames || []);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//       setMessage(' Error fetching roles. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     const { email_Id, phoneNo } = employeeData;
//     // const emailRegex = /\S+@\S+\.\S+/;
//     // const phoneRegex = /^[0-9]{10}$/;

//     // if (!emailRegex.test(email_Id)) {
//     //   setMessage(' Please enter a valid email address.');
//     //   return false;
//     // }

//     // if (!phoneRegex.test(phoneNo)) {
//     //   setMessage('Please enter a valid 10-digit phone number.');
//     //   return false;
//     // }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       console.log('Sending data to API:', employeeData);
//       const response = await postEmployeeData(employeeData);
//       console.log('API Response:', response);

//       if (response && (response.success || response.status === 200)) {
//         setMessage(' Employee added successfully!');
//         onEmployeeAdded(response);
//         onClose();
//       } else {
//         console.error('Failed to add employee:', response);
//         setMessage(response.message || 'Failed to add employee');
//       }
//     } catch (error) {
//       console.error('Error posting employee data:', error);
//       setMessage('Error adding employee. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-container">
//       <form onSubmit={handleSubmit} className="modal-form">
//         <h2>Add Employee</h2>
//         {message && <p className="message">{message}</p>}

//         <div className="form-row">
//           <input type="text" name="Employee_Id" placeholder="Employee ID" value={employeeData.Employee_Id} onChange={handleChange} required />
//           <input type="text" name="FirstName" placeholder="First Name" value={employeeData.FirstName} onChange={handleChange} required />
//         </div>

//         <div className="form-row">
//           <input type="text" name="LastName" placeholder="Last Name" value={employeeData.LastName} onChange={handleChange} required />
//           <input type="email" name="Email_Id" placeholder="Email" value={employeeData.Email_Id} onChange={handleChange} required />
//         </div>

//         <div className="form-row">
//           <input type="text" name="PhoneNo" placeholder="Phone Number" value={employeeData.PhoneNo} onChange={handleChange} required />
//           <select name="RoleName" value={employeeData.RoleName} onChange={handleChange} required>
//             <option value="">Select Role</option>
//             {roles.length > 0 ? roles.map((role, index) => (
//               <option key={index} value={role.value || role.text}>{role.text || role.value}</option>
//             )) : <option disabled>Loading roles...</option>}
//           </select>
//         </div>

//         <div className="form-row">
//           <input type="text" name="Expense_Approver" placeholder="Expense Approver" value={employeeData.Expense_Approver} onChange={handleChange} required />
//           <input type="text" name="Final_Approver" placeholder="Final Approver" value={employeeData.Final_Approver} onChange={handleChange} required />
//         </div>

//         <div className="button-group">
//           <button type="submit" className="submit-button" disabled={loading}>
//             {loading ? 'Adding...' : 'Add'}
//           </button>
//           <button type="button" className="close-modal-button" onClick={onClose}>Close</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddEmployeePopup;