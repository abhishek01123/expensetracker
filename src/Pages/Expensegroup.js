// import React, { useEffect, useState } from 'react';
// import { GetExpensegroup, PostExpensegroup } from "../Services/Auth";
// import Modal from 'react-modal';
// import "../Styles/Expensegroup.css";

// const Expensegroup = () => {
//     const [expenseGroups, setExpenseGroups] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showModal, setShowModal] = useState(false);
//     const [newEmployeeGrade, setNewEmployeeGrade] = useState('');
//     const itemsPerPage = 5;

//     const fetchExpenseGroups = async () => {
//         const syscompanyUuid = localStorage.getItem('companyID');
//         if (syscompanyUuid) {
//             const data = await GetExpensegroup(syscompanyUuid);
//             setExpenseGroups(data);
//         } else {
//             console.log('No companyId found in local storage');
//         }
//     };

//     useEffect(() => {
//         fetchExpenseGroups();
//     }, []);

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = expenseGroups.slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(expenseGroups.length / itemsPerPage);

//     const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//     const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//     const toggleModal = () => setShowModal(!showModal);

//     const handleAddExpense = async (e) => {
//         e.preventDefault();
//         if (!newEmployeeGrade.trim()) {
//             alert('Please enter a valid employee grade.');
//             return;
//         }

//         const expensegroupdata = {
//             employee_grade: newEmployeeGrade,
//             company_uuid: localStorage.getItem('companyID')
//         };

//         try {
//             const response = await PostExpensegroup(expensegroupdata);
//             if (response) {
//                 fetchExpenseGroups();
//                 setNewEmployeeGrade('');
//                 setShowModal(false);
//             }
//         } catch (error) {
//             console.error('Failed to add expense group:', error);
//         }
//     };

    
//     return (
//         <div className="expense-group-container">
//             <button className="add-expense-btn" onClick={toggleModal}>Add</button>
//             <div className="expense-group-header">
//                 <strong>Employee_Grade</strong>
//                 <strong>Grade Details</strong>
//             </div>
//             {currentItems.length > 0 ? (
//                 <ul className="expense-group-list">
//                     {currentItems.map((group, index) => (
//                         <li key={index} className="expense-group-item">
//                             <div>{group.employee_grade}</div>
//                             <div className="grade-details">
//                                 <button className="add-button">+</button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="no-expense-groups">No expense groups found.</p>
//             )}

//             <div className="pagination-controls">
//                 <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
//                 <span>Page {currentPage} of {totalPages}</span>
//                 <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
//             </div>

//             <Modal
//                 isOpen={showModal}
//                 onRequestClose={toggleModal}
//                 contentLabel="Add New Employee Grade"
//                 className="modal-content"
//                 overlayClassName="modal-overlay"
//                 ariaHideApp={false}
//             >
//                 <div className="modal-header">
//                     <h3>Add New Employee Grade</h3>
//                 </div>
//                 <div className="modal-body">
//                     <input
//                         type="text"
//                         value={newEmployeeGrade}
//                         onChange={(e) => setNewEmployeeGrade(e.target.value)}
//                         placeholder="Enter new employee grade"
//                         className="expense-input"
//                         required
//                     />
//                 </div>
//                 <div className="modal-footer">
//                     <button className="submit-expense-btn" onClick={handleAddExpense}>Submit</button>
//                     <button className="close-popup-btn" onClick={toggleModal}>Cancel</button>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default Expensegroup;



// import React, { useEffect, useState } from 'react';
// import { GetExpensegroup, GetExpensegroupdetails, PostExpensegroup } from "../Services/Auth";
// import Modal from 'react-modal';
// import "../Styles/Expensegroup.css";
// import Masterexpensegroupdetails from './Masterexpensegroupdetails';


// const Expensegroup = () => {
//     const [expenseGroups, setExpenseGroups] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showModal, setShowModal] = useState(false);
//     const [showExpenseDetailsModal, setShowExpenseDetailsModal] = useState(false);
//     const [selectedExpenseGroupUuid, setSelectedExpenseGroupUuid] = useState(null);

//     const [newEmployeeGrade, setNewEmployeeGrade] = useState('');
//     const itemsPerPage = 7;


