import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../config/api";
import Header from "../components/Header";
import {
  Box,
  Button,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Link,
  CircularProgress,
} from '@mui/material';



function Wishlist() {
  const [userData, setUserData] = useState("");
  const [data, setWishData] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate=useNavigate();
  const isLoading = data === null;

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
        "/api/auth/user",
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
        
        const data = {};
        wishresponse.data.wishlist.forEach((wish) => {
          console.log(wish);
          const category = wish.wishgroup_name || "Uncategorized";
          if (!data[category]) {
            data[category] = [];
          }
          data[category].push({name: wish.name,
            url: wish.url	});
        });

        console.log("Wish data:", data);
        setWishData(data);

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

    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={4}>
        {/* Left Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Stack spacing={1}>
              {isLoading && <CircularProgress />}
              {!isLoading &&
                Object.keys(data).map((category) => (
                  <Button
                    key={category}
                    fullWidth
                    variant={selectedCategory === category ? 'contained' : 'outlined'}
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      justifyContent: 'flex-start',
                      backgroundColor: selectedCategory === category ? 'black' : 'transparent',
                      color: selectedCategory === category ? 'white' : 'black',
                      borderColor: 'black',
                      '&:hover': {
                        backgroundColor: '#333',
                        color: 'white',
                      },
                    }}
                  >
                    {category}
                  </Button>
                ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Right Content Area */}
        <Grid item xs={12} sm={8} md={9}>
          {!selectedCategory && (
            <Typography variant="h6" color="textSecondary">
              Please select a category to see items.
            </Typography>
          )}

          {selectedCategory && data && data[selectedCategory] && (
            <>
              <Typography variant="h5" gutterBottom>
                {selectedCategory}
              </Typography>
              <Grid container spacing={2}>
                {data[selectedCategory].map((item, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Card sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image='images/preview.jpg'
                        alt={item.name}
                        sx={{ objectFit: 'contain'}}
                      />
                      <CardContent>
                        <Link href={item.url} target="_blank"><Typography variant="h6">{item.name}</Typography></Link>                        
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Wishlist;
