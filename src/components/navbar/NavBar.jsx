import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavbarContext } from "../../context/NavbarContext";
import InputSearchNavBar from "./InputSearchNavBar";

const displayStyles = {
  display: {
    xs: "display",
    sm: "none",
  },
};

const MobileHide = {
  display: {
    xs: "none",
    sm: "block",
  },
};


export default function NavBar({ navArrayLinks }) {
  const [open, setOpen] = useState(false);
  const rutasNavegacion = navArrayLinks.filter((ruta) => ruta.title);
  const { pageTitle } = useContext(NavbarContext);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="fixed">
        <Toolbar>
        <IconButton
            size="large"
            onClick={() => setOpen(true)}
            sx={{ ...displayStyles }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Box sx={{ ...MobileHide }}>
          <Typography variant="h6" sx={{ flexGrow: "1" }}>
            {pageTitle}
          </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {rutasNavegacion.map((item) => (
              <Button color="inherit" key={item.id} href={item.path}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ ...displayStyles }}
      >
        <NavListDrawer navArrayLinks={rutasNavegacion} />
      </Drawer>
    </Box>
  );


}
