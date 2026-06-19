import React from "react";
import "./app.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import { Provider } from "react-redux";
import { store } from "./app.store";
import { ThemeProvider } from "./context/ThemeContext.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
