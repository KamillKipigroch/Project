import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
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

  const {
    productStore,
    productTypeStore,
    subCategoryStore,
    conditionStore,
    qualityStore,
  } = useStores();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  const onSubmit: SubmitHandler<IAddProduct> = async (data) => {
    console.log(data);
    // await productStore.addProduct(data);
    // handleClose();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleClickOpen}
          sx={{ ml: 1 }}
        >
          New element
        </Button>
      </ThemeProvider>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>Add product</DialogTitle>
          <DialogContent>
            <Div>
              <Element>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Name"
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
                  label="Description"
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
                  label="Price"
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
                  label="Hero"
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
                  <InputLabel id="productType">Product type</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="productType"
                        id="productTypeSelect"
                        label="productType"
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
                  <InputLabel id="subCategory">Sub-category</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="subCategory"
                        id="subCategorySelect"
                        label="subCategory"
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
                  <InputLabel id="condition">Condition</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="condition"
                        id="conditionSelect"
                        label="condition"
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
                  <InputLabel id="quality">Quality</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="quality"
                        id="qualitySelect"
                        label="quality"
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
              <Element>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Add product photos</Form.Label>
                  <Form.Control type="file" multiple />
                </Form.Group>
                {/* <Button variant="contained" component="label">
                  Upload image
                  <input hidden accept="image/*" multiple type="file" />
                </Button> */}
              </Element>
            </Div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Ok</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(Popup);
