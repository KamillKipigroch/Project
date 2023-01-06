import { observer } from "mobx-react-lite";
import { authStore } from "../stores/auth.store";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import photo from "../assets/kostiumy.png";
import photoKpop from "../assets/kpop.png";

const Home = () => {
  return (
    <div>
      <div>
        {/* <img
          alt=""
          src="https://www.allkpop.com/upload/2021/02/content/031730/web_data/allkpop_1612392086_untitled-1.jpg"
          width="850"
          height="500"
        ></img> */}
        <Box component="span" sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'left',
          justifyContent: 'flex-start',
          height: 600,
          backgroundColor: 'white',
          overflow: 'hidden',
          margin: 2,
        }}>
          <img src={photo} width='250' sizes='max-' style={{ width: "1000px", height: "600px", objectFit: "cover" }}></img>
          <Typography variant="h4" color="#B73E3E">Here you can rent a costume of your favourite character!
          <Box component="span" sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'left',
          justifyContent: 'flex-start',
          height: 600,
          backgroundColor: 'white',
          overflow: 'hidden',
          margin: 2,
        }}>
          <img src={photoKpop} width='250' sizes='max-' style={{ width: "400px", height: "600px", objectFit: "cover" }}></img>

          </Box>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default observer(Home);
