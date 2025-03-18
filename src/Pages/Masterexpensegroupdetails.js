// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import "../Styles/Masterexpensegroupdetails.css";
// import { GetExpenseTypes } from '../Services/Auth';

// const Masterexpensegroupdetails = ({ isOpen, onClose }) => {
//     const [expenseType, setExpenseType] = useState('');
//     const [maxLimit, setMaxLimit] = useState('');
//     const [expenseTypes, setExpenseTypes] = useState([]);
//     const [employeeData, setEmployeeData] = useState({
//         PostedBy: "",
//         CompanyId: ""
//     });

    
//     useEffect(() => {
//         const sysaccountUuid = localStorage.getItem("sysAccount_UUId");
//         const syscompanyUuid = localStorage.getItem("companyID");

//         setEmployeeData((prevData) => ({
//             ...prevData,
//             PostedBy: sysaccountUuid || "",
//             CompanyId: syscompanyUuid || ""
//         }));

//         const fetchExpenses = async () => {
//             try {
//                 const data = await GetExpenseTypes(syscompanyUuid);
//                 if (data && Array.isArray(data)) {
//                     setExpenseTypes(data);
//                 } else {
//                     console.error("Unexpected API response format", data);
//                 }
//             } catch {  
//             }
//         };

//         if (isOpen) {
//             fetchExpenses();
//         }
//     }, [isOpen]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!expenseType.trim() || !maxLimit.trim()) {
//             return;
//         }

//         const expenseDetails = {
//             expense_type: expenseType,
//             max_limit: maxLimit,
//             postedby: employeeData.PostedBy,
//             companyid: employeeData.CompanyId
//         };

//         console.log('Expense Details:', expenseDetails);
//         setExpenseType('');
//         setMaxLimit('');
//         onClose();
//     };

//     return (
//         <Modal
//             isOpen={isOpen}
//             onRequestClose={onClose}
//             contentLabel="Add Expense Group Details"
//             className="modal-content"
//             overlayClassName="modal-overlay"
//             ariaHideApp={false}
//         >
//             <div className="modal-header">
//                 <h3>Add Expense Group Details</h3>
//             </div>
//             <div className="modal-body">
//                 <select
//                     value={expenseType}
//                     onChange={(e) => setExpenseType(e.target.value)}
//                     className="expense-input"
//                     required
//                 >
//                     <option value="">Select expense type</option>
//                     {expenseTypes.map((type) => (
//                         <option key={type.id} value={type.expensetype}>
//                             {type.expensetype}
//                         </option>
//                     ))}
//                 </select>
//                 <input
//                     type="number"
//                     value={maxLimit}
//                     onChange={(e) => setMaxLimit(e.target.value)}
//                     placeholder="Enter max limit"
//                     className="expense-input"
//                     required
//                 />
//             </div>
//             <div className="modal-footer">
//                 <button className="submit-expense-btn" onClick={handleSubmit}>Submit</button>
//                 <button className="close-popup-btn" onClick={onClose}>Cancel</button>
//             </div>
//         </Modal>
//     );
// };

// export default Masterexpensegroupdetails;




// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import "../Styles/Masterexpensegroupdetails.css";
// import { GetExpenseTypes, GetExpensegroupdetails, PostMasterExpensegroupDetails } from '../Services/Auth';

// const Masterexpensegroupdetails = ({ isOpen, onClose, sysexpensegroup_uuid }) => {
//     const [expensetype, setExpensetype] = useState('');
//     const [maxLimit, setMaxLimit] = useState('');
//     const [expenseTypes, setExpenseTypes] = useState([]);
//     const [employeeData, setEmployeeData] = useState({
//         PostedBy: "",
//         CompanyId: ""
//     });

//     useEffect(() => {
//         const sysaccountUuid = localStorage.getItem("sysAccount_UUId");
//         const syscompanyUuid = localStorage.getItem("companyID");

//         setEmployeeData((prevData) => ({
//             ...prevData,
//             PostedBy: sysaccountUuid || "",
//             CompanyId: syscompanyUuid || ""
//         }));

//         const fetchExpenses = async () => {
//             try {
//                 const data = await GetExpenseTypes(syscompanyUuid);
//                 if (data && Array.isArray(data)) {
//                     setExpenseTypes(data);
//                 } else {
//                     console.error("Unexpected API response format", data);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch expense types", error);
//             }
//         };

//         const fetchExpenseGroupDetails = async () => {
//             if (sysexpensegroup_uuid) {
//                 try {
//                     const data = await GetExpensegroupdetails(sysexpensegroup_uuid);
//                     console.log("fetching Expense Group Details", data);
//                 } catch (error) {
//                     console.error("Failed to fetch expense group details", error);
//                 }
//             }
//         };

//         if (isOpen) {
//             fetchExpenses();
//             fetchExpenseGroupDetails();
//         }
//     }, [isOpen, sysexpensegroup_uuid]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!expensetype.trim() || !maxLimit.trim()) {
//             console.warn("Please fill out all fields");
//             return;
//         }

//         const expenseDetails = {
//             Sysexpensegroup_uuid: sysexpensegroup_uuid,
//             Sysexpensetype_uuid: expensetype,
//             maxlimit: maxLimit,
//             PostedBy: employeeData.PostedBy,
//             CompanyId: employeeData.CompanyId
//         };


