import { useEffect, useState } from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function EpisodeAvatars({ listCharacters }) {
  return (
    <>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary="Participating characters" />
          <AvatarGroup total={listCharacters.length}>
            {listCharacters.map((character, index) => (
              <Avatar key={index} alt={character.name} src={character.image} />
            ))}
          </AvatarGroup>
        </ListItemButton>
      </List>
    </>
  );
}
