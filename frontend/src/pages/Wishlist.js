import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../config/api";
import Header from "../components/Header";


function Wishlist() {
  const [userData, setUserData] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);
  const fetchUserDetails = async () => {
    try {
      // Retrieve token from localStorage or other secure storage
      const token = sessionStorage.getItem("authToken"); // Replace with actual token retrieval

      if (!token) {
        navigate('/login')
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

       // Make the API request with the token in the Authorization header to get list of wishes
       const wishresponse = await api.get(
        "/api/wish/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (wishresponse.data.success) {
        setWishlist(wishresponse.data.wishlist);

      }
      else {
        console.error("Error fetching user wishlist:", wishresponse.data.message);
        // setError(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      console.log(err.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your Wishlist</h2>
      <div style={{textAlign:'center'}}>

      <ul class="list-group" style={{textAlign:'center',display:'inline-block'}}>
          {wishlist.length === 0 && <li className="list-group-item">No wishes found</li>}
          {wishlist &&
            wishlist.map((wish, index) => (
              <li class="list-group-item" key={index} style={{textAlign:'center',padding: '10px', margin: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9',
                border: '1px solid #e2e2e2',
                display: 'block',
                border: '1px solid',
                width: '200px',
                float: 'left',
                clear: 'both', cursor: 'pointer'}}> 
                 <strong><i>{wish.title}</i></strong> <br />
                 {wish.content} 
              </li>
            ))}
        </ul>

      </div>
    </div>
  );
}

export default Wishlist;
