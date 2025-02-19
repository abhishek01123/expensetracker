import apiRequest from "./Api";


export const GetUserData = async (email, password) => {
    console.log("GetUserData",email,password)
    return await apiRequest("GET", `Login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`);
};


export const SuperAdmindash = async () => {

    // GET THE SESSION and  'Login' is key from localstorage
    var sessionData = localStorage.getItem('Login');


    if (sessionData) {
		const parsedData = JSON.parse(sessionData); 

        return await apiRequest("GET", `SuperAdmin?SysAccount_uuid=${encodeURIComponent(parsedData.sysAccount_UUId)}`);

	} else {
		console.log('No session data found in localStorage.');
	}
   
};


export const GetCountryList = async () => {
    try {
        const response = await apiRequest("GET", "GetCountries");

        if (response && Array.isArray(response.data)) {
            return response.data; // Return only the country array
        } else {
            console.error("Invalid response structure:", response);
            return [];
        }
    } catch (error) {
        console.error("Error fetching country list:", error);
        return [];
    }
};


export const GetStateList = async (_country_id) => {
    return await apiRequest("GET", `GetStates/${encodeURIComponent(_country_id)}`);
};

export const GetCityList = async (_state_id) => {
    return await apiRequest("GET", `GetCities/${encodeURIComponent(_state_id)}`);
};

export const PostCompanyData = async (companyData, companyLogo) => {
    try {
        // Create a FormData object to send data, including the company logo if available
        const formData = new FormData();
        
        // Add each field from companyData to the formData
        for (const key in companyData) {
            formData.append(key, companyData[key]);
        }
        
        // If there's a company logo, add it to the formData
        if (companyLogo) {
            formData.append("company_logo", companyLogo); // Make sure this matches the backend field name
        }

        // Make the API request to submit the form data
        const response = await apiRequest("POST", "AddMasterCompany", formData, true);

        // Check if the response is valid or has an error
        if (!response || response.error) {
            throw new Error(response?.message || "Failed to add company.");
        }

        console.log("Company added successfully:", response);
        return response;  
    } catch (error) {
        console.error("Error during API call:", error.message);
        throw new Error(error.response?.data?.message || "Failed to register the company.");
    }
};



export const EditCompanyDetails = async (Syscompany_uuid) => {
    try {
        return await apiRequest("GET", `GetMasterCompany?Syscompany_uuid=${encodeURIComponent(Syscompany_uuid)}`);
    } catch (error) {
        console.error("Error fetching company details:", error);
        return null;
    }
};



export const UpdateCompanyData = async (companyData, companyLogo) => {

    if (!companyData?.syscompany_uuid) throw new Error("Company UUID is required for updating.");

    const formData = new FormData();

    Object.entries(companyData).forEach(([key, value]) => formData.append(key, value));

    if (companyLogo) formData.append("company_logo", companyLogo);

    return await apiRequest("PUT", "UpdateCompany", formData, true);
};





export const GetMasterEmployee = async () => {
    try {
        const sysAccount_UUId = localStorage.getItem('sysAccount_UUId'); 

        if (!sysAccount_UUId) {
            console.error("No sysAccount_UUId found in localStorage");
            return;
        }

 const response = await apiRequest("GET", `MasterEmployee/GetMasterEmployee?SysAccount_uuid=${encodeURIComponent(sysAccount_UUId)}`);
        
      return response;
    } catch (error) {
        console.error("Error fetching employee data:", error);
    }
};



export const GetRoleNames = async () => {
    try {

        const response = await apiRequest("GET", "MasterEmployee/GetRoleNames");
    
        return response.data || [];
        
    } catch (error) {
        console.error("Error fetching role names:", error);
        return [];
    }
};



export const postEmployeeData = async (employeeData) => {
    try {
  
      const response = await apiRequest('POST', 'MasterEmployee/AddMasterEmployee', employeeData);
  
      console.log('API Response:', response);
  
    } catch (error) {
      console.error('Error posting employee data:', error);
      throw error;
    }
  };
  
  