import { observer } from "mobx-react-lite";
import { authStore } from "../stores/auth.store";

const Home = () => {
  return (
    <div>
      <div>Hello {authStore.email}</div>
      <div>Najpopularniejsze</div>
      <div>
        <img alt="" src="https://www.allkpop.com/upload/2021/02/content/031730/web_data/allkpop_1612392086_untitled-1.jpg" width="850" height="500"></img>
      </div>
    </div>
  );
};

export default observer(Home);
