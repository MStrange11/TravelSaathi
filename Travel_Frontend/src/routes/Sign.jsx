import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'

import "../components/css/Sign.css";
import { useNavigate } from "react-router-dom";


const Sign = ({ setIsAuthenticated }) => {
    const [signUpActive, setSignUpActive] = useState(false);
    const navigate = useNavigate()

    const [signUpFormData, setSignUpFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    })

    const [signInFormData, setSignInFormData] = useState({
        username: '',
        password: '',
    })

    const handleSignUpChange = (e) => {
        setSignUpFormData({
            ...signUpFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignInChange = (e) => {
        setSignInFormData({
            ...signInFormData,
            [e.target.name]: e.target.value
        });
    };

    async function signinHandler(e) {
        e.preventDefault();
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/login/', signInFormData);

            console.log('Response:', response.data);
            console.log(response.data.token);

            // Store the token in a cookie with a 7-day expiration
            Cookies.set('token', response.data.token, { expires: 7 });
            setIsAuthenticated(true);

            // Redirect to the chat page upon successful login
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }

    }

    async function signupHandler(e) {
        e.preventDefault();
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/register/', signUpFormData);

            console.log('Response:', response.data);
            console.log(response.data.token);

            // Store the token in a cookie with a 7-day expiration
            Cookies.set('token', response.data.token, { expires: 7 });
            setIsAuthenticated(true);

            // Redirect to the chat page upon successful login
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="sign ">
            <div
                className={`container ${signUpActive ? "right-panel-active" : ""}`}
                id="main"
            >
                <div className="signup">
                    <form>
                        <h1>Create Account</h1>
                        <input type="text" name="first_name" placeholder="First Name" onChange={handleSignUpChange} required />
                        <input type="text" name="last_name" placeholder="Last Name" onChange={handleSignUpChange} required />
                        <input type="text" name="username" placeholder="Username" onChange={handleSignUpChange} required />
                        <input type="email" name="email" placeholder="Email" onChange={handleSignUpChange} required />
                        <input type="password" name="password" placeholder="Password" onChange={handleSignUpChange} required />
                        <button onClick={signupHandler}>Sign Up</button>
                    </form>
                </div>
                <div className="signin">
                    <form>
                        <h1>Sign in</h1>
                        <input type="text" name="username" placeholder="Username" onChange={handleSignInChange} required />
                        <input type="password" name="password" placeholder="Password" onChange={handleSignInChange} required />
                        {/* <Link to={""}>Forgot your password?</Link> */}
                        <button onClick={signinHandler}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                To keep connected with us, please login with your personal info
                            </p>
                            <button
                                id="signIn"
                                className={`ghost`}
                                onClick={() => {
                                    console.log("signIn");
                                    setSignUpActive(!signUpActive);
                                }}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button
                                id="signUp"
                                className={`ghost`}
                                onClick={() => {
                                    setSignUpActive(!signUpActive);
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sign;
