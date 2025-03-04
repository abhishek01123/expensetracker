import React, { useEffect, useState } from "react";
import { GetExpenseTypes, PostExpenseType } from "../Services/Auth";
import "../Styles/Expensetypes.css";
import Modal from "react-modal";

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="expenses-container">
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

      {currentItems.length > 0 ? (
        <ul className="expenses-list">
          {currentItems.map((expense, index) => (
            <li key={index} className="expense-item">
              <span className="expense-name">{expense.expensetype}</span>
              <span className="expense-date">
                {expense.posted_date_time ? new Date(expense.posted_date_time).toLocaleString() : "N/A"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Expensetypes;