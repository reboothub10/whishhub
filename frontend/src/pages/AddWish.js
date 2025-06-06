import api from "../config/api";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AddWish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [wishgroup_id, setWishgroup] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

   useEffect(() => {
      fetchUserDetails();
    }, []);
    const fetchUserDetails = async () => {
      try {
        // Retrieve token from localStorage or other secure storage
        const token = sessionStorage.getItem("authToken"); // Replace with actual token retrieval
  
        if (!token) {
          // setError('User is not logged in');
          navigate('/login')
          return;
        }
    } catch (err) {
      console.error("Error fetching user details:", err);
      console.log(err.response?.data?.message || "An error occurred");
    }
  };

  // Validation function for email and password
  const validateForm = () => {
    const errors = {};
    if (!title) {
      errors.title = "Title is required";
    } 
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = sessionStorage.getItem("authToken");
    try {
      // Make API request to login
      const response = await api.post("/api/wish/add", {
        title,
        content,
        wishgroup_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } );

      if (response.data.success) {        
        toast.success("Wish Added successfully!");
        navigate('/wishlist')
      } else {
        toast.error(response.data.message || "Adding failed");
      }
    } catch (error) {
      console.error("Error during add function:", error);
      toast.error(error.response.data.message || "Something went wrong. Please try again later.");
    }
  };


  return (
    <div className="login-container">
      <h2>Add New Wish</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">

          <label>Category</label>
          <select name="wishgroup_id" onChange={(e) => setWishgroup(e.target.value)}>
              <option value="1">Default</option>
              <option value="2">Graduation</option>
              <option value="3">Wedding</option>
              <option value="4">Birthday</option>
          </select>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label>URL</label>
          <input
            type="text"
            name="content"
            placeholder="Enter your URL"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>
        <button type="submit" className="login-btn">
          Add
        </button>
      </form>
      
    </div>
  );
};

export default AddWish;
