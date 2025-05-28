import api from "../config/api";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import UserModel from "../model/userModel";


const SignUp = () => {
  const navigate=useNavigate();
  const [formValues, setFormValues] = useState(new UserModel({}));
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formValues.username) {
      errors.username = "Name is required";
    } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
      errors.username =
        "Name should be 3-15 characters long and can only contain letters, numbers, and underscores.';";
    }

    if(!formValues.email){
      errors.email="Email is required"
    }else if(!/\S+@\S+\.\S+/.test(formValues.email)){
      errors.email="Please enter a valid email address"
    }


    if (!formValues.password) {
      errors.password = 'Password is required';
    }
return errors;

  };


  const handleSubmit=async (e)=>{
    e.preventDefault();
    
    const errors=validateForm();
    console.log(errors);
    if(Object.keys(errors).length===0){
      // alert("Form submitted")
    }else{
      // alert("Form Submission Failed");
      setFormErrors(errors);
    }
    try {
      const response = await api.post("/api/auth/register", formValues);
      console.log(response, 'res');

      if (response.data.success) {
          toast.success(response.data.message || 'Registration successful!');
          setFormValues({username:"",email:"",password:""});
          setFormErrors("");
          navigate('/login');

      } else {
          setFormErrors("");
          toast.error(response.data.message || 'Registration failed!');
      }
  } catch (error) {
      console.error('Error during registration:', error);
      setFormErrors("");
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
          <label>Name</label>
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
          <label>Gender</label>
            <select name="gender" onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female" selected>Female</option>
            </select>
        </div>
        <div className="form-group">
          <label>Industry</label>
            <select name="industry" onChange={handleInputChange}>
                <option value="Finance">Finance</option>
                <option value="Art">Art</option>
                <option value="Retail">Retail</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Tech">Tech</option>


{/*             
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Construction">Construction</option>
                <option value="Transportation">Transportation</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Energy">Energy</option>
                <option value="Media">Media</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Government">Government</option>
                <option value="Non-Profit">Non-Profit</option>
                <option value="Transportation">Transportation</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Real Estate">Real Estate</option> */}
            </select>
        </div>
        <div className="form-group">
          <label>Age Group</label>
            <select name="age_group" onChange={handleInputChange}>
                <option value="18-24">18-24</option>
                <option value="25-34" selected>25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55-64">55-64</option>
                <option value="65+">65+</option>
            </select>
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
