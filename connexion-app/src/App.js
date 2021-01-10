import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import AppRouter from "./router";
import { AuthProvider } from "./AuthContext";
import GlobalStyles from "./GlobalStyles";
import theme from "./Theme";
import store from "./store";
import "./App.css";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </Provider>
        <GlobalStyles />
      </ThemeProvider>
    </div>
  );
};

export default App;
