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

        const response = await apiRequest("POST", "AddMasterCompany", formData, true);

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
  


  export const GetExpenseApprovers = async (sysAccountUuid) => {
    try {
        const response = await apiRequest("GET", `MasterEmployee/${encodeURIComponent(sysAccountUuid)}`);

        if (response?.data) {
            return response.data;
        } else {
            console.error("Invalid response structure:", response);
            return [];
        }
    }  catch  {
        return [];
    }
};

export const GetFinalApprovers = async (sysAccountUuid) => {
    try {
        const response = await apiRequest("GET", `MasterEmployee/GetFinalApprovers/${encodeURIComponent(sysAccountUuid)}`);

        if (response?.data) {
            return response.data;
        } else {
            console.error("Invalid response structure:", response);
            return [];
        }
    }  catch  {
        return [];
    }
};


export const GetEmployeedatabyid = async (Sysemployee_uuid) => {
    try {
        const response = await apiRequest("GET", `MasterEmployee/Editmasteremployeebyid?Sysemployee_uuid=${encodeURIComponent(Sysemployee_uuid)}`);
        if (response) {
            return response;
        } else {
            console.error("Employee not found.");
            return null;
        }
      } catch {
        return null;
    }
};

export const UpdateMasterEmployee = async (sysemployee_uuid, updatedEmployeeData) => {
    try {
        const response = await apiRequest("PUT", `MasterEmployee/UpdateMasterEmployee?Sysemployee_uuid=${encodeURIComponent(sysemployee_uuid)}`,updatedEmployeeData);
        if (response) {
            return response;
        } else {
         return null;
        }
    }   catch  {
       return null;
    }
};




export const GetExpenseTypes = async (CompanyId) => {
    try {
        const response = await fetch(`http://192.168.1.122:5114/api/MasterEmployee/GetExpenseTypes/${CompanyId}`); 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching expense types:", error);
    }
};



export const PostExpenseType = async (expenseData) => {
    try {
        const response = await apiRequest("POST", "MasterEmployee/PostExpensetype", expenseData);

        if (response && response.message === "Expenses added successfully!") {
            console.log("Expense type added successfully:", response);
            return response;
        } else {
            console.error("Failed to add expense type:", response);
            throw new Error(response?.message || "Failed to add expense type.");
        }
    } catch (error) {
        console.error("Error during expense type API call:", error.message);
        throw error;
    }
};



export const GetExpensegroup = async (CompanyId) => {
    try {
        const response = await apiRequest("GET", `MasterEmployee/GetExpensegroup/${encodeURIComponent(CompanyId)}`);
        if (response) {
            return response;
        } else {
            console.error("Employee not found.");
            return null;
        }
    } catch (error) {
        console.error("API Request Failed:", error);
        return null;
    }
};



export const PostExpensegroup = async (expensegroupdata) => {
    try {
        const response = await apiRequest("POST", "MasterEmployee/PostExpensegroup", expensegroupdata);

        if (response && response.message === "Expenses added successfully!") {
            console.log("Expense type added successfully:", response);
            return response;
        } else {
            console.error("Failed to add expense type:", response);
            throw new Error(response?.message || "Failed to add expense type.");
        }
    } catch (error) {
        console.error("Error during expense type API call:", error.message);
        throw error;
    }
};


// export const GetExpensegroupdetails = async (sysexpensegroup_uuid) => {
//     try {
//         console.log('Fetching expense group details for UUID:', sysexpensegroup_uuid);
//         const response = await apiRequest("GET", `MasterEmployee/MasterExpensegroupDetails/${encodeURIComponent(sysexpensegroup_uuid)}`);
//         if (response) {
//             const parsedResponse = JSON.parse(response);
//             console.log('Parsed Response:', parsedResponse);
//             return parsedResponse;
//         } else {
//             console.error("Expense group details not found.");
//             return null;
//         }
//     } catch (error) {
//         console.error("API Request Failed:", error);
//         return null;
//     }
// };




export const GetExpensegroupdetails = async (sysexpensegroup_uuid) => {
    try {
        const response = await apiRequest("GET", `MasterEmployee/MasterExpensegroupDetails/${encodeURIComponent(sysexpensegroup_uuid)}`);
        if (response) {
            return response
        } else {
            console.error("Employee not found.");
            return null;
        }
    } catch (error) {
        console.error("API Request Failed:", error);
        return null;
    }
};




export const PostMasterExpensegroupDetails = async (expensegroupdetailsdata) => {
    try {
        const response = await apiRequest("POST", "MasterEmployee/PostMasterExpensegroupDetails", expensegroupdetailsdata);

        if (response && response.message && response.message.includes("successfully")) {
            return response;
        } else {
            console.error("Failed to add expense group details:", response);
            throw new Error(response?.message || "Failed to add expense group details.");
        }
    } catch (error) {
        console.error("Error during API call:", error.message);
        throw error;
    }
};




export const GetEmployeeexpense = async (posted_by) => {
    console.log('GetEmployeeexpense:', posted_by);
    try {
        const response = await apiRequest("GET", `Employeeexpense/GetEmployeeexpense/${(posted_by)}`);
        if (response) {
            return response
        } else {
            console.error("Employee not found.");
            return null;
        }
    } catch (error) {
        console.error("API Request Failed:", error);
        return null;
    }
};
