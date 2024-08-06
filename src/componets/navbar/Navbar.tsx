import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import logo from "../../assets/png/logo.png";
import TabsMenu from "./TabsMenu"; // Asegúrate de importar tu componente de TabsMenu
import { Menu, MenuItem } from "@mui/material";
import { Home, Menu as MenuIcon, Weight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthContext";

const pages = [
  { name: "Panel de control", icon: Home, link: "/home" },
  { name: "Productos", icon: Weight, link: "/products" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, redirectToLogin } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (accion: string) => {
    setAnchorElUser(null);
    console.log(accion);
    if (accion === "Logout") {
      await logout();
      redirectToLogin();
    }
  };

  const handleClick = (route: string) => {
    navigate(route);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0096CC" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                className="h-10 w-15 bg-white rounded-full"
                src={logo}
                alt="Logo"
                onClick={() => handleClick("/home")}
              />
              <Typography variant="h6" sx={{ ml: 2, color: "white" }}>
                MiniMarket
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                ml: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* Asegúrate de que TabsMenu esté configurado para alinear horizontalmente */}
              <TabsMenu tabs={pages} />
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
