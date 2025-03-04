
// const apiRequest = async (method, endpoint, data = null) => {
//     const options = {
//         method: method.toUpperCase(),
//         headers: { "Content-Type": "application/json" },
//         body: data ? JSON.stringify(data) : undefined, 
//     };

//     try {
//         const response = await fetch(`http://192.168.2.111:5114/api/${endpoint}`, options);
//         console.log("API response:", response);

//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         return await response.json(); 
        
//     } catch (error) {
//         console.error("API request error:", error);
//         throw error;
//     }
// };

// export default apiRequest;


const apiRequest = async (method, endpoint, data = null, isFormData = false) => {
    const options = {
        method: method.toUpperCase(),
        headers: isFormData ? {} : { "Content-Type": "application/json" },
        body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
    };

    try {
        const response = await fetch(`http://192.168.1.161:5114/api/${endpoint}`, options);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return await response.json(); 
        
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};

export default apiRequest;