//     const companyID = localStorage.getItem('companyID');
//     const sysAccount_UUId = localStorage.getItem('sysAccount_UUId');



//     const fetchExpenseGroups = async () => {
//         if  (companyID) {
//             const data = await GetExpensegroup(companyID);
//             setExpenseGroups(data);
//           }else {
//             console.log('No companyId found in local storage');
//         }
//     };
//     useEffect(() => {
//         fetchExpenseGroups();
//     }, []);




//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = expenseGroups.slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(expenseGroups.length / itemsPerPage);

//     const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//     const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//     const toggleModal = () => setShowModal(!showModal);
//     // const toggleExpenseDetailsModal = () => setShowExpenseDetailsModal(!showExpenseDetailsModal);
//     const toggleExpenseDetailsModal = (uuid = null) => {
//         setSelectedExpenseGroupUuid(uuid);
//         setShowExpenseDetailsModal(!showExpenseDetailsModal);
//     };

//     const handleAddExpense = async (e) => {
//         e.preventDefault();
//         if (!newEmployeeGrade.trim()) {
//             alert('Please enter a valid employee grade.');
//             return;
//         }

//         const expensegroupdata = {
//             employee_grade: newEmployeeGrade,
//             companyID: companyID || "",
//             PostedBy: sysAccount_UUId || ""
//         };


//         try {
//             const response = await PostExpensegroup(expensegroupdata);
//             if (response) {
//                 fetchExpenseGroups();
//                 setNewEmployeeGrade('');
//                 setShowModal(false);
//             }
//         } catch (error) {
//             console.error('Failed to add expense group:', error);
//         }
//     };


//     return (
//         <div className="expense-group-container">
//             <button className="add-expense-btn" onClick={toggleModal}>Add</button>
//             <div className="expense-group-header">
//                 <strong>Employee_Grade</strong>
//                 <strong>Grade Details</strong>
//             </div>
//             {currentItems.length > 0 ? (
//                 <ul className="expense-group-list">
//                     {currentItems.map((group, index) => (
//                         <li key={index} className="expense-group-item">
//                             <div>{group.employee_grade}</div>
//                             <div className="grade-details">
//                                 {/* <button className="add-button" onClick={toggleExpenseDetailsModal}>+</button> */}
//                                 {/* <button
//                                     className="add-button"
//                                     onClick={() => toggleExpenseDetailsModal(group.sysexpensegroup_uuid)}
//                                 >
//                                     +
//                                 </button> */}
//                                 <button
//                                     className="add-button"
//                                     onClick={() => {
//                                         toggleExpenseDetailsModal(group.sysexpensegroup_uuid)
//                                         // GetExpensegroupdetails(group.sysexpensegroup_uuid);
//                                     }}
//                                 >
//                                     +
//                                 </button>

//                             </div>

                            
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="no-expense-groups">No expense groups found.</p>
//             )}
//             <div className="pagination-controls">
//                 <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
//                 <span>Page {currentPage} of {totalPages}</span>
//                 <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
//             </div>

//             <Modal
//                 isOpen={showModal}
//                 onRequestClose={toggleModal}
//                 contentLabel="Add New Employee Grade"
//                 className="modal-content"
//                 overlayClassName="modal-overlay"
//                 ariaHideApp={false}
//             >
//                 <div className="modal-header">
//                     <h3>Add New Employee_Grade</h3>
//                 </div>
//                 <div className="modal-body">
//                     <input
//                         type="text"
//                         value={newEmployeeGrade}
//                         onChange={(e) => setNewEmployeeGrade(e.target.value)}
//                         placeholder="Enter new employee grade"
//                         className="expense-input"
//                         required
//                     />
//                 </div>
//                 <div className="modal-footer">
//                     <button className="submit-expense-btn" onClick={handleAddExpense}>Submit</button>
//                     <button className="close-popup-btn" onClick={toggleModal}>Cancel</button>
//                 </div>
//             </Modal>
            
//             {/* <Masterexpensegroupdetails
//                 isOpen={showExpenseDetailsModal}
//                 onClose={toggleExpenseDetailsModal}
//             /> */}
//             <Masterexpensegroupdetails
//                 isOpen={showExpenseDetailsModal}
//                 onClose={() => toggleExpenseDetailsModal(null)}
//                 sysexpensegroup_uuid={selectedExpenseGroupUuid}
//             />

