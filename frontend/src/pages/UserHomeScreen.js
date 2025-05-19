import React, { useEffect, useState } from "react";
import api from "../config/api";
import Header from "../components/Header";


function UserHomeScreen() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, []);
  const fetchUserDetails = async () => {
    try {
      // Retrieve token from localStorage or other secure storage
      const token = sessionStorage.getItem("authToken"); // Replace with actual token retrieval

      if (!token) {
        // setError('User is not logged in');
        return;
      }

      // Make the API request with the token in the Authorization header
      const response = await api.get(
        "/api/auth/get-userDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUserData(response.data.user);
        let userInfo={
            isLoggedIn:true,
            userData:response.data.user
        }
        sessionStorage.setItem('userData',JSON.stringify(userInfo));
      } else {
        console.log(response.data.message || "Failed to fetch user details");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      console.log(err.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Welcome to User Home Screen</h2>
      <div style={{textAlign:'center'}}>
         <h2> Name: {userData.name} <br/> Email: {userData.email} </h2>

      </div>
    </div>
  );
}

export default UserHomeScreen;
