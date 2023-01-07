import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#DD5353",
  "&:hover": {
    backgroundColor: "#B73E3E",
  },
}));

export default function ElementsButtonGroup() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelcategories")}>Categories</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelconditions")}>Conditions</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelproducts")}>Products</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelproducttypes")}>Product types</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelqualities")}>Qualities</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelsubcategories")}>Subcategory</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminPanelOrders")}>Orders</ColorButton>
      </ButtonGroup>
    </Box>
  );
}
