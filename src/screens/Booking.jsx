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
import { ContentCut as ScissorsIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import logo from '../assets/purpose_logo.png';

// Default BARBERS_DATA
const BARBERS_DATA = [
  {
    id: 0,
    name: "Any Professional",
    barberId: null,
    locationId: "LE76VA057CZF6",
    image: null,
    bookingSystem: "square",
    bookingUrl: "https://book.squareup.com/appointments/o7otj164cepcv3/location/LE76VA057CZF6/services",
    availability: "Book with any professional",
    isAnyBarber: true
  },
  {
    id: 1,
    name: "Corbin G.",
    barberId: null,
    locationId: "LE76VA057CZF6",
    image: "https://images-prod-1.getsquire.com/0a31323c-56e7-438d-87a0-23d39ccc0760_img_3875.jpeg",
    bookingSystem: "square",
    bookingUrl: "https://book.squareup.com/appointments/o7otj164cepcv3/staff/???/services",
    availability: "Available Today"
  },
  {
    id: 2,
    name: "Romelia",
    barberId: null,
    locationId: "LE76VA057CZF6",
    image: "https://images-prod-1.getsquire.com/81ef238a-fee9-4e1c-85b6-1f121ed56500_avatar.png",
    bookingSystem: "booksy",
    bookingUrl: "http://fadedbyro.booksy.com/a/",
    availability: ""
  },
  {
    id: 3,
    name: "Mizi",
    barberId: "TMzRhT0uDHSONw5c",
    locationId: "LE76VA057CZF6",
    image: "https://images-prod-1.getsquire.com/b2de20ae-881f-4c7a-bc04-6d2ee6eaf348_avatar.png",
    bookingSystem: "square",
    bookingUrl: "https://book.squareup.com/appointments/o7otj164cepcv3/location/LE76VA057CZF6/services",
    availability: "Available Tomorrow"
  },
  {
    id: 4,
    name: "Josue R.",
    barberId: 'TMeh-EUcG7oeWhe_',
    locationId: "LQPKFCWAPBF2F",
    image: "https://images-prod-1.getsquire.com/00ff3773-dbd2-43db-a916-02180e6750a1_avatar.png",
    bookingSystem: "square",
    bookingUrl: "https://book.squareup.com/appointments/cyfw7zxck2ka6b/location/LQPKFCWAPBF2F/services?buttonTextColor=000000&color=f3dbb2&locale=en&referrer=so",
    availability: "Available Tomorrow"
  }
];

const API_BARBERS = 'https://bosscrowns-api-a228488a1e46.herokuapp.com/purpose/barbers';
const API_AVAILABILITY = 'https://bosscrowns-api-a228488a1e46.herokuapp.com/purpose/availability';

const getAvailabilitySortValue = (dateString) => {
  if (!dateString) return Infinity;
  try {
    const slotDate = new Date(dateString + "T00:00:00-06:00");
    return slotDate.getTime();
  } catch {
    return Infinity;
  }
};

const BarberCard = ({ barber, onClick }) => (
  <Card
    elevation={0}
    sx={{
      width: 260,
      height: 280,
      border: '1px solid #e0e0e0',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
      mx: 'auto',
      '@media (max-width: 599px)': {
        width: '100%',
        height: 240,
      },
    }}
  >
    <CardActionArea
      onClick={() => onClick(barber)}
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        bgcolor: '#fafafa',
      }}
    >
      <Avatar
        src={barber.image}
        alt={barber.name}
        variant="square"
        sx={{
          width: 90,
          height: 90,
          mb: 2,
          bgcolor: '#f5f5f5',
          border: '2px solid #e0e0e0',
          borderRadius: '14px',
        }}
      >
        {!barber.image && <ScissorsIcon fontSize="large" />}
      </Avatar>

      <Typography variant="h6" fontWeight={700} align="center" sx={{ mb: 0.75 }}>
        {barber.name}
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center">
        {barber.availability || 'Click to Book'}
      </Typography>
    </CardActionArea>
  </Card>
);

const LoadingCard = () => (
  <Card
    elevation={0}
    sx={{
      width: 260,
      height: 280,
      mx: 'auto',
      border: '1px solid #e0e0e0',
      borderRadius: '16px',
      overflow: 'hidden',
      '@media (max-width: 599px)': {
        width: '100%',
        height: 240,
      },
    }}
  >
    <Box
      sx={{
        height: '100%',
        width: '100%',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fafafa',
      }}
    >
      <Skeleton variant="rectangular" width={90} height={90} sx={{ mb: 2, borderRadius: '14px' }} />
      <Skeleton width="70%" height={28} sx={{ mb: 1 }} />
      <Skeleton width="90%" height={20} />
    </Box>
  </Card>
);

