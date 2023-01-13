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
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddCondition } from "../../../models/ConditionModel";
import { useStores } from "../../../stores/root.store";
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
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddCondition>();

  const { conditionStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    reset();
    let defaultValues: any = {};
    defaultValues.code = conditionStore.editedCondition?.code;
    defaultValues.price = conditionStore.editedCondition?.price;
    reset({...defaultValues});
  }, [conditionStore.editedCondition]);

  const onSubmit: SubmitHandler<IAddCondition> = async (data) => {
    if (conditionStore.editMode) {
      if (conditionStore.editedCondition) {
        conditionStore.editedCondition.code = data.code;
        conditionStore.editedCondition.price = data.price;

        await conditionStore.updateCondition(conditionStore.editedCondition);
      }
    } else {
      await conditionStore.addCondition(data);
    }

    conditionStore.closePopup();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => conditionStore.openPopup()}
          sx={{ ml: 1 }}
        >
          {t("newElement")}
        </Button>
      </ThemeProvider>
      <Dialog
        open={conditionStore.isPopupOpen}
        onClose={conditionStore.closePopup}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>
            {conditionStore.editMode ? <>{t("editCondition")}</> : <>{t("addCondition")}</>}
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
                <TextField
                  required
                  id="outlined-number"
                  label={t("price")}
                  type="number"
                  {...register("price", {
                    required: t("requiredField")!,
                  })}
                  error={!!errors?.price}
                  helperText={errors?.price ? errors.price.message : null}
                />
              </Element>
            </Div>
          </DialogContent>
          <DialogActions>
            <Button onClick={conditionStore.closePopup}>{t("cancel")}</Button>
            <Button type="submit">OK</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(Popup);
