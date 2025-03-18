// import React, { useEffect, useState } from "react";
// import { GetEmployeeexpense } from "../Services/Auth";


// const EmployeeExpenses = ({ posted_by }) => {
// const [expenses, setExpenses] = useState([]);


//   useEffect(() => {
//     const sysaccountUuid = localStorage.getItem("sysAccount_UUId");

//     if (sysaccountUuid) {
//       fetchExpenses(sysaccountUuid);
//     }
//   }, [posted_by]);



//   const fetchExpenses = async (sysaccountUuid) => {
//     try {
//       const response = await GetEmployeeexpense(sysaccountUuid);
//       if (response && response.data) {
//         setExpenses(response.data);
//       } else {
//         setExpenses([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch expenses:", error);
//       setExpenses([]);
//     }
//   };


//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Employee Expenses</h1>
//       {Array.isArray(expenses) && expenses.length > 0 ? (
//         <table border="1" style={{ margin: "0 auto", width: "80%", textAlign: "left" }}>
//           <thead>
//             <tr>
//               <th>Expense ID</th>
//               <th>Expense Date</th>
//               <th>Amount</th>
//               <th>Approved Amount</th>
//               <th>Approver Comment</th>
//               <th>Approver ID</th>
//               <th>Company ID</th>
//               <th>Description</th>
//               <th>Final Approver ID</th>
//               <th>Final Approver Amount</th>
//               <th>Final Approver Comment</th>
//               <th>Image</th>
//               <th>Posted By</th>
//               <th>Request Raise By</th>
//               <th>Status</th>
//               <th>System Expense UUID</th>
//               <th>System Expense Type UUID</th>
//               <th>Updated By</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((expense) => (
//               <tr key={expense.expenseid}>
//                 <td>{expense.expenseid || "N/A"}</td>
//                 <td>{expense.expensedate || "N/A"}</td>
//                 <td>{expense.amount ?? "N/A"}</td>
//                 <td>{expense.approvedamount || "N/A"}</td>
//                 <td>{expense.approvercomment || "N/A"}</td>
//                 <td>{expense.approverid || "N/A"}</td>
//                 <td>{expense.companyid || "N/A"}</td>
//                 <td>{expense.description || "N/A"}</td>
//                 <td>{expense.finalapproverid || "N/A"}</td>
//                 <td>{expense.finalapproveramount || "N/A"}</td>
//                 <td>{expense.finalapprovercomment || "N/A"}</td>
//                 <td>{expense.image || "N/A"}</td>
//                 <td>{expense.postedby || "N/A"}</td>
//                 <td>{expense.requestraiseby || "N/A"}</td>
//                 <td>{expense.status || "N/A"}</td>
//                 <td>{expense.sysexpenseuuid || "N/A"}</td>
//                 <td>{expense.sysexpensetype_uuid || "N/A"}</td>
//                 <td>{expense.updatedby || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No expenses found.</p>
//       )}
//     </div>
//   );
// };

// export default EmployeeExpenses;





// import React, { useEffect, useState } from "react";
// import { GetEmployeeexpense } from "../Services/Auth";

// const EmployeeExpenses = () => {
//   const [expenses, setExpenses] = useState({

//     expenseid: "",
//     expensedate: "",
//     amount: "",
//     approvedamount: "",
//     approvercomment: "",
//     approverid: "",
//     description: "",
//     finalapproverid: "",
//     finalapproveramount: "",
//     finalapprovercomment: "",
//     image: "",
//     requestraiseby: "",
//     status: "",
   
// });




//   useEffect(() => {
//     const posted_by = localStorage.getItem("sysAccount_UUId");
//     if (posted_by) {
//       fetchExpenses(posted_by);
//     }
//   }, []);


//   const fetchExpenses = async (posted_by) => {
//     try {
//       const response = await GetEmployeeexpense(posted_by);



//       if (response && response.data) {
//         setExpenses(response.data);

//       } else {
//         setExpenses([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch expenses:", error);
//       setExpenses([]);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Employee Expenses</h1>
//       {Array.isArray(expenses) && expenses.length > 0 ? (
//         <table border="1" style={{ margin: "0 auto", width: "80%", textAlign: "left" }}>
//           <thead>
//             <tr>
//               <th>Expense ID</th>
//               <th>Expense Date</th>
//               <th>Amount</th>
//               <th>Approved Amount</th>
//               <th>Approver Comment</th>
//               <th>Approver ID</th>
//               <th>Description</th>
//               <th>Final Approver ID</th>
//               <th>Final Approver Amount</th>
//               <th>Final Approver Comment</th>
//               <th>Image</th>
//               <th>Request Raise By</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((expense) => (
//               <tr key={expense.expenseid}>
//                 <td>{expense.expenseid || "N/A"}</td>
//                 <td>{expense.expensedate || "N/A"}</td>
//                 <td>{expense.amount ?? "N/A"}</td>
//                 <td>{expense.approvedamount || "N/A"}</td>
//                 <td>{expense.approvercomment || "N/A"}</td>
//                 <td>{expense.approverid || "N/A"}</td>
//                 <td>{expense.description || "N/A"}</td>
//                 <td>{expense.finalapproverid || "N/A"}</td>
//                 <td>{expense.finalapproveramount || "N/A"}</td>
//                 <td>{expense.finalapprovercomment || "N/A"}</td>
//                 <td>{expense.image || "N/A"}</td>
//                 <td>{expense.requestraiseby || "N/A"}</td>
//                 <td>{expense.status || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No expenses found.</p>
//       )}
//     </div>
//   );
// };


// export default EmployeeExpenses;



import React, { useEffect, useState } from "react";
import { GetEmployeeexpense } from "../Services/Auth";

const EmployeeExpenses = () => {
  const [expenses, setExpenses] = useState([]);


  useEffect(() => {
    const posted_by = localStorage.getItem("sysAccount_UUId");
    if (posted_by) {
      fetchExpenses(posted_by);
    }
  }, []);



  const fetchExpenses = async (posted_by) => {
  try {
    const response = await GetEmployeeexpense(posted_by);
    console.log('Full API response:', response);

    if (Array.isArray(response) && response.length > 0) {
      setExpenses(response);
    } else {
      setExpenses([]);
      console.warn("No expenses found.");
    }
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    setExpenses([]);
  }
};




  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Employee Expenses</h1>
      {Array.isArray(expenses) && expenses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Expense Date</th>
              <th>Amount</th>
              <th>Approved Amount</th>
              <th>Approver ID</th>
              <th>Description</th>
              <th>FinalApproverID</th>
              <th>Image</th>
              <th>RequestRaiseBy</th>
              <th>Status</th>
              <th>sysexpensetype_uuid</th>

            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.expenseid}>
                <td>{expense.expensedate || "N/A"}</td>
                <td>{expense.amount ?? "N/A"}</td>
                <td>{expense.approvedamount || "N/A"}</td>
                <td>{expense.approverid || "N/A"}</td>
                <td>{expense.description || "N/A"}</td>
                <td>{expense.finalapproverid || "N/A"}</td>
                <td>{expense.image || "N/A"}</td>
                <td>{expense.requestraiseby || "N/A"}</td>
                <td>{expense.status || "N/A"}</td>
                <td>{expense.sysexpensetype_uuid || "N/A"}</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default EmployeeExpenses;