const BarbershopBooking = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBarbersAndAvailability();
  }, []);

  const formatAvailability = (dateString) => {
    if (!dateString) return "Click to Book";
    const slotDate = new Date(dateString + "T00:00:00-06:00");
    const now = new Date();
    const centralNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
    const today = new Date(centralNow); today.setHours(0,0,0,0);
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const slot = new Date(slotDate); slot.setHours(0,0,0,0);

    if (slot.getTime() === today.getTime()) return "Available Today";
    if (slot.getTime() === tomorrow.getTime()) return "Available Tomorrow";
    return `Available ${slot.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/Chicago" })}`;
  };

  const fetchBarbersAndAvailability = async () => {
    try {
      setLoading(true);
      setError(null);

      const barbersRes = await fetch(API_BARBERS);
      if (!barbersRes.ok) throw new Error('Failed to fetch barbers');
      const barbersData = await barbersRes.json();

      const mergedBarbers = BARBERS_DATA.map(local => {
        const dbBarber = barbersData.find(b => b.barberId === local.barberId);
        if (!dbBarber) return { ...local };
        return { ...local, ...dbBarber };
      });

      console.log(mergedBarbers)

      const availabilityRes = await fetch(API_AVAILABILITY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barbers: mergedBarbers }),
      });
      if (!availabilityRes.ok) throw new Error('Failed to fetch availability');
      const availabilityData = await availabilityRes.json();

      let updatedBarbers = mergedBarbers.map(barber => {
        const avail = availabilityData.find(a => a.id === barber.id);
        const nextSlotDate = avail?.nextSlotDate;
        return {
          ...barber,
          availability: formatAvailability(nextSlotDate),
          _sortDate: getAvailabilitySortValue(nextSlotDate),
        };
      });

      updatedBarbers.sort((a, b) => {
        if (a.isAnyBarber) return -1;
        if (b.isAnyBarber) return 1;
        if (a._sortDate !== b._sortDate) return a._sortDate - b._sortDate;
        return a.name.localeCompare(b.name);
      });

      updatedBarbers = updatedBarbers.map(({ _sortDate, ...rest }) => rest);

      setBarbers(updatedBarbers);

    } catch (err) {
      console.error(err);
      setError(err.message);

      let fallbackBarbers = BARBERS_DATA.map(b => ({
        ...b,
        availability: 'Click to Book'
      }));

      fallbackBarbers.sort((a, b) => {
        if (a.isAnyBarber) return -1;
        if (b.isAnyBarber) return 1;
        return a.name.localeCompare(b.name);
      });

      setBarbers(fallbackBarbers);
    } finally {
      setLoading(false);
    }
  };

  // Find the best (soonest) barber for "Any Professional" redirect
  const getBestBarberForAny = () => {
    // Exclude "Any Professional" itself
    const availableBarbers = barbers.filter(b => !b.isAnyBarber);
    if (availableBarbers.length === 0) return null;
    return availableBarbers[0]; // already sorted → first one is the best
  };

  const handleCardClick = (barber) => {
    if (barber.isAnyBarber) {
      const bestBarber = getBestBarberForAny();
      if (bestBarber && bestBarber.bookingUrl) {
        // Go to the soonest barber's booking page
        window.open(bestBarber.bookingUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Fallback to generic services page
        window.open(barber.bookingUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      // Normal barber → direct booking
      window.open(barber.bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: '#fafafa', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar sx={{ justifyContent: 'center', py: 1.5 }}>
          <Box
            component="img"
            src={logo}
            alt="Purpose Barbershop Logo"
            sx={{ height: { xs: 48, sm: 56, md: 64 }, maxWidth: '100%', objectFit: 'contain' }}
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1200, px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
            Choose a professional
          </Typography>

          {error && <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>}

          <Grid container spacing={3} justifyContent="center">
            {loading
              ? Array.from({ length: BARBERS_DATA.length || 4 }).map((_, i) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={i}>
                    <LoadingCard />
                  </Grid>
                ))
              : barbers.map(barber => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={barber.id}>
                    <BarberCard barber={barber} onClick={handleCardClick} />
                  </Grid>
                ))}
          </Grid>

          {/* <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
              onClick={fetchBarbersAndAvailability}
            >
              {loading ? 'Refreshing…' : 'Refresh Availability'}
            </Button>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default BarbershopBooking;