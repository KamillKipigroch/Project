import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { IAddSubCategory } from "../../../models/SubCategoryModel";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useStores } from "../../../stores/root.store";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

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
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddSubCategory>();

  const { subCategoryStore, categoryStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    reset();
    let defaultValues: any = {};
    defaultValues.code = subCategoryStore.editedSubCategory?.code;
    defaultValues.description = subCategoryStore.editedSubCategory?.description;
    defaultValues.categoryID = subCategoryStore.editedSubCategory?.category.id;
    reset({...defaultValues});
  }, [subCategoryStore.editedSubCategory]);

  const onSubmit: SubmitHandler<IAddSubCategory> = async (data) => {
    if (subCategoryStore.editMode) {
      if (subCategoryStore.editedSubCategory) {
        subCategoryStore.editedSubCategory.code = data.code;
        subCategoryStore.editedSubCategory.description = data.description;
        subCategoryStore.editedSubCategory.category.id = data.categoryID;
        
        await subCategoryStore.updateSubCategory(
          subCategoryStore.editedSubCategory
        );
      }
    } else {
      await subCategoryStore.addSubCategory(data);
    }

    subCategoryStore.closePopup();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => subCategoryStore.openPopup()}
          sx={{ ml: 1 }}
        >
          {t("newElement")}
        </Button>
      </ThemeProvider>
      <Dialog
        open={subCategoryStore.isPopupOpen}
        onClose={subCategoryStore.closePopup}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>
            {subCategoryStore.editMode ? (
              <>{t("editSubCategory")}</>
            ) : (
              <>{t("addSubCategory")}</>
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
              <Element>
                <FormControl error={!!errors?.categoryID} fullWidth>
                  <InputLabel id="category">{t("category")}</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="category"
                        id="categorySelect"
                        label={t("category")}
                      >
                        {categoryStore.visibleCategories.map((type, index) => (
                          <MenuItem key={index} value={type.id}>
                            <ListItemText primary={type.code} />
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    defaultValue={categoryStore.visibleCategories[0]?.id}
                    name="categoryID"
                    control={control}
                    rules={{ required: "Field required" }}
                  />
                  <FormHelperText error={!!errors?.categoryID}>
                    {errors?.categoryID ? errors.categoryID.message : null}
                  </FormHelperText>
                </FormControl>
              </Element>
              <Element>
                <TextField
                  required
                  id="outlined-required"
                  label={t("description")}
                  type="text"
                  {...register("description", {
                    required: t("requiredField")!,
                  })}
                  error={!!errors?.description}
                  helperText={
                    errors?.description ? errors.description.message : null
                  }
                />
              </Element>
            </Div>
          </DialogContent>
          <DialogActions>
            <Button onClick={subCategoryStore.closePopup}>Cancel</Button>
            <Button type="submit">Ok</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(Popup);
