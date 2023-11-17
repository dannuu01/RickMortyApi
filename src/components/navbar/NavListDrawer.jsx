import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function NavListDrawer({navArrayLinks}) {
  
  return (
    <>
      <Box sx={{ width: 250 }}>
        <nav>
          <List>
            {navArrayLinks.map((item) => (
              <ListItem disablePadding key={item.title}>
                <ListItemButton component="a" href={item.path}>
                  <ListItemIcon>
                   { item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
        <Divider></Divider>
      </Box>
    </>
  );
}
