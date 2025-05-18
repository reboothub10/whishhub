import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserModel from "../model/userModel";

const SignUp = () => {
  const [formValues, setFormValues] = useState(new UserModel({}));

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formValues.username) {
      errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
      errors.username =
        "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.';";
    }

    if(!formValues.email){
errors.email="Email is required"
    }else if(!/\S+@\S+\.\S+/.test(formValues.email)){
      errors.email="Please enter a valid email address"
    }
    if (!formValues.mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formValues.mobile)) {
      errors.mobile = 'Mobile number should be 10 digits';
    }

    if (!formValues.password) {
      errors.password = 'Password is required';
    }
return errors;

  };


  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(formValues);
    
    const errors=validateForm();
    console.log(errors);
    if(Object.keys(errors).length===0){
      // alert("Form submitted")
    }else{
      // alert("Form Submission Failed");
      setFormErrors(errors);
    }
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register-user", formValues);
      console.log(response, 'res');

      if (response.data.success) {
          toast.success(response.data.message || 'Registration successful!');
          setFormValues({username:"",email:"",mobile:"",password:""});
          setFormErrors("");
      } else {
          toast.error(response.data.message || 'Registration failed!');
      }
  } catch (error) {
      console.error('Error during registration:', error);
      toast.error(error.response.data.message || "Something went wrong. Please try again later.");
  }
    
    

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };
  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
           
          />
         {formErrors.username?<span className="error-message">{formErrors.username}</span>:''} 
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {formErrors.email?<span className="error-message">{formErrors.email}</span>:''} 
        </div>
        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formValues.mobile}
            onChange={handleInputChange}
          />
          {formErrors.mobile?<span className="error-message">{formErrors.mobile}</span>:''} 
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {formErrors.password?<span className="error-message">{formErrors.password}</span>:''} 
        </div>
        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
      <p style={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link
          to="/login"
          className="toggle-link"
          style={{ color: "#007BFF", textDecoration: "underline" }}
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
