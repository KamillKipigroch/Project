import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import photo from "../assets/kostiumy.png";
import photoKpop from "../assets/kpop.png";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
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
          <img alt="" src={photo} width='250' sizes='max-' style={{ width: "1000px", height: "600px", objectFit: "cover" }}></img>
          <Typography variant="h4" color="#B73E3E">{t("homePageMessage")}
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
          <img alt="" src={photoKpop} width='250' sizes='max-' style={{ width: "400px", height: "600px", objectFit: "cover" }}></img>

          </Box>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default observer(Home);
