import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../stores/root.store";
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#DD5353",
      dark: "#B73E3E",
      contrastText: "white",
    },
  },
});

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  border-radius: 15px;
  margin: 10px;
  flex-direction: column;
`;

const Element = styled.div`
  margin: 10px;
`;

const PopupProductPhotoDetails = () => {
  const { productStore } = useStores();
  const { t } = useTranslation();

  return (
    <div>
      <ThemeProvider theme={theme}></ThemeProvider>
      <Dialog
        open={productStore.isPhotoDetailsPopupOpen}
        onClose={productStore.closePhotoDetailsPopup}
      >
        <DialogTitle>{t("productPhotos")}</DialogTitle>
        <DialogContent>
          <Div>
            <Element>
              {productStore.detailedProduct?.images.length !== 0 ? (
                <Carousel
                  showStatus={false}
                  showThumbs={false}
                  infiniteLoop={true}
                  width="400px"
                  dynamicHeight={false}
                >
                  {productStore.detailedProduct?.images.map((photo) => (
                    <Box key={photo.id} textAlign="center">
                      <img
                        src={photo.code}
                        alt=""
                        height="400px"
                        style={{ objectFit: "cover" }}
                      />
                      <Button
                        variant="text"
                        className="legend myLegend"
                        onClick={() => productStore.deletePhotoFromProduct(photo.id)}
                      >
                        {t("deletePhoto")}
                      </Button>
                    </Box>
                  ))}
                </Carousel>
              ) : null}
            </Element>
          </Div>
        </DialogContent>
        <DialogActions>
          <Button onClick={productStore.closePhotoDetailsPopup}>{t("cancel")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default observer(PopupProductPhotoDetails);
