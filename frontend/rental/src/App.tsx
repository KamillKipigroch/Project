import "./App.css";
import NavBar from "./components/navBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MyToastComponent from "./components/Toast/MyToastComponent";
import { AxiosInterceptors } from "./services/AxiosInterceptors";
import MainRoutes from "./components/ProtectedRoutes/MainRoutes";
import { observer } from "mobx-react-lite";

AxiosInterceptors();

function App() {
  return (
    <div>
      <MyToastComponent />
      <NavBar />
      <MainRoutes />
    </div>
  );
}

export default observer(App);