//         try {
//             const response = await PostMasterExpensegroupDetails(expenseDetails);
//             console.log('API Response:', response);
//         } catch (error) {
//             console.error('Failed to submit expense details:', error);
//         }

//         setExpensetype('');
//         setMaxLimit('');
//         onClose();
//     };

//     return (
//         <Modal
//             isOpen={isOpen}
//             onRequestClose={onClose}
//             contentLabel="Add Expense Group Details"
//             className="modal-content"
//             overlayClassName="modal-overlay"
//             ariaHideApp={false}
//         >
           
//             <div className="modal-body">
//                 <select
//                     value={expensetype}
//                     onChange={(e) => setExpensetype(e.target.value)}
//                     className="expense-input"
//                     required
//                 >
//                     <option value="">Select expense type</option>
//                     {expenseTypes.map((type) => (
//                         <option key={type.id} value={type.sysexpensetype_uuid}>
//                             {type.expensetype}
//                         </option>
//                     ))}
//                 </select>
//                 <input
//                     type="number"
//                     value={maxLimit}
//                     onChange={(e) => setMaxLimit(e.target.value)}
//                     placeholder="Enter max limit"
//                     className="expense-input"
//                     required
//                 />
//             </div>
//             <div className="modal-footer">
//                 <button className="submit-expense-btn" onClick={handleSubmit}>{sysexpensegroup_uuid ? "Update" : "Submit"}</button>
//                 <button className="close-popup-btn" onClick={onClose}>Cancel</button>
//             </div>
//         </Modal>
//     );
// };

// export default Masterexpensegroupdetails;




import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "../Styles/Masterexpensegroupdetails.css";
import { GetExpenseTypes, GetExpensegroupdetails, PostMasterExpensegroupDetails } from '../Services/Auth';

const Masterexpensegroupdetails = ({ isOpen, onClose, sysexpensegroup_uuid }) => {
    const [expensetype, setExpensetype] = useState('');
    const [maxLimit, setMaxLimit] = useState('');
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [expenseGroupDetails, setExpenseGroupDetails] = useState([]);
    const [employeeData, setEmployeeData] = useState({
        PostedBy: "",
        CompanyId: ""
    });

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
                    setExpenseTypes(data);
                } else {
                    console.error("Unexpected API response format", data);
                }
            } catch (error) {
                console.error("Failed to fetch expense types", error);
            }
        };

        const fetchExpenseGroupDetails = async () => {
            if (sysexpensegroup_uuid) {
                try {
                    const data = await GetExpensegroupdetails(sysexpensegroup_uuid);
                    const enrichedData = data.map(detail => ({
                        ...detail,
                        expensetype: detail.expensetypename || 'Unknown Expense Type'
                    }));
                    setExpenseGroupDetails(enrichedData);
                } catch (error) {
                    console.error("Failed to fetch expense group details", error);
                }
            }
        };

        if (isOpen) {
            fetchExpenses().then(fetchExpenseGroupDetails);
        }
    }, [isOpen, sysexpensegroup_uuid, expenseTypes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!expensetype.trim() || !maxLimit.trim()) {
            console.warn("Please fill out all fields");
            return;
        }

        const expenseDetails = {
            Sysexpensegroup_uuid: sysexpensegroup_uuid,
            Sysexpensetype_uuid: expensetype,
            maxlimit: maxLimit,
            PostedBy: employeeData.PostedBy,
            CompanyId: employeeData.CompanyId
        };

        try {
            const response = await PostMasterExpensegroupDetails(expenseDetails);
            const addedExpense = {
            expensetype: expenseTypes.find(type => type.sysexpensetype_uuid === expensetype)?.expensetype,
            maxlimit: maxLimit
};
setExpenseGroupDetails([...expenseGroupDetails, addedExpense]);
} catch (error) {
    console.error('Failed to submit expense details:', error);
}

        setExpensetype('');
        setMaxLimit('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add Expense Group Details"
            className="modal-content"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <div className="modal-body">
                <select
                    value={expensetype}
                    onChange={(e) => setExpensetype(e.target.value)}
                    className="expense-input"
                    required
                >
                    <option value="">Select expense type</option>
                    {expenseTypes.map((type) => (
                        <option key={type.id} value={type.sysexpensetype_uuid}>
                            {type.expensetype}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    value={maxLimit}
                    onChange={(e) => setMaxLimit(e.target.value)}
                    placeholder="Enter max limit"
                    className="expense-input"
                    required
                />
            </div>

            <div className="modal-footer">
                <button className="submit-expense-btn" onClick={handleSubmit}>{sysexpensegroup_uuid ? "Update" : "Submit"}</button>
                <button className="close-popup-btn" onClick={onClose}>Cancel</button>
            </div>
            <div className="expense-list">
                <h3>Expense Group Details</h3>
               <ul style={{ maxHeight: '400px', overflowY: 'auto' }}>
             {[...new Map(expenseGroupDetails.map(item => [item.expensetype, item])).values()]
                .map((detail, index) => (
                 <li key={index}>
                {detail.expensetype || 'Unknown Expense Type'} {detail.maxlimit}
               </li>
        ))}
</ul>

            </div>
        </Modal>
    );
};

export default Masterexpensegroupdetails;

