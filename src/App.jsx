import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Skeleton,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  ContentCut as ScissorsIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

/* ===========================
   BARBER DATA
=========================== */
const BARBERS_DATA = [
  {
    id: 3,
    name: "Mizi",
    image: "https://images-prod-1.getsquire.com/b2de20ae-881f-4c7a-bc04-6d2ee6eaf348_avatar.png",
    bookingSystem: "square",
    squareLocationId: "LE76VA057CZF6",
    bookingUrl: "https://book.squareup.com/appointments/o7otj164cepcv3/location/LE76VA057CZF6/services"
  },
  {
    id: 1,
    name: "Corbin G.",
    image: "https://images-prod-1.getsquire.com/0a31323c-56e7-438d-87a0-23d39ccc0760_img_3875.jpeg",
    bookingSystem: "square",
    squareLocationId: "L7X8Y9Z0A1B2C3D4E5F6",
    bookingUrl: "https://square.site/book/YOUR_SQUARE_ID/corbin"
  },
  {
    id: 2,
    name: "Romelia",
    image: "https://images-prod-1.getsquire.com/81ef238a-fee9-4e1c-85b6-1f121ed56500_avatar.png",
    bookingSystem: "square",
    squareLocationId: "M8N9O0P1Q2R3S4T5U6V7",
    bookingUrl: "https://square.site/book/YOUR_SQUARE_ID/romelia"
  },
  {
    id: 4,
    name: "Josue R.",
    image: "https://images-prod-1.getsquire.com/00ff3773-dbd2-43db-a916-02180e6750a1_avatar.png",
    bookingSystem: "booksy",
    bookingUrl: "https://booksy.com/en-us/YOUR_LOCATION/josue"
  }
];

const API_URL = 'http://localhost:3000/purpose/availability';

/* ===========================
   CARDS
=========================== */
const BarberCard = ({ barber, onClick }) => (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      border: '1px solid #e0e0e0',
      borderRadius: '16px',
      transition: 'all 0.2s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }
    }}
  >
    <CardActionArea
      onClick={() => onClick(barber.bookingUrl)}
      sx={{
        height: '100%',
        minWidth: {sm: '100%', md: 160,  lg: 180},
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: '#fafafa',
        p: 3,
        minHeight: { xs: 200, sm: 220 }
      }}
    >
      <Avatar
        src={barber.image}
        alt={barber.name}
        variant="square"
        sx={{
          width: { xs: 64, sm: 72 },
          height: { xs: 64, sm: 72 },
          mb: 2,
          bgcolor: '#f5f5f5',
          border: '2px solid #e0e0e0',
          borderRadius: '12px',
        }}
      >
        {!barber.image && <ScissorsIcon />}
      </Avatar>

      <Typography fontWeight={600}>
        {barber.name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {barber.availability}
      </Typography>
    </CardActionArea>
  </Card>
);

const LoadingCard = () => (
  <Card
    elevation={0}
    sx={{
      p: 3,
      border: '1px solid #e0e0e0',
      borderRadius: '16px',
      minHeight: { xs: 200, sm: 220 }
    }}
  >
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Skeleton variant="rectangular" width={72} height={72} sx={{ mb: 2 }} />
      <Skeleton width={100} height={24} />
      <Skeleton width={120} height={20} />
    </Box>
  </Card>
);

/* ===========================
   MAIN PAGE
=========================== */
const BarbershopBooking = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const formatAvailability = (dateString) => {
    if (!dateString) return "Click to Book";

    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);
    today.setHours(0,0,0,0);
    tomorrow.setHours(0,0,0,0);
    date.setHours(0,0,0,0);

    if (date.getTime() === today.getTime()) return "Available Today";
    if (date.getTime() === tomorrow.getTime()) return "Available Tomorrow";

    return `Available ${date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })}`;
  };

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      setError(null);

      // Send all barbers to backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barbers: BARBERS_DATA,
          locationIds: BARBERS_DATA.filter(b => b.bookingSystem === 'square').map(b => b.squareLocationId)
        })
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();

      // Format availability for frontend
      const updatedBarbers = data.map(b => ({
        ...b,
        availability: formatAvailability(b.nextSlotDate || null)
      }));

      setBarbers(updatedBarbers);
    } catch (err) {
      setError(err.message);
      setBarbers(BARBERS_DATA.map(b => ({ ...b, availability: 'Click to Book' })));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: '#fafafa',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* HEADER */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography fontWeight={700} fontSize="1.5rem" color="black">
            Purpose Barbershop
          </Typography>
        </Toolbar>
      </AppBar>

      {/* CONTENT WRAPPER */}
      <Box sx={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1200, px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>

          <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
            Choose a professional
          </Typography>

           {error && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              Could not fetch real-time availability.
            </Alert>
          )}

          <Grid container alignContent="center" spacing={3}>
            {loading
              ? Array.from({ length: BARBERS_DATA.length }).map((_, i) => (
                  <Grid item xs={6} md={3} key={i}>
                    <LoadingCard />
                  </Grid>
                ))
              : barbers.map(barber => (
                  <Grid item xs={6} md={3} key={barber.id}>
                    <BarberCard barber={barber} onClick={url => window.open(url, '_blank')} />
                  </Grid>
                ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
              onClick={fetchAvailability}
            >
              {loading ? 'Refreshing…' : 'Refresh Availability'}
            </Button>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default BarbershopBooking;
