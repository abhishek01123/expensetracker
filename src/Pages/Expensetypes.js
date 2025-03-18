// import React, { useEffect, useState } from "react";
// import { GetExpenseTypes, PostExpenseType } from "../Services/Auth";
// import "../Styles/Expensetypes.css";
// import Modal from "react-modal";

// const Expensetypes = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [newExpense, setNewExpense] = useState("");
//   const [employeeData, setEmployeeData] = useState({
//     PostedBy: "",
//     CompanyId: ""
//   });
//   const [showModal, setShowModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const sysaccountUuid = localStorage.getItem("sysAccount_UUId");
//     const syscompanyUuid = localStorage.getItem("companyID");

//     setEmployeeData((prevData) => ({
//       ...prevData,
//       PostedBy: sysaccountUuid || "",
//       CompanyId: syscompanyUuid || ""
//     }));

//     const fetchExpenses = async () => {
//       try {
//         const data = await GetExpenseTypes(syscompanyUuid);
//         if (data && Array.isArray(data)) {
//           setExpenses(data);
//         } else {
//           console.error("Unexpected API response format", data);
//         }
//       } catch (error) {
//         console.error("Error fetching expenses", error);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   const handleAddExpense = async () => {
//     if (!newExpense.trim()) {
//       alert("Expense type cannot be empty");
//       return;
//     }

//     const newExpenseData = {
//       expensetype: newExpense,
//       postedby: employeeData.PostedBy,
//       updatedby: employeeData.PostedBy,
//       companyid: employeeData.CompanyId
//     };

//     try {
//       const response = await PostExpenseType(newExpenseData);
//       if (response && response.message === "Expenses added successfully!") {
//         setExpenses([...expenses, newExpenseData]);
//         setNewExpense("");
//         setShowModal(false);
//       } else {
//         alert(response.message || "Failed to add expense");
//       }
//     } catch (error) {
//       console.error("Error adding expense", error);
//     }
//   };

//   const toggleModal = () => setShowModal(!showModal);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(expenses.length / itemsPerPage);

//   const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//   return (
//     <div className="expenses-container">
//       <h2>Expense Types</h2>
//       <button className="add-expense-btn" onClick={toggleModal}>Add</button>

//       <Modal
//         isOpen={showModal}
//         onRequestClose={toggleModal}
//         contentLabel="Add New Expense"
//         className="modal-content"
//         overlayClassName="modal-overlay"
//         ariaHideApp={false}
//       >
//         <div className="modal-header">
//           <h3>Add New Expense</h3>
//         </div>
//         <div className="modal-body">
//           <input
//             type="text"
//             value={newExpense}
//             onChange={(e) => setNewExpense(e.target.value)}
//             placeholder="Enter new expense type"
//             className="expense-input"
//           />
//         </div>
//         <div className="modal-footer">
//           <button className="submit-expense-btn" onClick={handleAddExpense}>Submit</button>
//           <button className="close-popup-btn" onClick={toggleModal}>Cancel</button>
//         </div>
//       </Modal>

//       {currentItems.length > 0 ? (
//         <ul className="expenses-list">
//           {currentItems.map((expense, index) => (
//             <li key={index} className="expense-item">
//               <span className="expense-name">{expense.expensetype}</span>
//               <span className="expense-date">
//                 {expense.posted_date_time ? new Date(expense.posted_date_time).toLocaleString() : "N/A"}
//               </span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No expenses found.</p>
//       )}

//       <div className="pagination-controls">
//         <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default Expensetypes;

 import React, { useEffect, useState } from "react";
 import { GetExpenseTypes, PostExpenseType } from "../Services/Auth";
 import "../Styles/Expensetypes.css";
import Modal from "react-modal";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Expensetypes = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState("");
  const [employeeData, setEmployeeData] = useState({
    PostedBy: "",
    CompanyId: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const sysaccountUuid = localStorage.getItem("sysAccount_UUId");
    const syscompanyUuid = localStorage.getItem("companyID");

    setEmployeeData((prevData) => ({
      ...prevData,
      PostedBy: sysaccountUuid || "",
      CompanyId: syscompanyUuid || ""
    }));

    const fetchExpenses = async () => {
      try {
        const data = await GetExpenseTypes(syscompanyUuid);
        if (data && Array.isArray(data)) {
          setExpenses(data);
        } else {
          console.error("Unexpected API response format", data);
        }
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = async () => {
    if (!newExpense.trim()) {
      alert("Expense type cannot be empty");
      return;
    }

    const newExpenseData = {
      expensetype: newExpense,
      postedby: employeeData.PostedBy,
      updatedby: employeeData.PostedBy,
      companyid: employeeData.CompanyId
    };

    try {
      const response = await PostExpenseType(newExpenseData);
      if (response && response.message === "Expenses added successfully!") {
        setExpenses([...expenses, newExpenseData]);
        setNewExpense("");
        setShowModal(false);
      } else {
        alert(response.message || "Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const columns = [
    { headerName: "Expense Type", field: "expensetype", sortable: true, filter: true },
    { headerName: "Posted Date", field: "posted_date_time", sortable: true, filter: true, valueFormatter: params => params.value ? new Date(params.value).toLocaleString() : "N/A" }
  ];

  return (
    <div className="expenses-container">
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
                  <li><a className="dropdown-item" href="/masteremployee">employee</a></li>
                  <li><a className="dropdown-item" href="/expensetypes">Expenses</a></li>
                  <li><a className="dropdown-item" href="/expensegroup">Expensegroup</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h2>Expense Types</h2>
      <button className="add-expense-btn" onClick={toggleModal}>Add</button>

      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        contentLabel="Add New Expense"
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <h3>Add New Expense</h3>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={newExpense}
            onChange={(e) => setNewExpense(e.target.value)}
            placeholder="Enter new expense type"
            className="expense-input"
          />
        </div>
        <div className="modal-footer">
          <button className="submit-expense-btn" onClick={handleAddExpense}>Submit</button>
          <button className="close-popup-btn" onClick={toggleModal}>Cancel</button>
        </div>
      </Modal>

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={expenses}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Expensetypes;
