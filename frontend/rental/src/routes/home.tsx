import { observer } from "mobx-react-lite";
import Image from "../assets/pexels-photo-1308648.jpeg";
import { authStore } from "../stores/auth.store";

const Home = () => {
  return (
    <div>
      <div>Hello {authStore.email}</div>
      <div>Najpopularniejsze</div>
      <div>
        <img alt="" src={Image} width="700" height="500"></img>
      </div>
    </div>
  );
};

export default observer(Home);
