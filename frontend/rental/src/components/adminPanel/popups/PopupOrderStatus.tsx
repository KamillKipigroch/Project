import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IAddOrderStatus } from "../../../models/OrderStatusModel";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStores } from "../../../stores/root.store";
import { observer } from "mobx-react-lite";

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
  } = useForm<IAddOrderStatus>();

  const { orderStatusStore } = useStores();

  const onSubmit: SubmitHandler<IAddOrderStatus> = async (data) => {
    if (orderStatusStore.editMode) {
      if (orderStatusStore.editedOrderStatus) {
        orderStatusStore.editedOrderStatus.code = data.code;
        orderStatusStore.editedOrderStatus.level = data.level;

        await orderStatusStore.updateOrderStatus(
          orderStatusStore.editedOrderStatus
        );
      }
    } else {
      await orderStatusStore.addOrderStatus(data);
    }

    orderStatusStore.closePopup();
  };

  return (
    <div>
      <Dialog
        open={orderStatusStore.isPopupOpen}
        onClose={orderStatusStore.closePopup}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>
            {orderStatusStore.editMode ? (
              <>Edit order status</>
            ) : (
              <>Add order status</>
            )}
          </DialogTitle>
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
                <TextField
                  required
                  id="outlined-required"
                  label="Level"
                  type="number"
                  {...register("level", {
                    required: "Required field",
                  })}
                  error={!!errors?.level}
                  helperText={errors?.level ? errors.level.message : null}
                />
              </Element>
            </Div>
          </DialogContent>
          <DialogActions>
            <Button onClick={orderStatusStore.closePopup}>Cancel</Button>
            <Button type="submit">Ok</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(Popup);
