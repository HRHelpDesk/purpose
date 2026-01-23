import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  typography: {
    // Base font family – applies to everything unless overridden
    fontFamily: '"Epilogue", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    // Global base size (MUI default is 14px – 16px feels more modern)
    fontSize: 16,

    // Standard weights you can reference
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,

    // ────────────────────────────────────────────────
    // Heading variants – Epilogue looks great bold & condensed
    // ────────────────────────────────────────────────
    h1: {
      fontWeight: 800,          // or 700–900 for strong impact
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.8rem',
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.2rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.8rem',
      lineHeight: 1.25,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.35,
    },

    // ────────────────────────────────────────────────
    // Body & subtitles – keep readable & balanced
    // ────────────────────────────────────────────────
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },

    // ────────────────────────────────────────────────
    // UI elements
    // ────────────────────────────────────────────────
    button: {
      fontWeight: 600,          // buttons usually bolder
      fontSize: '1rem',
      textTransform: 'none',    // Epilogue looks better without uppercase
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },

  // Optional: override component defaults (e.g. buttons use body1 weight normally)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // consistent with button typography
        },
      },
    },
  },
});

// Make fonts scale nicely on different screen sizes
theme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg'],
  factor: 3,          // how aggressively to scale (default is 4)
  variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], // only scale headings
});

export default theme;