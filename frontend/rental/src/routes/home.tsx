import { observer } from "mobx-react-lite";
import Image from "../assets/pexels-photo-1308648.jpeg";
import { useStores } from "../stores/root.store";

const Home = () => {
  const { authStore } = useStores();

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
