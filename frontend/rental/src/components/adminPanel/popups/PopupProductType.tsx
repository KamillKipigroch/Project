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
import { IAddProductType } from "../../../models/ProductTypeModel";
import { SubmitHandler, useForm } from "react-hook-form";
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
    handleSubmit,
    formState: { errors },
  } = useForm<IAddProductType>();

  const { productTypeStore } = useStores();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<IAddProductType> = async (data) => {
    await productTypeStore.addProductType(data);
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
          <DialogTitle>Add product type</DialogTitle>
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
