import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#DD5353",
  "&:hover": {
    backgroundColor: "#B73E3E",
  },
}));

export default function ElementsButtonGroup() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelcategories")}>{t("categories")}</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelconditions")}>{t("conditions")}</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelproducts")}>{t("products")}</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelproducttypes")}>{t("productTypes")}</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelqualities")}>{t("qualities")}</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminpanelsubcategories")}>{t("subCategories")}</ColorButton>
        <ColorButton variant="contained" onClick={() => navigate("/adminPanelOrders")}>{t("orders")}</ColorButton>
      </ButtonGroup>
    </Box>
  );
}
