import { createTheme } from '@mui/material/styles';

const FONT_BOLD = 700;
const FONT_MEDIUM = 500;
const FONT_REGULAR = 400;
const FONT_LIGHT = 300;

const EXTRA_SMALL = 0;
const SMALL = 600;
const MIDDLE = 900;
const LARGE = 1200;
const EXTRA_LARGE = 1536;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: EXTRA_SMALL,
      sm: SMALL,
      md: MIDDLE,
      lg: LARGE,
      xl: EXTRA_LARGE,
    },
  },
  palette: {
    primary: {
      main: '#eaf9d9',
    },
    secondary: {
      main: '#ccc7b9',
    },
  },
  typography: {
    fontSize: 16,
    fontWeightBold: FONT_BOLD,
    fontWeightMedium: FONT_MEDIUM,
    fontWeightRegular: FONT_REGULAR,
    fontWeightLight: FONT_LIGHT,
    fontFamily: ['Roboto', 'Helvetica', 'sans-serif'].join(','),
    h1: {
      fontWeight: FONT_BOLD,
      fontSize: '2rem',
      lineHeight: 1.5,
      [`@media (max-width:${LARGE}px)`]: {
        fontSize: '1.9rem',
      },
      [`@media (max-width:${MIDDLE}px)`]: {
        fontSize: '1.8rem',
      },
      [`@media (max-width:${SMALL}px)`]: {
        fontSize: '1.7rem',
      },
    },
    h2: {
      fontWeight: FONT_BOLD,
      fontSize: '1.8rem',
      lineHeight: 1.4,
      [`@media (max-width:${LARGE}px)`]: {
        fontSize: '1.7rem',
      },
      [`@media (max-width:${MIDDLE}px)`]: {
        fontSize: '1.6rem',
      },
      [`@media (max-width:${SMALL}px)`]: {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontWeight: FONT_BOLD,
      fontSize: '1.7rem',
      lineHeight: 1.4,
      [`@media (max-width:${LARGE}px)`]: {
        fontSize: '1.6rem',
      },
      [`@media (max-width:${MIDDLE}px)`]: {
        fontSize: '1.5rem',
      },
      [`@media (max-width:${SMALL}px)`]: {
        fontSize: '1.4rem',
      },
    },
    h4: {
      fontWeight: FONT_MEDIUM,
      fontSize: '1.6rem',
      lineHeight: 1.3,
      [`@media (max-width:${LARGE}px)`]: {
        fontSize: '1.5rem',
      },
      [`@media (max-width:${MIDDLE}px)`]: {
        fontSize: '1.4rem',
      },
      [`@media (max-width:${SMALL}px)`]: {
        fontSize: '1.3rem',
      },
    },
    h5: {
      fontWeight: FONT_MEDIUM,
      fontSize: '1.4rem',
      lineHeight: 1.2,
      [`@media (max-width:${LARGE}px)`]: {
        fontSize: '1.3rem',
      },
      [`@media (max-width:${MIDDLE}px)`]: {
        fontSize: '1.2rem',
      },
      [`@media (max-width:${SMALL}px)`]: {
        fontSize: '1.1rem',
      },
    },
    h6: {
      fontWeight: FONT_MEDIUM,
      fontSize: '1.2rem',
      lineHeight: 1.2,
      [`@media (max-width:${LARGE}px)`]: {
        fontSize: '1.1rem',
      },
      [`@media (max-width:${MIDDLE}px)`]: {
        fontSize: '1rem',
      },
    },
    subtitle1: {
      fontWeight: FONT_MEDIUM,
      fontSize: '1.2rem',
      lineHeight: 1.2,
      [`@media (max-width:${MIDDLE}px)`]: {
        fontSize: '1rem',
      },
    },
    subtitle2: {
      fontWeight: FONT_REGULAR,
      fontSize: '1rem',
      lineHeight: 1.2,
      [`@media (max-width:${SMALL}px)`]: {
        fontSize: '0.9rem',
      },
    },
    body1: {
      fontWeight: FONT_MEDIUM,
      fontSize: '1rem',
      lineHeight: 1.2,
      [`@media (max-width:${MIDDLE}px)`]: {
        fontSize: '0.9rem',
      },
    },
    body2: {
      fontWeight: FONT_REGULAR,
      fontSize: '0.9rem',
      lineHeight: 1.2,
      [`@media (max-width:${MIDDLE}px)`]: {
        fontSize: '0.8rem',
      },
    },
  },
});

export default theme;
