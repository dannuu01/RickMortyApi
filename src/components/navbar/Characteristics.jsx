import AndroidIcon from "@mui/icons-material/Android";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Avatar from "@mui/material/Avatar";
import FaceIcon from "@mui/icons-material/Face";
import Face3Icon from "@mui/icons-material/Face3";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const titleWhite = {
  color: "white",
  fontWeight: "bold",
};

export default function Characteristics({ data }) {
  const [myIconGender, setIconGender] = useState();
  const [myIconColor, setIconColor] = useState("#757575");

  useEffect(() => {
    switch (data.gender) {
      case "Male":
        setIconColor("#2196f3");
        setIconGender(<FaceIcon />);
        break;
      case "Female":
        setIconColor("pink");
        setIconGender(<Face3Icon />);
        break;
      case "unknown":
        setIconGender(<QuestionMarkIcon />);
        break;
      default:
        setIconGender(null);
        break;
    }
  }, [data.gender]);

  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        justifyContent="center"
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <Item>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ background: myIconColor }}>{myIconGender}</Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ ...titleWhite }}
              primary="Gender"
              secondary={data.gender}
            />
          </ListItem>
        </Item>
        <Item>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AndroidIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ ...titleWhite }}
              primary="Species"
              secondary={data.species}
            />
          </ListItem>
        </Item>
        <Item>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FmdGoodIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ ...titleWhite }}
              primary="Location"
              secondary={data["location"].name}
            />
          </ListItem>
        </Item>
      </Stack>
    </>
  );
}
