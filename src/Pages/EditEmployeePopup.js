
import React, { useState, useEffect } from "react";
import { GetEmployeedatabyid, GetRoleNames, GetExpenseApprovers, GetFinalApprovers,UpdateMasterEmployee } from "../Services/Auth";
import "../Styles/AddEmployeePopup.css";

const EditEmployeePopup = ({ onClose, employee, onEmployeeUpdated }) => {
  const [employeeData, setEmployeeData] = useState({
    employee_Id: "",
    firstName: "",
    lastName: "",
    email_Id: "",
    phoneNo: "",
    roleName: "",
    expense_Approver: "",
    final_Approver: ""
  });


  const [roles, setRoles] = useState([]);
  const [expenseApprovers, setExpenseApprovers] = useState([]);
  const [finalApprovers, setFinalApprovers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const sysaccountUuid = localStorage.getItem("sysAccount_UUId");
        const syscompanyUuid = localStorage.getItem("companyID");

        if (employee.sysemployee_uuid) {
          const data = await GetEmployeedatabyid(employee.sysemployee_uuid);
          if (data && data.employee) {
            setEmployeeData({
              ...data.employee,
              PostedBy: sysaccountUuid || "",
              CompanyId: syscompanyUuid || ""
            });
          } else {
            setMessage("Employee not found.");
          }
        }

        if (sysaccountUuid) {
          const [rolesData, expenseApproversData, finalApproversData] = await Promise.all([
            GetRoleNames(),
            GetExpenseApprovers(sysaccountUuid),
            GetFinalApprovers(sysaccountUuid)
          ]);
          setRoles(rolesData || []);
          setExpenseApprovers(expenseApproversData || []);
          setFinalApprovers(finalApproversData || []);
        }
      } catch (error) {
        setMessage("Error fetching data. Please try again.");
        console.error(error);
      }
    };

    fetchInitialData();
  }, [employee.sysemployee_uuid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


   // update krta hai ye!!!
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await UpdateMasterEmployee(employee.sysemployee_uuid, employeeData);
      if (response) {
        setMessage("Employee updated successfully!");
        onEmployeeUpdated(response);
        onClose();
      } else {
        setMessage("Failed to update employee.");
      }
    } catch {
      setMessage("An error occurred while updating the employee.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="modal-container">
      <form onSubmit={handleUpdate} className="modal-form">
        <h2>Edit Employee</h2>
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
            {roles.map((role, index) => (
              <option key={index} value={role.value || role.text}>{role.text || role.value}</option>
            ))}
          </select>
        </div>


        <div className="form-row">
          <select name="expense_Approver" value={employeeData.expense_Approver} onChange={handleChange}>
            <option value="">Select Expense Approver</option>
            {expenseApprovers.map((approver, index) => (
              <option key={index} value={approver.value}>{approver.text}</option>
            ))}
          </select>

          <select name="final_Approver" value={employeeData.final_Approver} onChange={handleChange}>
            <option value="">Select Final Approver</option>
            {finalApprovers.map((approver, index) => (
              <option key={index} value={approver.value}>{approver.text}</option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
          <button type="button" className="close-modal-button" onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeePopup;



