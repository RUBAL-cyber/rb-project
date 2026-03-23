import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
    const navigate = useNavigate();
    const [ error,setError ] = useState('')
    const [ success,setSuccess ] = useState('')
    const [ signInDetails,setSignInDetails ] = useState({
        email:'',
        password:'',
    })

    const handleOnchange = (e) => {
        setSignInDetails({
            ...signInDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(signInDetails.email === '' || signInDetails.password === '' ){
            setError('please fill in all the required field')
            setSuccess('')
            return
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(
            (u) => u.email.toLowerCase() === signInDetails.email.toLowerCase() && u.password === signInDetails.password
        );

        if(!user){
            setError('Invalid email or password');
            setSuccess('');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));

        setSuccess('Sign in successful! Redirecting to home...');
        setError('');
        setSignInDetails({
            email: '',
            password:'',
        })

        setTimeout(() => navigate('/'), 800);
    }

  return (
    <main className="main-sign_in_container">
        <form onSubmit={handleSubmit} className="sign-in-container">
        <p className="error-paragraph">{error !== '' ? `Error: ${error}` : null}</p>
        <p className="success-paragraph">{success !== '' ? success : null}</p>
        <h3>Sign in</h3>
           
            <div className="input-div">
            <label htmlFor="email">
                Email
            </label>
            <input name="email" id="email" type="email"
            placeholder="Enter you email" 
            onChange={handleOnchange}
            value={signInDetails.email}
            />
            </div>
            <div className="input-div">
            <label htmlFor="password">
                password
            </label>
            <input name="password" id="password" type="password"
            placeholder="Enter your password"
            onChange={handleOnchange}
            value={signInDetails.password}
            />
            <button 
              type="button" 
              className="forgot-pass" 
              onClick={() => alert("Password reset functionality not implemented yet. Please contact support.")}
            >
              forgot password?
            </button>
            </div>
            <button className="sign-in-button">
                Sign in
            </button>
            <p className="sign-in-redirect-p">Don't have an account? <Link to="/sign-up">Sign up</Link></p>
    </form>
    </main>
    

  );
};

export default SignIn;