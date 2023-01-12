import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../stores/root.store";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IAddProductImage } from "../../../models/ProductImageModel";
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

const PopupProductPhoto = () => {
  const { productStore } = useStores();
  const { register, handleSubmit } = useForm<IAddProductImage>();
  const { t } = useTranslation();

  const onSubmit = async (data: IAddProductImage) => {
    productStore.addPhotoToProduct(data);
    productStore.closePhotoPopup();
  }

  return (
    <div>
      <ThemeProvider theme={theme}></ThemeProvider>
      <Dialog
        open={productStore.isPhotoPopupOpen}
        onClose={productStore.closePhotoPopup}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>
            {t("addPhoto")}
          </DialogTitle>
          <DialogContent>
            <Div>
              <Element>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>{t("addPhoto")}</Form.Label>
                  <Form.Control type="file" {...register("photo")} />
                </Form.Group>
              </Element>
            </Div>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Ok</Button>
            <Button onClick={productStore.closePhotoPopup}>{t("cancel")}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(PopupProductPhoto);
