import React, { useState, useEffect } from 'react';
import { PostCompanyData, GetCountryList, GetStateList, GetCityList } from '../Services/Auth';
import '../Styles/AddCompanyPopup.css';


const AddCompanyPopup = ({ onClose, onCompanyAdded }) => {
    const [companyData, setCompanyData] = useState({
        Company_Name: '',
        Address: '',
        Country: '',
        State: '',
        City: '',
        Zipcode: '',
        Email_Id: '',
        Phone_no: '',
        posted_by: ''
    });

    const [companyLogo, setCompanyLogo] = useState(null); 
    const [logoPreview, setLogoPreview] = useState(''); 
    const [message, setMessage] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);



    useEffect(() => {
        // Get posted_by value from session storage
        const sessionData = localStorage.getItem('Login');
        if (sessionData) {
            const parsedData = JSON.parse(sessionData);
            if (parsedData.sysAccount_UUId) {
                setCompanyData((prevState) => ({
                    ...prevState,
                    posted_by: parsedData.sysAccount_UUId
                }));
            }
        } else {
            console.error('User session not found. Please log in again.');
        }

        fetchCountries();

    }, []);


    const fetchCountries = async () => {
        try {
            const countryList = await GetCountryList();
            setCountries(countryList); 
            console.log("Countries set in state:", countryList);
        } catch (error) {
            console.error("Error fetching countries:", error);
            setCountries([]);
        }
    };
    


    const fetchStates = async (_country_id) => {
        try {
            const response = await GetStateList(_country_id); 
            if (response?.data) {
                setStates(response.data); 
            }
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };
    
    
    

    const fetchCities = async (_state_id) => {
        try {
            const response = await GetCityList(_state_id); // API call
            console.log("City API Response:", response); // Debugging response
    
            if (response?.data) {
                cities && Array.isArray(cities) && cities.map(city => console.log(city));
                setCities(response.data); // Set cities in state
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    
    


    const handleChange = (e) => {
        const { name, value } = e.target;


        setCompanyData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        
        if (name === 'Country') {
            const selectedCountry = countries.find(country => country.value === value);
            if (selectedCountry) {
                fetchStates(selectedCountry.value); // Fetch states using country ID
                setCompanyData((prevState) => ({ ...prevState, State: '', City: '' })); // Reset state & city
                setCities([])
            }
        }
        


        if (name === 'State') {
            const selectedState = states.find(state => state.value === value);
            if (selectedState) {
                fetchCities(selectedState.value);
                setCompanyData((prevState) => ({ ...prevState, City: '' })); 
            }
        }
};

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompanyLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);  
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!companyData.posted_by) {
            setMessage('User session not found. Please log in again.');
            return;
        }

        try {
            const response = await PostCompanyData(companyData, companyLogo);
            if (response) {
                setMessage('Company registered successfully!');
                onClose();

                setCompanyData({
                    Company_Name: '',
                    Address: '',
                    Country: '',
                    State: '',
                    City: '',
                    Zipcode: '',
                    Email_Id: '',
                    Phone_no: '',
                    posted_by: companyData.posted_by
                });

                setCompanyLogo(null);
                setLogoPreview(''); // Reset image preview
                onCompanyAdded(response);
            }
        } catch (error) {
            setMessage('Error adding company. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="modal-container">
            {/* <form onSubmit={handleSubmit} className="modal-form">
           <input type="text" name="Company_Name" placeholder="Company Name" value={companyData.Company_Name} onChange={handleChange} required />
           <input type="text" name="Address" placeholder="Address" value={companyData.Address} onChange={handleChange} required />



   <select name="Country" value={companyData.Country} onChange={handleChange} required>
    <option value="">Select Country</option>
    {countries.map((country) => (
        <option key={country.value} value={country.value}>{country.text}</option> 
    ))}
</select>


<select name="State" value={companyData.State} onChange={(e) => {handleChange(e); fetchCities(e.target.value);}} required>
    <option value="">Select State</option>
    {states.map((state) => (<option key={state.value} value={state.value}>{state.text}</option>))}
</select>


<select name="City" value={companyData.City} onChange={handleChange} disabled={!companyData.State} required>  //  Disabled until state is selected
    <option value="">Select City</option>
    {cities.map((city) => (<option key={city.value} value={city.value}>{city.text}</option>))}
</select>


<input type="text" name="Zipcode" placeholder="Zip Code" value={companyData.Zipcode} onChange={handleChange} required />
<input type="email" name="Email_Id" placeholder="Email" value={companyData.Email_Id} onChange={handleChange} required />
 <input type="text" name="Phone_no" placeholder="Phone Number" value={companyData.Phone_no} onChange={handleChange} required />
                
<input type="file" onChange={handleLogoChange} accept="image/*" />
{logoPreview && (
<div className="logo-preview">
<img src={logoPreview} alt="Logo Preview" style={{ width: '75px', height: '75px', objectFit: 'cover' }} />
</div>
)}

<div className="button-group">
    <button type="submit" className="submit-button"> Add </button>
    <button type="button" className="close-modal-button" onClick={onClose}>Close</button>
    </div>
    </form> */}
    <form onSubmit={handleSubmit} className="modal-form">

<div className="form-row">
    <input type="text" name="Company_Name" placeholder="Company Name" value={companyData.Company_Name} onChange={handleChange} required />
    <input type="text" name="Address" placeholder="Address" value={companyData.Address} onChange={handleChange} required />
</div>


<div className="form-row">
    <select name="Country" value={companyData.Country} onChange={handleChange} required>
        <option value="">Select Country</option>
        {countries.map((country) => (
            <option key={country.value} value={country.value}>{country.text}</option> 
        ))}
    </select>

    <select name="State" value={companyData.State} onChange={(e) => { handleChange(e); fetchCities(e.target.value); }} required>
        <option value="">Select State</option>
        {states.map((state) => (<option key={state.value} value={state.value}>{state.text}</option>))}
    </select>
</div>


<div className="form-row">
    <select name="City" value={companyData.City} onChange={handleChange} disabled={!companyData.State} required>
        <option value="">Select City</option>
        {cities.map((city) => (<option key={city.value} value={city.value}>{city.text}</option>))}
    </select>

    <input type="text" name="Zipcode" placeholder="Zip Code" value={companyData.Zipcode} onChange={handleChange} required />
</div>

<div className="form-row">
    <input type="email" name="Email_Id" placeholder="Email" value={companyData.Email_Id} onChange={handleChange} required />
    <input type="text" name="Phone_no" placeholder="Phone Number" value={companyData.Phone_no} onChange={handleChange} required />
</div>

<div className="form-row">
    <input type="file" onChange={handleLogoChange} accept="image/*" />
    {logoPreview && (
        <div className="logo-preview">
            <img src={logoPreview} alt="Logo Preview" style={{ width: '75px', height: '75px', objectFit: 'cover' }} />
        </div>
    )}
</div>

<div className="button-group">
    <button type="submit" className="submit-button"> Add </button>
    <button type="button" className="close-modal-button" onClick={onClose}>Close</button>
</div>

</form>

    {message && <p>{message}</p>}
</div>
    );
};

export default AddCompanyPopup;






