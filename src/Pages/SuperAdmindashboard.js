
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

    const [dropdownOpen, setDropdownOpen] = useState(false);
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

    return (
        <div className="dashboard-container">
            <div className="left-sidee">
                <h1 className="dashboard-heading">Super Admin Dashboard</h1>
            </div>

            <div className="right-side">
                <div className="dropdown">
                    <button className="profile-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        Users
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={handleLogout} className="logout-option">
                                Logout
                            </li>
                        </ul>
                    )}
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : errorMessage ? (
                    <p className="error-message">{errorMessage}</p>
                ) : (
                    <div>
                        <button className="add-button" onClick={togglePopup}>
                            Add
                        </button>
                        {isPopupOpen && <AddCompanyPopup onClose={togglePopup} onCompanyAdded={handleAddCompany} />}

                        <table className="company-table">
                            <thead>
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
                                {companies.length > 0 ? (
                                    companies.map((company) => (
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
                                                    className="edit-button"
                                                    onClick={() => toggleEditPopup(company.syscompany_uuid)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10">No records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>



                        {isEditPopupOpen && (
                            <EditCompanyPopup
                            onClose={() => toggleEditPopup(null)} // Fixed: Passed as function
                            // onCompanyUpdated={handleEditCompany}
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
