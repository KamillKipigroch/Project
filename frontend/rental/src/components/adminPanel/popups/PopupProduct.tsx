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
import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { IAddProduct } from "../../../models/ProductModel";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useStores } from "../../../stores/root.store";
import { Form } from "react-bootstrap";
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

const Popup = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddProduct>();

  const { t } = useTranslation();

  const {
    productStore,
    productTypeStore,
    subCategoryStore,
    conditionStore,
    qualityStore,
  } = useStores();

  const onSubmit: SubmitHandler<IAddProduct> = async (data) => {
    if (productStore.editMode) {
      if (productStore.detailedProduct) {
        productStore.detailedProduct.code = data.code;
        productStore.detailedProduct.description = data.description;
        productStore.detailedProduct.price = data.price;
        productStore.detailedProduct.hero = data.hero;
        productStore.detailedProduct.productType.id = data.productTypeID;
        productStore.detailedProduct.subcategory.id = data.subCategoryID;
        productStore.detailedProduct.condition.id = data.conditionID;
        productStore.detailedProduct.quality.id = data.qualityID;

        await productStore.updateProduct(productStore.detailedProduct);
      }
    } else {
      await productStore.addProduct(data);
    }

    productStore.closePopup();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => productStore.openPopup()}
          sx={{ ml: 1 }}
        >
          {t("newElement")}
        </Button>
      </ThemeProvider>
      <Dialog open={productStore.isPopupOpen} onClose={productStore.closePopup}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>
            {productStore.editMode ? <>{t("editProduct")}</> : <>{t("addProduct")}</>}
          </DialogTitle>
          <DialogContent>
            <Div>
              <Element>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label={t("name")}
                  type="text"
                  {...register("code", {
                    required: "Required field",
                  })}
                  error={!!errors?.code}
                  helperText={errors?.code ? errors.code.message : null}
                />
              </Element>
              <Element>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label={t("description")}
                  type="text"
                  {...register("description", {
                    required: "Required field",
                  })}
                  error={!!errors?.description}
                  helperText={
                    errors?.description ? errors.description.message : null
                  }
                />
              </Element>
              <Element>
                <TextField
                  fullWidth
                  required
                  id="outlined-number"
                  label={t("price")}
                  type="number"
                  {...register("price", {
                    required: "Required field",
                  })}
                  error={!!errors?.price}
                  helperText={errors?.price ? errors.price.message : null}
                />
              </Element>
              <Element>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label={t("hero")}
                  type="text"
                  {...register("hero", {
                    required: "Required field",
                  })}
                  error={!!errors?.hero}
                  helperText={errors?.hero ? errors.hero.message : null}
                />
              </Element>
              {/* PRODUCT TYPE - SELECT */}
              <Element>
                <FormControl error={!!errors?.productTypeID} fullWidth>
                  <InputLabel id="productType">{t("productType")}</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="productType"
                        id="productTypeSelect"
                        label={t("productType")}
                      >
                        {productTypeStore.visibleProductTypes.map(
                          (type, index) => (
                            <MenuItem key={index} value={type.id}>
                              <ListItemText primary={type.code} />
                            </MenuItem>
                          )
                        )}
                      </Select>
                    )}
                    defaultValue={productTypeStore.visibleProductTypes[0]?.id}
                    name="productTypeID"
                    control={control}
                    rules={{ required: "Field required" }}
                  />
                  <FormHelperText error={!!errors?.productTypeID}>
                    {errors?.productTypeID
                      ? errors.productTypeID.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Element>
              {/* SUB-CATEGORY SELECT */}
              <Element>
                <FormControl error={!!errors?.subCategoryID} fullWidth>
                  <InputLabel id="subCategory">{t("subCategory")}</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="subCategory"
                        id="subCategorySelect"
                        label={t("subCategory")}
                      >
                        {subCategoryStore.visibleSubCategories.map(
                          (type, index) => (
                            <MenuItem key={index} value={type.id}>
                              <ListItemText primary={type.code} />
                            </MenuItem>
                          )
                        )}
                      </Select>
                    )}
                    defaultValue={subCategoryStore.visibleSubCategories[0]?.id}
                    name="subCategoryID"
                    control={control}
                    rules={{ required: "Field required" }}
                  />
                  <FormHelperText error={!!errors?.subCategoryID}>
                    {errors?.subCategoryID
                      ? errors.subCategoryID.message
                      : null}
                  </FormHelperText>
                </FormControl>
              </Element>
              {/* CONDITION SELECT */}
              <Element>
                <FormControl error={!!errors?.conditionID} fullWidth>
                  <InputLabel id="condition">{t("condition")}</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="condition"
                        id="conditionSelect"
                        label={t("condition")}
                      >
                        {conditionStore.visibleConditions.map((type, index) => (
                          <MenuItem key={index} value={type.id}>
                            <ListItemText primary={type.code} />
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    defaultValue={conditionStore.visibleConditions[0]?.id}
                    name="conditionID"
                    control={control}
                    rules={{ required: "Field required" }}
                  />
                  <FormHelperText error={!!errors?.conditionID}>
                    {errors?.conditionID ? errors.conditionID.message : null}
                  </FormHelperText>
                </FormControl>
              </Element>
              {/* QUALITY SELECT */}
              <Element>
                <FormControl error={!!errors?.qualityID} fullWidth>
                  <InputLabel id="quality">{t("quality")}</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="quality"
                        id="qualitySelect"
                        label={t("quality")}
                      >
                        {qualityStore.visibleQualities.map((type, index) => (
                          <MenuItem key={index} value={type.id}>
                            <ListItemText primary={type.code} />
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    defaultValue={qualityStore.visibleQualities[0]?.id}
                    name="qualityID"
                    control={control}
                    rules={{ required: "Field required" }}
                  />
                  <FormHelperText error={!!errors?.qualityID}>
                    {errors?.qualityID ? errors.qualityID.message : null}
                  </FormHelperText>
                </FormControl>
              </Element>
            </Div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => productStore.closePopup()}>{t("cancel")}</Button>
            <Button type="submit">Ok</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(Popup);
