import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { bgcolor } from "@mui/system";

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
          Logowanie
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <TextField type="email" label="Email" margin="normal" autoFocus />
        <TextField
          type="password"
          label="Hasło"
          margin="normal"
          style={{ marginBottom: "4px" }}
        />
        <Box>
          <Button
            variant="text"
            component={Link}
            to="/register"
            style={{ padding: 0, fontSize: 9, marginLeft: "115px" }}
          >
            Zarejestruj się <ArrowForwardIcon style={{ fontSize: 10 }} />
          </Button>
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: 2, bgcolor: "#DD5353" }}
        >
          <Typography>Zaloguj się</Typography>
        </Button>
      </Box>
    </form>
  );
}
