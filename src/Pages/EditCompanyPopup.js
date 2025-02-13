import React, { useState, useEffect } from "react";
import { 
    GetCountryList, 
    GetStateList, 
    GetCityList, 
    EditCompanyDetails, 
    UpdateCompanyData 
} from "../Services/Auth";

const EditCompanyPopup = ({ onClose, Syscompany_uuid }) => {
    const [companyData, setCompanyData] = useState({
        company_Name: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zipcode: "",
        email_Id: "",
        phone_no: "",
        posted_by: ""
    });

    const [companyLogo, setCompanyLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (Syscompany_uuid) {
            fetchCompanyDetails(Syscompany_uuid);
        }

        const sessionData = localStorage.getItem("Login");
        if (sessionData) {
            const parsedData = JSON.parse(sessionData);
            setCompanyData(prevState => ({
                ...prevState,
                posted_by: parsedData.sysAccount_UUId || ""
            }));
        }
        fetchCountries();
    }, [Syscompany_uuid]);

    const fetchCompanyDetails = async (Syscompany_uuid) => {
        try {
            const companyDetails = await EditCompanyDetails(Syscompany_uuid);
            if (companyDetails) {
                setCompanyData(prevState => ({
                    ...companyDetails,
                    posted_by: companyDetails.posted_by || prevState.posted_by
                }));
                fetchStates(companyDetails.country);
                fetchCities(companyDetails.state);
                setCompanyLogo(null);
                setLogoPreview(companyDetails.company_logo);
            }
        } catch (error) {
            console.error("Error fetching company details:", error);
        }
    };

    const fetchCountries = async () => {
        try {
            const countryList = await GetCountryList();
            setCountries(countryList);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    const fetchStates = async (countryId) => {
        try {
            const response = await GetStateList(countryId);
            setStates(response?.data || []);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const fetchCities = async (stateId) => {
        try {
            const response = await GetCityList(stateId);
            setCities(response?.data || []);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyData(prevState => ({ ...prevState, [name]: value }));

        if (name === "country") {
            fetchStates(value);
            setCompanyData(prevState => ({ ...prevState, state: "", city: "" }));
            setCities([]);
        }

        if (name === "state") {
            fetchCities(value);
            setCompanyData(prevState => ({ ...prevState, city: "" }));
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompanyLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => setLogoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UpdateCompanyData(companyData, companyLogo);
            if (typeof onClose === "function") {
                onClose();  // Close only if `onClose` is a valid function
            } else {
                console.warn("onClose is not a function");
            }
        } catch (error) {
            console.error("Error updating company:", error);
        }
    };

    return (
        <div className="modal-container">


            {/* <form onSubmit={handleSubmit} className="modal-form">
                <input type="text" name="company_Name" placeholder="Company Name" value={companyData.company_Name} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={companyData.address} onChange={handleChange} required />

                <select name="country" value={companyData.country} onChange={handleChange} required>
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country.value} value={country.value}>{country.text}</option>
                    ))}
                </select>

                <select name="state" value={companyData.state} onChange={handleChange} required>
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state.value} value={state.value}>{state.text}</option>
                    ))}
                </select>

                <select name="city" value={companyData.city} onChange={handleChange} required disabled={!companyData.state}>
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.value} value={city.value}>{city.text}</option>
                    ))}
                </select>

                <input type="text" name="zipcode" placeholder="Zip Code" value={companyData.zipcode} onChange={handleChange} required />
                <input type="email" name="email_Id" placeholder="Email" value={companyData.email_Id} onChange={handleChange} required />
                <input type="text" name="phone_no" placeholder="Phone Number" value={companyData.phone_no} onChange={handleChange} required />

                <input type="file" onChange={handleLogoChange} accept="image/*" />
                {logoPreview && <img src={logoPreview} alt="Logo Preview" style={{ width: "75px", height: "75px", objectFit: "cover" }} />}

                <div className="button-group">
                    <button type="submit" className="submit-button">Update</button>
                    <button type="button" className="close-modal-button" onClick={() => {
                        if (typeof onClose === "function") {
                            onClose();
                        } 
                          
                        
                    }}>
                        Close
                    </button>
                </div>
            </form> */}

                 <form onSubmit={handleSubmit} className="modal-form">                
                <div className="form-row">
                    <input type="text" name="Company_Name" placeholder="Company Name" value={companyData.company_Name} onChange={handleChange} required />
                    <input type="text" name="Address" placeholder="Address" value={companyData.address} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <select name="Country" value={companyData.country} onChange={handleChange} required>
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.value} value={country.value}>{country.text}</option>
                        ))}
                    </select>

                    <select name="State" value={companyData.state} onChange={(e) => { handleChange(e); fetchCities(e.target.value); }} required>
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state.value} value={state.value}>{state.text}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <select name="City" value={companyData.city} onChange={handleChange} disabled={!companyData.state} required>
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.value} value={city.value}>{city.text}</option>
                        ))}
                    </select>
                    
                    <input type="text" name="Zipcode" placeholder="Zip Code" value={companyData.zipcode} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <input type="email" name="Email_Id" placeholder="Email" value={companyData.email_Id} onChange={handleChange} required />
                    <input type="text" name="Phone_no" placeholder="Phone Number" value={companyData.phone_no} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <input type="file" onChange={handleLogoChange} accept="image/*" />
                    {logoPreview && (
                        <div className="logo-preview" style={{maxWidth:"50px;", textAlign:"left"}}>
                            <img src={logoPreview} alt="Logo Preview" />
                        </div>
                    )}
                </div>

                <div className="button-group">
                    <button type="submit" className="submit-button">Update</button>
                    <button type="button" className="close-modal-button" onClick={onClose}>Close</button>
                </div>
            </form>



            
        </div>
    );
};

export default EditCompanyPopup;