//         </div>
//     );
// };

// export default Expensegroup;



// import React, { useState, useEffect } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme CSS
// import { ClientSideRowModelModule } from 'ag-grid-community';
// import { ModuleRegistry } from 'ag-grid-community';
// import { GetExpensegroup, PostExpensegroup } from "../Services/Auth";
// import Modal from 'react-modal';
// import "../Styles/Expensegroup.css";
// import Masterexpensegroupdetails from './Masterexpensegroupdetails';

// ModuleRegistry.registerModules([ClientSideRowModelModule]);

// const Expensegroup = () => {
//     const [expenseGroups, setExpenseGroups] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [newEmployeeGrade, setNewEmployeeGrade] = useState('');
//     const [showExpenseDetailsModal, setShowExpenseDetailsModal] = useState(false);
//     const [selectedExpenseGroupUuid, setSelectedExpenseGroupUuid] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize] = useState(10);

//     const companyID = localStorage.getItem('companyID');
//     const sysAccount_UUId = localStorage.getItem('sysAccount_UUId');

//     const fetchExpenseGroups = async () => {
//         if (companyID) {
//             const data = await GetExpensegroup(companyID);
//             setExpenseGroups(data);
//         } else {
//             console.log('No companyId found in local storage');
//         }
//     };

//     useEffect(() => {
//         fetchExpenseGroups();
//     }, []);

//     const toggleModal = () => setShowModal(!showModal);

//     const toggleExpenseDetailsModal = (uuid = null) => {
//         setSelectedExpenseGroupUuid(uuid);
//         setShowExpenseDetailsModal(!showExpenseDetailsModal);
//     };

//     const handleAddExpense = async (e) => {
//         e.preventDefault();
//         if (!newEmployeeGrade.trim()) {
//             alert('Please enter a valid employee grade.');
//             return;
//         }

//         const expensegroupdata = {
//             employee_grade: newEmployeeGrade,
//             companyID: companyID || "",
//             PostedBy: sysAccount_UUId || ""
//         };

//         try {
//             const response = await PostExpensegroup(expensegroupdata);
//             if (response) {
//                 fetchExpenseGroups();
//                 setNewEmployeeGrade('');
//                 setShowModal(false);
//             }
//         } catch (error) {
//             console.error('Failed to add expense group:', error);
//         }
//     };

//     const columnDefs = [
//         { headerName: "Employee Grade", field: "employee_grade", flex: 1 },
//         {
//             headerName: "Grade Details",
//             field: "sysexpensegroup_uuid",
//             cellRenderer: (params) => (
//                 <button className="add-button" onClick={() => toggleExpenseDetailsModal(params.value)}>
//                     +
//                 </button>
//             ),
//             flex: 1
//         }
//     ];

//     const totalPages = Math.ceil(expenseGroups.length / pageSize);

//     const onPageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setCurrentPage(newPage);
//         }
//     };

//     const paginatedData = expenseGroups.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//     return (
//         <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
//             <button className="add-expense-btn" onClick={toggleModal}>Add</button>

//             <AgGridReact
//                 rowData={paginatedData}
//                 columnDefs={columnDefs}
//                 pagination={false}
//             />

//             <div className="pagination-controls">
//                 <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
//                     Previous
//                 </button>
//                 <span>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//                     Next
//                 </button>
//             </div>

//             <Modal
//                 isOpen={showModal}
//                 onRequestClose={toggleModal}
//                 contentLabel="Add New Employee Grade"
//                 className="modal-content"
//                 overlayClassName="modal-overlay"
//                 ariaHideApp={false}
//             >
//                 <div className="modal-header">
//                     <h3>Add New Employee_Grade</h3>
//                 </div>
//                 <div className="modal-body">
//                     <input
//                         type="text"
//                         value={newEmployeeGrade}
//                         onChange={(e) => setNewEmployeeGrade(e.target.value)}
//                         placeholder="Enter new employee grade"
//                         className="expense-input"
//                         required
//                     />
//                 </div>
//                 <div className="modal-footer">
//                     <button className="submit-expense-btn" onClick={handleAddExpense}>Submit</button>
//                     <button className="close-popup-btn" onClick={toggleModal}>Cancel</button>
//                 </div>
//             </Modal>

