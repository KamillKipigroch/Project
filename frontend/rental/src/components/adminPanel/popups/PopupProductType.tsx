import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { IAddProductType } from "../../../models/ProductTypeModel";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStores } from "../../../stores/root.store";
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

const Popup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddProductType>();

  const { productTypeStore } = useStores();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IAddProductType> = async (data) => {
    if (productTypeStore.editMode) {
      if (productTypeStore.editedProductType) {
        productTypeStore.editedProductType.code = data.code;

        await productTypeStore.updateProductType(
          productTypeStore.editedProductType
        );
      }
    } else {
      await productTypeStore.addProductType(data);
    }

    productTypeStore.closePopup();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => productTypeStore.openPopup()}
          sx={{ ml: 1 }}
        >
          {t("newElement")}
        </Button>
      </ThemeProvider>
      <Dialog
        open={productTypeStore.isPopupOpen}
        onClose={productTypeStore.closePopup}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>
            {productTypeStore.editMode ? (
              <>{t("editProductType")}</>
            ) : (
              <>{t("addProductType")}</>
            )}
          </DialogTitle>
          <DialogContent>
            <Div>
              <Element>
                <TextField
                  required
                  id="outlined-required"
                  label={t("name")}
                  type="text"
                  {...register("code", {
                    required: t("requiredField")!,
                  })}
                  error={!!errors?.code}
                  helperText={errors?.code ? errors.code.message : null}
                />
              </Element>
            </Div>
          </DialogContent>
          <DialogActions>
            <Button onClick={productTypeStore.closePopup}>{t("cancel")}</Button>
            <Button type="submit">Ok</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(Popup);
