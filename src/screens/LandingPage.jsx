import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
  Fab,
} from '@mui/material';
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';

import {
  AccountCircle,
} from '@mui/icons-material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import logo from '../assets/purpose_logo.png';

import heroImage from '../assets/images/hero.jpg'

import gallery1 from '../assets/images/gallery/1.jpeg'
import gallery2 from '../assets/images/gallery/2.jpeg'
import gallery3 from '../assets/images/gallery/3.jpeg'
import gallery4 from '../assets/images/gallery/4.jpeg'
import gallery5 from '../assets/images/gallery/5.jpeg'
import gallery6 from '../assets/images/gallery/6.jpeg'
import gallery7 from '../assets/images/gallery/7.jpeg'
import gallery8 from '../assets/images/gallery/8.jpeg'
import gallery9 from '../assets/images/gallery/9.jpeg'
import gallery10 from '../assets/images/gallery/10.jpeg'
import { Link } from 'react-router-dom';



const navItems = [
  { label: 'Home',     id: 'home'     },
  { label: 'About',    id: 'about'    },
  // { label: 'Services', id: 'services' },  // ← Uncomment when you add the section
  { label: 'Gallery',  id: 'gallery'  },
  { label: 'Location', id: 'location' },
  { label: 'Contact',  id: 'contact'  },
];

const galleryImages = [
  { url: gallery1, alt: 'Fade haircut' },
  { url: gallery2, alt: 'Barber styling' },
  { url: gallery3, alt: 'Modern cut' },
  { url: gallery4, alt: 'Beard trim' },
  { url: gallery5, alt: 'Classic style' },
  { url: gallery6, alt: 'Fade haircut' },
  { url: gallery7, alt: 'Barber styling' },
  { url: gallery8, alt: 'Modern cut' },
  { url: gallery9, alt: 'Beard trim' },
  { url: gallery10, alt: 'Classic style' },
];

