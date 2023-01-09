import "./App.css";
import NavBar from "./components/navBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MyToastComponent from "./components/Toast/MyToastComponent";
import { AxiosInterceptors } from "./services/AxiosInterceptors";
import MainRoutes from "./components/ProtectedRoutes/MainRoutes";
import { Suspense, useEffect } from "react";
import { authStore } from "./stores/auth.store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TranslationsEn } from "./translations/TranslationsEn";
import { TranslationsPl } from "./translations/TranslationsPl";
import Footer from "./components/footer";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: TranslationsEn },
    pl: { translation: TranslationsPl },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

AxiosInterceptors();

function App() {
  useEffect(() => {
    authStore.autoLogin();
  }, []);

  const [theme, colorMode] = useMode();

  return (
    <Suspense fallback="Loading..">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <MyToastComponent />
            <NavBar />
            <div style={{minHeight:900}}>
              <MainRoutes />
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Suspense>
  );
}

export default App;
