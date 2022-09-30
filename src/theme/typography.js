import { createTheme } from '@mui/material/styles'
const defaultTheme = createTheme()
function responseFontSizes(fontSize) {
  return {
    fontSize: fontSize * 0.8,
    [defaultTheme.breakpoints.up('sm')]: {
      fontSize: fontSize * 1,
    },
    [defaultTheme.breakpoints.up('md')]: {
      fontSize: fontSize * 1.2,
    },
    [defaultTheme.breakpoints.up('lg')]: {
      fontSize: fontSize * 1.4,
    },
    [defaultTheme.breakpoints.up('xl')]: {
      fontSize: fontSize * 1.6,
    },
  }
}

const typography = {
  h1: {
    ...responseFontSizes(40),
  },
  h2: {
    ...responseFontSizes(36),
  },
  h3: {
    ...responseFontSizes(32),
  },
  h4: {
    ...responseFontSizes(28),
  },
  h5: {
    ...responseFontSizes(24),
  },
  h6: {
    ...responseFontSizes(20),
  },
  subtitle1: {
    ...responseFontSizes(20),
  },
  subtitle2: {
    ...responseFontSizes(16),
  },
  body1: {
    ...responseFontSizes(16),
  },
  body2: {
    ...responseFontSizes(14),
  },
  button: {
    ...responseFontSizes(16),
  },
  caption: {
    ...responseFontSizes(12),
  },
  overline: {
    ...responseFontSizes(8),
  },
}
export default typography
