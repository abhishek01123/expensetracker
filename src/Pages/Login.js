import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserData } from '../Services/Auth';
import '../Styles/Login.css';

const Login = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		if (!email || !password) {
			setErrorMessage('Email and password are required.');
			return;
		}
	
		setErrorMessage('');
		setLoading(true);
	
		try {
			const response = await GetUserData(email, password);
			console.log('Login Response:', response);
	
			if (response.message === 'Login Successfully') {

        // CONVERT JSON DATA IN ARRAY 
		    const convertedJson = JSON.stringify(response);
		    console.log('convertedJson', convertedJson);


				// Store user details in localStorage
				localStorage.setItem('Login', JSON.stringify(response));
				localStorage.setItem('sysAccount_UUId', response.sysAccount_UUId);
	

				
				if (response.usertype === "CompanyAdmin") {
					navigate('/masteremployee');

				} else {
					navigate('/dashboard');
				}
			} else {
				setErrorMessage('Invalid email or password. Please try again.');
			}
	
		} catch (error) {
			console.error('Login Error: ', error);
			setErrorMessage('An error occurred while logging in. Please try again.');
		} finally {
			setLoading(false);
		}
	};
	
	return (
		<div className="login-page">  
		  <div className="login-container">
			<div className="left-side">
			  <h1>ExpenseTracker</h1>
			  <p>Track your expenses easily and efficiently with our ExpenseTracker application.</p>
			</div>
	  
			<div className="right-side">
			  <form onSubmit={handleSubmit}>
				<h2>Login</h2>
				{errorMessage && <p className="error-message">{errorMessage}</p>}
	  
				<div className="form-group">
				  <label>Email</label>
				  <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
				</div>
	  
				<div className="form-group">
				  <label>Password</label>
				  <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
				</div>
	  
				<button type="submit" disabled={loading}>
				  {loading ? '' : 'Login'}
				  {loading && (
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}


				</button>
			  </form>

  
			</div>
		  </div>
		</div>
	  );
	  
	// return (
	// 	<div className="login-container">
	// 		<div className="left-side">
	// 			<h1>ExpenseTracker</h1>
	// 			<p>Track your expenses easily and efficiently with our ExpenseTracker application.</p>
	// 		</div>

	// 		<div className="right-side">
	// 			<form onSubmit={handleSubmit}>
	// 				<h2>Login</h2>
	// 				{errorMessage && <p className="error-message">{errorMessage}</p>}

	// 				<div className="form-group">
	// 					<label>Email</label>
	// 					<input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
	// 				</div>

	// 				<div className="form-group">
	// 					<label>Password</label>
	// 					<input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
	// 				</div>

	// 				<button type="submit" disabled={loading}>
	// 					{loading ? 'Logging in...' : 'Login'}
	// 				</button>
	// 			</form>
	// 		</div>
	// 	</div>
	// );
};

export default Login;

