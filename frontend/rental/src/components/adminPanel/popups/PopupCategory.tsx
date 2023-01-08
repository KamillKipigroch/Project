import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddCategory } from "../../../models/CategoryModel";
import { useStores } from "../../../stores/root.store";
import { observer } from "mobx-react-lite";
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
  const { categoryStore } = useStores();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddCategory>();

  const onSubmit: SubmitHandler<IAddCategory> = async (data) => {
    if (categoryStore.editMode) {
      if (categoryStore.editedCategory) {
        categoryStore.editedCategory.code = data.code;
        await categoryStore.updateCategory(categoryStore.editedCategory);
      }
    } else {
      await categoryStore.addCategory(data);
    }
    categoryStore.closePopup();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => categoryStore.openPopup()}
          sx={{ ml: 1 }}
        >
          {t("newElement")}
        </Button>
      </ThemeProvider>
      <Dialog
        open={categoryStore.isPopupOpen}
        onClose={categoryStore.closePopup}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>
            {categoryStore.editMode ? <>{t("editCategory")}</> : <>{t("addCategory")}</>}
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
            <Button onClick={() => categoryStore.closePopup()}>{t("cancel")}</Button>
            <Button type="submit">OK</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(Popup);
