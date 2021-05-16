import React from "react";

import {
  CssBaseline,
  StylesProvider,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core";

import "./App.css";

import NavBar from "../src/pages/NavBar/NavigationBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E67E22",
      dark: "#E36A00",
      light: "#E38C40"
    },
    secondary: {
      main: "#0d1011",
      dark: "#F4F4F4",
      light: "#616161"
    },
    background: { default: "#f9fafb", main: "#d9d9d9" }
  },
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  }
});

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <NavBar />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
