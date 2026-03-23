import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
    const navigate = useNavigate();
    const [ error,setError ] = useState('')
    const [ success,setSuccess ] = useState('')
    const [ userDetails,setuserDetails ] = useState({
        name: '',
        email:'',
        password:'',
        confirm_password: ''
    })

    const handleOnchange = (e) => {
        setuserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(userDetails.confirm_password === '' || userDetails.password === '' || userDetails.email === '' || userDetails.name === ''){
            setError('please fill in all the required field')
            return
        }
        if(userDetails.password !== userDetails.confirm_password){
            setError('Passwords do not match')
            setSuccess('')
            return
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if(users.some((u) => u.email.toLowerCase() === userDetails.email.toLowerCase())){
            setError('An account with this email already exists')
            setSuccess('')
            return
        }

        users.push({
            name: userDetails.name,
            email: userDetails.email.toLowerCase(),
            password: userDetails.password
        });

        localStorage.setItem('users', JSON.stringify(users));

        setSuccess('Sign up successful. You can sign in now.');
        setError('');

        setuserDetails({
            name: '',
            email:'',
            password:'',
            confirm_password: ''
        })

        setTimeout(() => navigate('/sign-in'), 900);
    }

  return (
    <main className="main-sign_up_container">
    
    <form onSubmit={handleSubmit} className="sign-up-container">
        <p className="error-paragraph">{error !== '' ? `Error: ${error}` : null}</p>
        <p className="success-paragraph">{success !== '' ? success : null}</p>
        <h3>Sign up</h3>
        <div className="inputs">

        </div>
            <div className="input-div">
            <label htmlFor="name">
                Name
            </label>
            <input name="name" id="name" type="text"  
            onChange={handleOnchange}
            value={userDetails.name}
            />
            </div>
            <div className="input-div">
            <label htmlFor="email">
                Email
            </label>
            <input name="email" id="email" type="email"  
            onChange={handleOnchange}
            value={userDetails.email}
            />
            </div>
            <div className="input-div">
            <label htmlFor="password">
                password
            </label>
            <input name="password" id="password" type="password"  
            onChange={handleOnchange}
            value={userDetails.password}
            />
            </div>
            <div className="input-div">
            <label htmlFor="confirm_password">
                Confirm Password
            </label>
            <input name="confirm_password" id="confirm_password" type="password"  
            onChange={handleOnchange}
            value={userDetails.confirm_password}
            />
            </div>
            <button className="sign-up-button">
                Sign up
            </button>
            <p className="sign-up-redirect-p">Already have an account? <Link to="/sign-in">Sign in</Link></p>
    </form>
    </main>

  );
};

export default SignUp;