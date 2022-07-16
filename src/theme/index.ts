import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    bg: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    bg?: PaletteOptions['primary'];
  }
}
export const theme = createTheme({
  palette: {
    bg: {
      main: '#e6e4e5',
      contrastText: '#202124',
    },
  },
});
