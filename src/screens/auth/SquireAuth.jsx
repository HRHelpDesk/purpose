import React from "react";
import { Box, Button, Typography, Card } from "@mui/material";

export default function PurposeAuth() {
  const handleSquareAuth = () => {
    const scopes = [
      // Bookings
      "APPOINTMENTS_READ",
      "APPOINTMENTS_WRITE",
      "APPOINTMENTS_BUSINESS_SETTINGS_READ",
      // Employees / Team
      "EMPLOYEES_READ",
      "EMPLOYEES_WRITE",
      // Catalog
      "ITEMS_READ",
      "ITEMS_WRITE"
    ].join(" "); // space-separated


const clientId = "sq0idp-_5H1iRJA-t5ybiDXb-UElQ";
const redirectUri = process.env.NODE_ENV === 'production'
  ? "https://bosscrowns-api-a228488a1e46.herokuapp.com/api/square/oauth/callback"
  : "http://localhost:3000/api/square/oauth/callback";

const authUrl =
  `https://connect.squareup.com/oauth2/authorize` +
  `?client_id=${clientId}` +
  `&scope=${encodeURIComponent(scopes)}` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}` +
  `&session=false` +
  `&state=${generateRandomState()}`;

console.log("Redirecting to Square OAuth:", authUrl);
sessionStorage.setItem('square_oauth_state', authUrl.split('state=')[1]);

window.location.href = authUrl;

  };

  // Generate random state for CSRF protection
  const generateRandomState = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f7fb"
    >
      <Card sx={{ p: 5, width: 420, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Connect Your Square Account
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Securely connect your Square account so we can check your availability.
        </Typography>
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={handleSquareAuth}
          sx={{
            bgcolor: '#006aff',
            '&:hover': {
              bgcolor: '#0055cc'
            }
          }}
        >
          Connect with Square
        </Button>
      </Card>
    </Box>
  );
}