export default function BarbershopLanding() {
  const [currentImage, setCurrentImage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImage]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5' }}>
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* Navigation */}
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'white',
          color: 'black',
          boxShadow: 2,
        }}
      >
        <Toolbar
          sx={{
            position: 'relative',
            justifyContent: 'space-between',
            minHeight: { xs: 88, md: 64 },
            py: { xs: 1.5, md: 0 },
          }}
        >
          {isMobile && <Box sx={{ width: 40 }} />}

          <Box
            sx={{
              position: isMobile ? 'absolute' : 'static',
              left: isMobile ? '50%' : 'auto',
              transform: isMobile ? 'translateX(-50%)' : 'none',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Purpose Barbershop Logo"
              sx={{
                height: { xs: 78, md: 64 },
                my: { xs: 1, md: 0 },
                transition: '0.25s',
              }}
            />
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  sx={{ color: 'black', fontSize: '1rem', textTransform: 'none' }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {isMobile && (
            <IconButton edge="end" onClick={toggleDrawer}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{ sx: { width: 260 } }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          {navItems.map((item) => (
            <Button
              key={item.id}
              fullWidth
              onClick={() => {
                scrollTo(item.id);
                toggleDrawer();
              }}
              sx={{
                justifyContent: 'flex-start',
                fontSize: '1.1rem',
                py: 1.5,
                color: 'black',
              }}
            >
              {item.label}
            </Button>
          ))}

          <Button
fullWidth
component={Link}
to="/booking"
onClick={toggleDrawer} // close drawer after click
sx={{
mt: 2,
bgcolor: '#ffeb3b', // brand color
color: 'black',
fontWeight: 'bold',
fontSize: '1.1rem',
py: 1.5,
borderRadius: 2,
'&:hover': { bgcolor: '#fdd835' },
}}
>
Book Now
</Button>
        </Box>
      </Drawer>

      {/* ─── Hero ────────────────────────────────────────────── */}
      <Box
        id="home"
        sx={{
          minHeight: '60vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center" marginTop={20}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'black',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  borderRadius: '10px !important',
                  '&:hover': { bgcolor: '#f0f0f0' },
                }}
              >
                Book Online
              </Button>
            </Link>

            {/* Social Icons */}
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton
                component="a"
                href="https://www.instagram.com/purpose__barber.tattoo?igsh=MWE1bWN0dDFwN3h2ZA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)' }}
              >
                <Instagram />
              </IconButton>

              <IconButton
                component="a"
                href="https://www.facebook.com/share/19cfUwoHes/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)' }}
              >
                <Facebook />
              </IconButton>

              <IconButton
                component="a"
                href="https://www.tiktok.com/@purpose_barbershoptattoo?_t=ZP-8v2jpkbg16c&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)' }}
              >
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M21 8.06c-1.75.02-3.49-.57-4.93-1.69v7.48c0 3.36-2.73 6.1-6.1 6.1-3.36 0-6.1-2.74-6.1-6.1 0-3.36 2.74-6.1 6.1-6.1.31 0 .61.02.91.07v3.3c-.3-.08-.6-.12-.91-.12-1.53 0-2.77 1.25-2.77 2.77 0 1.53 1.24 2.77 2.77 2.77s2.77-1.24 2.77-2.77V2h3.23c.24 2.16 1.96 3.91 4.11 4.17v1.89z"/>
                </svg>
              </IconButton>

              <IconButton
                component="a"
                href="mailto:swaycutz2323@yahoo.com"
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.15)' }}
              >
                <Mail />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ─── Contact ────────────────────────────────────────────────── */}
      <Box id="contact" sx={{ bgcolor: 'white', py: 10 }}>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
            CONTACT US
          </Typography>

          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
                Hours
              </Typography>
              <Typography align="center">Monday–Friday: 10am–7pm</Typography>
              <Typography align="center">Saturday: 9am–5pm</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
                Phone
              </Typography>
              <Typography
                component="a"
                href="tel:18064191028"
                align="center"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                <Phone fontSize="small" />
                806-419-1028
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* The rest remains unchanged: Location, About, Gallery, Footer */}
      {/* ─── Location ───────────────────────────────────────────────── */}
      <Box id="location" sx={{ bgcolor: '#1a1a1a', color: 'white', py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              fontSize: { xs: '2.5rem', md: '4rem' },
            }}
          >
            OUR LOCATION
          </Typography>

          <Typography variant="h5" align="center" sx={{ mb: 5, lineHeight: 1.5 }}>
            2301 N Hobart St<br />
            Pampa, TX 79065
          </Typography>

          <Box
            sx={{
              position: 'relative',
              height: { xs: 300, sm: 400, md: 500 },
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 6,
              mx: 'auto',
              maxWidth: 1000,
            }}
          >
            <iframe
              title="Purpose Barbershop & Tattoo Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.6404024020453!2d-100.97498112404928!3d35.562582236482264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x870749d1a0ac5b71%3A0xf221f96504da8f5a!2sPurpose%20Barbershop%20%26%20Tattoo%20studio!5e0!3m2!1sen!2sus!4v1769183055481!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>

          <Divider sx={{ mt: 8, bgcolor: 'rgba(255,255,255,0.15)' }} />
        </Container>
      </Box>

      {/* ─── About ──────────────────────────────────────────────────── */}
      <Box id="about" sx={{ bgcolor: '#1a1a1a', color: 'white', py: 10 }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 'bold',
              mb: 5,
              fontSize: { xs: '2.8rem', md: '4.5rem' },
            }}
          >
            ABOUT
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ maxWidth: 800, mx: 'auto', mb: 3, lineHeight: 1.9, fontSize: '1.1rem' }}
          >
            Purpose Barbershop & Tattoo Studio in Pampa, TX, is your go-to destination for premium barbering and custom tattoo services. Whether you need a stylish haircut, beard trim, or high-quality tattoo, our skilled barbers and tattoo artists are here to help.
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ maxWidth: 800, mx: 'auto', mb: 3, lineHeight: 1.9, fontSize: '1.1rem' }}
          >
            As the top-rated barbershop and tattoo studio in Pampa, we pride ourselves on delivering exceptional grooming services and unique body art. Offering men's haircuts, fades, shaves, beard grooming, and tattoo designs, we cater to all your personal styling needs.
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.9, fontSize: '1.1rem' }}
          >
            Book an appointment now and experience why we're the leading barbershop and tattoo studio in town!
          </Typography>

          <Divider sx={{ mt: 8, bgcolor: 'rgba(255,255,255,0.15)' }} />
        </Container>
      </Box>

      {/* ─── Gallery ────────────────────────────────────────────────── */}
      <Box id="gallery" sx={{ bgcolor: '#1a1a1a', color: 'white', py: 10 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              maxWidth: 540,
              mx: 'auto',
              aspectRatio: '1080 / 1350',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              image={galleryImages[currentImage].url}
              alt={galleryImages[currentImage].alt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            <IconButton
              onClick={prevImage}
              sx={{
                position: 'absolute',
                left: { xs: 4, sm: 8, md: -60 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.85)',
                '&:hover': { bgcolor: 'white' },
                zIndex: 10,
              }}
            >
              <ChevronLeft fontSize={isMobile ? 'medium' : 'large'} />
            </IconButton>

            <IconButton
              onClick={nextImage}
              sx={{
                position: 'absolute',
                right: { xs: 4, sm: 8, md: -60 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.85)',
                '&:hover': { bgcolor: 'white' },
                zIndex: 10,
              }}
            >
              <ChevronRight fontSize={isMobile ? 'medium' : 'large'} />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 4 }}>
            {galleryImages.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentImage(index)}
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  bgcolor: currentImage === index ? 'white' : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer */}
<Box sx={{ bgcolor: 'white', py: 8 }}>
  <Container>
    {/* Logo (keeping your original) */}
    <Typography
      variant="h5"
      align="center"
      fontWeight="bold"
      sx={{ letterSpacing: 3, color: '#333', mb: 4 }}
    >
      <Box
        component="img"
        src={logo}
        alt="Purpose Barbershop Logo"
        sx={{ height: { xs: 48, sm: 56, md: 85 }, maxWidth: '100%', objectFit: 'contain' }}
      />
    </Typography>

    {/* Small icon row — similar style to hero social icons */}
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5, mt: 2 }}>
      {/* Instagram */}
      {/* <IconButton
        component="a"
        href="https://www.instagram.com/purpose__barber.tattoo?igsh=MWE1bWN0dDFwN3h2ZA%3D%3D&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: '#333', bgcolor: 'rgba(0,0,0,0.06)', '&:hover': { bgcolor: 'rgba(0,0,0,0.12)' } }}
        size="small"
      >
        <Instagram fontSize="small" />
      </IconButton> */}

      {/* Facebook */}
      {/* <IconButton
        component="a"
        href="https://www.facebook.com/share/19cfUwoHes/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: '#333', bgcolor: 'rgba(0,0,0,0.06)', '&:hover': { bgcolor: 'rgba(0,0,0,0.12)' } }}
        size="small"
      >
        <Facebook fontSize="small" />
      </IconButton> */}

      {/* TikTok (keeping your custom SVG) */}
      {/* <IconButton
        component="a"
        href="https://www.tiktok.com/@purpose_barbershoptattoo?_t=ZP-8v2jpkbg16c&_r=1"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: '#333', bgcolor: 'rgba(0,0,0,0.06)', '&:hover': { bgcolor: 'rgba(0,0,0,0.12)' } }}
        size="small"
      >
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 8.06c-1.75.02-3.49-.57-4.93-1.69v7.48c0 3.36-2.73 6.1-6.1 6.1-3.36 0-6.1-2.74-6.1-6.1 0-3.36 2.74-6.1 6.1-6.1.31 0 .61.02.91.07v3.3c-.3-.08-.6-.12-.91-.12-1.53 0-2.77 1.25-2.77 2.77 0 1.53 1.24 2.77 2.77 2.77s2.77-1.24 2.77-2.77V2h3.23c.24 2.16 1.96 3.91 4.11 4.17v1.89z"/>
        </svg>
      </IconButton> */}

      {/* Email */}
      {/* <IconButton
        component="a"
        href="mailto:swaycutz2323@yahoo.com"
        sx={{ color: '#333', bgcolor: 'rgba(0,0,0,0.06)', '&:hover': { bgcolor: 'rgba(0,0,0,0.12)' } }}
        size="small"
      >
        <Mail fontSize="small" />
      </IconButton> */}

      {/* New Profile / Auth icon */}
      <IconButton
        component={Link}
        to="/square-auth"
        sx={{ color: '#333', bgcolor: 'rgba(0,0,0,0.06)', '&:hover': { bgcolor: 'rgba(0,0,0,0.12)' } }}
        size="small"
        title="Profile / Login"
      >
        <AccountCircle fontSize="small" />
      </IconButton>
    </Box>

    {/* Optional: small copyright or extra text */}
    <Typography variant="body2" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
      © {new Date().getFullYear()} Purpose Barbershop & Tattoo Studio
    </Typography>
  </Container>
  <Link to="/booking" style={{ textDecoration: 'none' }}>
<Fab
variant="extended"
sx={{
position: 'fixed',
bottom: 50,
right: 24,
zIndex: 1500,
bgcolor: '#ffeb3b', // adjust brand color
color: 'black',
'&:hover': { bgcolor: '#fdd835' },
boxShadow: 3,
px: 3,
py: 1.5,
fontWeight: 'bold',
fontSize: '1rem',
borderRadius: '12px !important',
}}
>
Book Now
</Fab>
</Link>
</Box>
</Box>
  );
}