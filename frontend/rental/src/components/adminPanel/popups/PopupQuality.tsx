import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { IAddQuality } from "../../../models/QualityModel";
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
  } = useForm<IAddQuality>();

  const { qualityStore } = useStores();

  const onSubmit: SubmitHandler<IAddQuality> = async (data) => {
    if (qualityStore.editMode) {
      if (qualityStore.editedQuality) {
        qualityStore.editedQuality.code = data.code;

        await qualityStore.updateQuality(qualityStore.editedQuality);
      }
    } else {
      await qualityStore.addQuality(data);
    }

    qualityStore.closePopup();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => qualityStore.closePopup()}
          sx={{ ml: 1 }}
        >
          New element
        </Button>
      </ThemeProvider>
      <Dialog open={qualityStore.isPopupOpen} onClose={qualityStore.closePopup}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>{qualityStore.editMode ? <>Edit quality</> : <>Add quality</>}</DialogTitle>
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
            <Button onClick={qualityStore.closePopup}>Cancel</Button>
            <Button type="submit">Ok</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(Popup);
