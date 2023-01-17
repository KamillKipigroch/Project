import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserRegistrationForm } from "../models/AuthModel";
import Constants from "../constants/Constants";
import { LoadingButton } from "@mui/lab";
import { authStore } from "../stores/auth.store";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegistrationForm>();

  const onSubmit: SubmitHandler<IUserRegistrationForm> = async (
    data: IUserRegistrationForm
  ) => {
    await authStore.register(data).then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxWidth={300}
        margin="auto"
        marginTop={2}
        padding={3}
        marginBottom="70px"
      >
        <Typography variant="h3" mb={2}>
          {t("signUp")}
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <TextField
          type="firstName"
          label={t("firstName")}
          margin="normal"
          autoFocus
          {...register("firstName", {
            required: t("requiredField")!,
          })}
          error={!!errors?.firstName}
          helperText={errors?.firstName ? errors.firstName.message : null}
        />
        <TextField
          type="lastName"
          label={t("lastName")}
          margin="normal"
          autoFocus
          {...register("lastName", {
            required: t("requiredField")!,
          })}
          error={!!errors?.lastName}
          helperText={errors?.lastName ? errors.lastName.message : null}
        />
        <TextField
          type="email"
          label="Email"
          margin="normal"
          autoFocus
          {...register("email", {
            required: t("requiredField")!,
            pattern: {
              value: Constants.validEmailRegEx,
              message: t("invalidEmailAddress")!,
            },
          })}
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
        />
        <TextField
          type="password"
          label={t("password")}
          margin="normal"
          style={{ marginBottom: "4px" }}
          {...register("password", {
            required: t("requiredField")!,
            minLength: {
              value: 7,
              message: t("passwordTooShort")!,
            },
          })}
          error={!!errors?.password}
          helperText={errors?.password ? errors.password.message : null}
        />
        <TextField
          type="password"
          label={t("confirmPassword")}
          margin="normal"
          required
          style={{ marginBottom: "4px" }}
          {...register("confirmPassword", {
            required: t("requiredField")!,
            validate: (val: string) => {
              if (watch("password") !== val) {
                return t("passwordsDoNotMatch")!;
              }
            },
          })}
          error={!!errors?.confirmPassword}
          helperText={
            errors?.confirmPassword ? errors.confirmPassword.message : null
          }
        />
        <Box>
          <Button
            variant="text"
            component={Link}
            to="/login"
            style={{ padding: 0, fontSize: 9, marginLeft: "145px" }}
          >
            {t("signIn")} <ArrowForwardIcon style={{ fontSize: 10 }} />
          </Button>
        </Box>
        <LoadingButton
          loading={authStore.loading}
          loadingIndicator="Loading.."
          variant="contained"
          type="submit"
          sx={{ marginTop: 2, bgcolor: "#DD5353" }}
        >
          <Typography>{t("signUp")}</Typography>
        </LoadingButton>
      </Box>
    </form>
  );
};

export default Register;
