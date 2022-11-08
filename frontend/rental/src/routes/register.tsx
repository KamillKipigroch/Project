import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserRegistrationForm } from "../models/AuthModel";
import Constants from "../constants/Constants";
import { useStores } from "../stores/root.store";

const Register = () => {
  const { authStore } = useStores();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegistrationForm>();

  const onSubmit: SubmitHandler<IUserRegistrationForm> = async (
    data: IUserRegistrationForm
  ) => {
    await authStore.registration(data).then(() => {
      navigate("/home");
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
      >
        <Typography variant="h3" mb={2}>
          Sign up
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <TextField
          type="firstName"
          label="First Name"
          margin="normal"
          autoFocus
          {...register("firstName", {
            required: "Field required",
          })}
          error={!!errors?.firstName}
          helperText={errors?.firstName ? errors.firstName.message : null}
        />
        <TextField
          type="lastName"
          label="Last Name"
          margin="normal"
          autoFocus
          {...register("lastName", {
            required: "Field required",
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
            required: "Field required",
            pattern: {
              value: Constants.validEmailRegEx,
              message: "Invalid email address",
            },
          })}
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
        />
        <TextField
          type="password"
          label="Password"
          margin="normal"
          style={{ marginBottom: "4px" }}
          {...register("password", {
            required: "Field required",
          })}
          error={!!errors?.password}
          helperText={errors?.password ? errors.password.message : null}
        />
        <Box>
          <Button
            variant="text"
            component={Link}
            to="/login"
            style={{ padding: 0, fontSize: 9, marginLeft: "145px" }}
          >
            Sign in <ArrowForwardIcon style={{ fontSize: 10 }} />
          </Button>
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: 2, bgcolor: "#DD5353" }}
        >
          <Typography>Sign up</Typography>
        </Button>
      </Box>
    </form>
  );
};

export default Register;
