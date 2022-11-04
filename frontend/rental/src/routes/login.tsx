import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <form noValidate>
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
        <TextField type="email" label="Email" margin="normal" autoFocus />
        <TextField
          type="password"
          label="Password"
          margin="normal"
          style={{ marginBottom: "4px" }}
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
