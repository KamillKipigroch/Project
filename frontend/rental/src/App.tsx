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
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

AxiosInterceptors();

function App() {
  useEffect(() => {
    authStore.autoLogin();
  }, []);

  return (
    <div>
      <MyToastComponent />
      <NavBar />
      <MainRoutes />
    </div>
  );
}

export default App;
