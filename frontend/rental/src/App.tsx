import "./App.css";
import NavBar from "./components/navBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MyToastComponent from "./components/Toast/MyToastComponent";
import { AxiosInterceptors } from "./services/AxiosInterceptors";
import MainRoutes from "./components/ProtectedRoutes/MainRoutes";
import { useEffect } from "react";
import { authStore } from "./stores/auth.store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

AxiosInterceptors();

function App() {
  useEffect(() => {
    authStore.autoLogin();
  }, []);

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <MyToastComponent />
        <NavBar />
        <MainRoutes />
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
