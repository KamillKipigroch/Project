import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../stores/root.store";

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

  return (
    <div>
      <ThemeProvider theme={theme}></ThemeProvider>
      <Dialog
        open={productStore.isPhotoDetailsPopupOpen}
        onClose={productStore.closePhotoDetailsPopup}
      >
        <DialogTitle>Product photo</DialogTitle>
        <DialogContent>
          <Div>
            <Element>
              <img
                alt=""
                src={productStore?.detailedProduct?.images[0]?.code}
                width="250"
                sizes="max-"
                style={{
                  width: "300px",
                  height: "370px",
                  objectFit: "cover",
                }}
              />
            </Element>
          </Div>
        </DialogContent>
        <DialogActions>
          <Button onClick={productStore.closePhotoDetailsPopup}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default observer(PopupProductPhotoDetails);
