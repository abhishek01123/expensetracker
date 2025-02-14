import React, { useEffect, useState } from 'react';
import { GetMasterEmployee } from '../Services/Auth';
import '../Styles/MasterEmployee.css';

const MasterEmployee = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetMasterEmployee();
            if (data) {
                setEmployees(data);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (employee) => {
        console.log("Edit clicked for:", employee);
        // Add your edit logic here
    };

    return (
        <div className="container">
            <h1>Master Employee</h1>
            {employees.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Expense Approver</th>
                            <th>Final Approver</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.sysemployee_uuid}>
                                <td>{emp.employee_id}</td>
                                <td>{emp.firstname}</td>
                                <td>{emp.lastname}</td>
                                <td>{emp.email_id}</td>
                                <td>{emp.phoneno}</td>
                                <td>{emp.rolename}</td>
                                <td>{emp.expense_approver || 'N/A'}</td>
                                <td>{emp.final_approver || 'N/A'}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(emp)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No employees found.</p>
            )}
        </div>
    );
};

export default MasterEmployee;
