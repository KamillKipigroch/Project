import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./searchBar";
import Logo from "../assets/logo.png";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/auth.store";
import { UserRole } from "../models/Enums";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ColorModeContext } from "../theme";
import { useContext, useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {useTheme} from "@mui/material";

function ResponsiveAppBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { t } = useTranslation();

  const pages = ["costumes",  authStore.isAuth ? "userOrders": null,  authStore.rol?.find((role) => role === UserRole.Admin) ? "adminPanel" : null];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

  const navigate = useNavigate();
  const [mode, setMode] = useState<string>("en");

  useEffect(() => {
    i18n.changeLanguage(mode);
  }, [mode]);

  return (
    <AppBar position="static" style={{ background: "#DD5353" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img alt="" src={Logo} width="8%" height="100%" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            COSCOM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOME
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/costumes")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {t("costumes")}
            </Button>
            {authStore.isAuth ? (
              <Button
                onClick={() => navigate("/userOrders")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t("myOrders")}
              </Button>
            ) : null}
            {authStore.rol?.find((role) => role === UserRole.Admin) ? (
              <Button
                onClick={() => navigate("/adminPanel")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t("adminPanel")}
              </Button>
            ) : null}
          </Box>
          <SearchBar />
          <Button
            onClick={() => {
              setMode((prev: string) => (prev === "pl" ? "en" : "pl"));
            }}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {mode}
          </Button>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "light" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: "block", md: "none" },
                }}
            >
                {pages.filter(page => page!=null).map((page) => (
                    <MenuItem
                        key={t(page!)!}
                        onClick={() => {
                            navigate("/" + page);
                            handleCloseNavMenu();
                        }}
                    >
                        <Typography textAlign="center">{t(page!)!}</Typography>
                    </MenuItem>
                ))}
            </Menu>
          {authStore.isAuth ? (
            <Button
              variant="text"
              onClick={() => {
                authStore.logout();
                navigate("/login");
              }}
              color="inherit"
            >
              {t("logout")}
            </Button>
          ) : (
            <Button variant="text" component={Link} to="/login" color="inherit">
              {t("signIn")}
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default observer(ResponsiveAppBar);
