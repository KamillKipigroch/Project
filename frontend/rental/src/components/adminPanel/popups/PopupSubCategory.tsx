import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { IAddSubCategory } from "../../../models/SubCategoryModel";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useStores } from "../../../stores/root.store";
import { FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";

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
  } = useForm<IAddSubCategory>();

  const { subCategoryStore, categoryStore } = useStores();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<IAddSubCategory> = async (data) => {
    await subCategoryStore.addSubCategory(data);
    handleClose();
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
          <DialogTitle>Add sub category</DialogTitle>
          <DialogContent>
            <Div>
              <Element>
                <TextField
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
                <FormControl
                  error={!!errors?.categoryID}
                  fullWidth
                >
                  <InputLabel id="category">Category</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="category"
                        id="categorySelect"
                        label="category"
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
