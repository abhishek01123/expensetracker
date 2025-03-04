// import React, { useState, useEffect } from 'react';
// import { SuperAdmindash } from '../Services/Auth';
// import '../Styles/SuperAdmindashboard.css';
// import '../Styles/AddCompanyPopup.css';
// import AddCompanyPopup from '../Pages/AddCompanyPopup';
// import { useNavigate } from 'react-router-dom';
// import EditCompanyPopup from './EditCompanyPopup';

// const SuperAdmindashboard = () => {
//     const [companies, setCompanies] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//     const [editingCompanyId, setEditingCompanyId] = useState(null);

//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await SuperAdmindash();
//                 setCompanies(response);
//             } catch (error) {
//                 setErrorMessage('Failed to fetch company data.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);


//     const togglePopup = () => {
//         setIsPopupOpen((prev) => !prev);
//     };

    
//     const toggleEditPopup = (Syscompany_uuid) => {
//         if (Syscompany_uuid) {
//           setEditingCompanyId(Syscompany_uuid);
//           setIsEditPopupOpen(true);
//         } else {
//           setIsEditPopupOpen(false);
//           setEditingCompanyId(null); 
//         }
//       };

//     const handleAddCompany = (newCompany) => {
//         setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         sessionStorage.removeItem('user');
//         navigate('/login');
//     };

//     return (
//         <div className="dashboard-container">
//             <div className="left-sidee">
//                 <h1 className="dashboard-heading">Super Admin Dashboard</h1>
//             </div>

//             <div className="right-side">
//                 <div className="dropdown">
//                     <button className="profile-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
//                         Users
//                     </button>
//                     {dropdownOpen && (
//                         <ul className="dropdown-menu">
//                             <li onClick={handleLogout} className="logout-option">
//                                 Logout
//                             </li>
//                         </ul>
//                     )}
//                 </div>

//                 {loading ? (
//                     <div>Loading...</div>
//                 ) : errorMessage ? (
//                     <p className="error-message">{errorMessage}</p>
//                 ) : (
//                     <div>
//                         <button className="add-button" onClick={togglePopup}>
//                             Add
//                         </button>
//                         {isPopupOpen && <AddCompanyPopup onClose={togglePopup} onCompanyAdded={handleAddCompany} />}

//                         <table className="company-table">
//                             <thead>
//                                 <tr>
//                                     <th>Company ID</th>
//                                     <th>Company Name</th>
//                                     <th>Address</th>
//                                     <th>Country</th>
//                                     <th>State</th>
//                                     <th>City</th>
//                                     <th>Zipcode</th>
//                                     <th>Email</th>
//                                     <th>Phone No.</th>
//                                     <th>Company Logo</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {companies.length > 0 ? (
//                                     companies.map((company) => (
//                                         <tr key={company.syscompany_uuid}>
//                                             <td>{company.company_id}</td>
//                                             <td>{company.company_name}</td>
//                                             <td>{company.address}</td>
//                                             <td>{company.country}</td>
//                                             <td>{company.state}</td>
//                                             <td>{company.city}</td>
//                                             <td>{company.zipcode}</td>
//                                             <td>{company.email_id}</td>
//                                             <td>{company.phone_no}</td>
//                                             <td>
//                                                 {company.company_logo ? (
//                                                     <img
//                                                         src={company.company_logo}
//                                                         alt="Company Logo"
//                                                         style={{ width: '60px', height: '60px' }}
//                                                     />
//                                                 ) : (
//                                                     'No Logo'
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 <button
//                                                     className="edit-button"
//                                                     onClick={() => toggleEditPopup(company.syscompany_uuid)}
//                                                 >
//                                                     Edit
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="10">No records found.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>



//                         {isEditPopupOpen && (
//                             <EditCompanyPopup
//                             onClose={() => toggleEditPopup(null)} // Fixed: Passed as function
//                             // onCompanyUpdated={handleEditCompany}
//                                 Syscompany_uuid={editingCompanyId}
//                             />
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SuperAdmindashboard;

import React, { useState, useEffect } from 'react';
import { SuperAdmindash } from '../Services/Auth';
import '../Styles/SuperAdmindashboard.css';
import '../Styles/AddCompanyPopup.css';
import AddCompanyPopup from '../Pages/AddCompanyPopup';
import { useNavigate } from 'react-router-dom';
import EditCompanyPopup from './EditCompanyPopup';

const SuperAdmindashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editingCompanyId, setEditingCompanyId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [companiesPerPage] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SuperAdmindash();
                setCompanies(response);
            } catch (error) {
                setErrorMessage('Failed to fetch company data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const togglePopup = () => {
        setIsPopupOpen((prev) => !prev);
    };

    const toggleEditPopup = (Syscompany_uuid) => {
        if (Syscompany_uuid) {
            setEditingCompanyId(Syscompany_uuid);
            setIsEditPopupOpen(true);
        } else {
            setIsEditPopupOpen(false);
            setEditingCompanyId(null);
        }
    };

    const handleAddCompany = (newCompany) => {
        setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                   
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="master-employee-container">
                <h2 className="text-center my-4">Super Admin Dashboard</h2>

                <button className="btn btn-primary mb-3 fw-bold shadow-lg" style={{ position: "absolute", left: "39px", top: "96px", borderRadius: "20px", padding: "6px 12px" }} onClick={togglePopup}>
                    ➕ Add
                </button>

                {loading ? (
                    <div>Loading...</div>
                ) : errorMessage ? (
                    <p className="error-message">{errorMessage}</p>
                ) : (
                    <div>
                        {isPopupOpen && <AddCompanyPopup onClose={togglePopup} onCompanyAdded={handleAddCompany} />}

                        <table className="table table-striped table-hover shadow-lg">
                            <thead className="table-dark">
                                <tr>
                                    <th>Company ID</th>
                                    <th>Company Name</th>
                                    <th>Address</th>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Zipcode</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>Company Logo</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCompanies.length > 0 ? (
                                    currentCompanies.map((company) => (
                                        <tr key={company.syscompany_uuid}>
                                            <td>{company.company_id}</td>
                                            <td>{company.company_name}</td>
                                            <td>{company.address}</td>
                                            <td>{company.country}</td>
                                            <td>{company.state}</td>
                                            <td>{company.city}</td>
                                            <td>{company.zipcode}</td>
                                            <td>{company.email_id}</td>
                                            <td>{company.phone_no}</td>
                                            <td>
                                                {company.company_logo ? (
                                                    <img
                                                        src={company.company_logo}
                                                        alt="Company Logo"
                                                        style={{ width: '60px', height: '60px' }}
                                                    />
                                                ) : (
                                                    'No Logo'
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm me-2"
                                                    onClick={() => toggleEditPopup(company.syscompany_uuid)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11">No records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="pagination d-flex justify-content-center">
                            {Array.from({ length: Math.ceil(companies.length / companiesPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"} mx-1`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        {isEditPopupOpen && (
                            <EditCompanyPopup
                                onClose={() => toggleEditPopup(null)}
                                Syscompany_uuid={editingCompanyId}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperAdmindashboard;