//             <Masterexpensegroupdetails
//                 isOpen={showExpenseDetailsModal}
//                 onClose={() => toggleExpenseDetailsModal(null)}
//                 sysexpensegroup_uuid={selectedExpenseGroupUuid}
//             />
//         </div>
//     );
// };

// export default Expensegroup;



import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme CSS
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { GetExpensegroup, PostExpensegroup } from "../Services/Auth";
import Modal from 'react-modal';
import "../Styles/Expensegroup.css";
import Masterexpensegroupdetails from './Masterexpensegroupdetails';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Expensegroup = () => {
    const [expenseGroups, setExpenseGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEmployeeGrade, setNewEmployeeGrade] = useState('');
    const [showExpenseDetailsModal, setShowExpenseDetailsModal] = useState(false);
    const [selectedExpenseGroupUuid, setSelectedExpenseGroupUuid] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const companyID = localStorage.getItem('companyID');
    const sysAccount_UUId = localStorage.getItem('sysAccount_UUId');

    const fetchExpenseGroups = async () => {
        if (companyID) {
            const data = await GetExpensegroup(companyID);
            setExpenseGroups(data);
        } else {
            console.log('No companyId found in local storage');
        }
    };

    useEffect(() => {
        fetchExpenseGroups();
    }, []);

    const toggleModal = () => setShowModal(!showModal);

    const toggleExpenseDetailsModal = (uuid = null) => {
        setSelectedExpenseGroupUuid(uuid);
        setShowExpenseDetailsModal(!showExpenseDetailsModal);
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        if (!newEmployeeGrade.trim()) {
            alert('Please enter a valid employee grade.');
            return;
        }

        const expensegroupdata = {
            employee_grade: newEmployeeGrade,
            companyID: companyID || "",
            PostedBy: sysAccount_UUId || ""
        };

        try {
            const response = await PostExpensegroup(expensegroupdata);
            if (response) {
                fetchExpenseGroups();
                setNewEmployeeGrade('');
                setShowModal(false);
            }
        } catch (error) {
            console.error('Failed to add expense group:', error);
        }
    };

    const columnDefs = [
        { headerName: "Employee Grade", field: "employee_grade", flex: 1 },
        {
            headerName: "Grade Details",
            field: "sysexpensegroup_uuid",
            cellRenderer: (params) => (
                <button className="add-button" onClick={() => toggleExpenseDetailsModal(params.value)}>
                    +
                </button>
            ),
            flex: 1
        }
    ];

    const totalPages = Math.ceil(expenseGroups.length / pageSize);

    const onPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const paginatedData = expenseGroups.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <>
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
                                    <li><a className="dropdown-item" href="/masteremployee">Employee</a></li>
                                    <li>
                                        <a className="dropdown-item" href="/expensetypes">
                                            Expenses
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/expensegroup">
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

            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <button className="add-expense-btn" onClick={toggleModal}>Add</button>

                <AgGridReact
                    rowData={paginatedData}
                    columnDefs={columnDefs}
                    pagination={false}
                />

                <div className="pagination-controls">
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>

                <Modal
                    isOpen={showModal}
                    onRequestClose={toggleModal}
                    contentLabel="Add New Employee Grade"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                    ariaHideApp={false}
                >
                    <div className="modal-header">
                        <h3>Add New Employee_Grade</h3>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            value={newEmployeeGrade}
                            onChange={(e) => setNewEmployeeGrade(e.target.value)}
                            placeholder="Enter new employee grade"
                            className="expense-input"
                            required
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="submit-expense-btn" onClick={handleAddExpense}>Submit</button>
                        <button className="close-popup-btn" onClick={toggleModal}>Cancel</button>
                    </div>
                </Modal>

                <Masterexpensegroupdetails
                    isOpen={showExpenseDetailsModal}
                    onClose={() => toggleExpenseDetailsModal(null)}
                    sysexpensegroup_uuid={selectedExpenseGroupUuid}
                />
            </div>
        </>
    );
};

export default Expensegroup;
