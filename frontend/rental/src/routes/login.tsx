import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserLoginForm } from "../models/AuthModel";
import Constants from "../constants/Constants";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserLoginForm>();

  const onSubmit: SubmitHandler<IUserLoginForm> = (data: IUserLoginForm) => {
    console.log(data);
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
          Sign in
        </Typography>
        <Divider sx={{ width: "100%" }} />
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
            minLength: {
              value: 6,
              message: "Password is too short",
            },
          })}
          error={!!errors?.password}
          helperText={errors?.password ? errors.password.message : null}
        />
        <Box>
          <Button
            variant="text"
            component={Link}
            to="/register"
            style={{ padding: 0, fontSize: 9, marginLeft: "145px" }}
          >
            Sign up <ArrowForwardIcon style={{ fontSize: 10 }} />
          </Button>
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: 2, bgcolor: "#DD5353" }}
        >
          <Typography>Sign in</Typography>
        </Button>
      </Box>
    </form>
  );
}