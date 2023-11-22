import { Fragment, useEffect, useState } from "react";
import Episodes from "../api/Episodes";
import { enqueueSnackbar } from "notistack";
import ListSubheader from "@mui/material/ListSubheader";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

export default function EpisodeCharacter({ urlEpisode }) {
  const [processedData, setProcessedData] = useState([]);
  const [listEpisode, setListEpisode] = useState([]);
  const [open, setOpen] = useState([]);

  const processArray = (array) => {
    const updatedData = [];
    array.forEach((element) => {
      const url = element;
      const segments = url.split("/").filter((segment) => segment !== "");

      if (segments.length > 0) {
        const lastSegment = segments[segments.length - 1];
        updatedData.push(lastSegment);
      }
    });
    return updatedData;
  };

  const handleClick = (index) => {
    setOpen(prevOpen => prevOpen.map((item, idx) => (idx === index ? !item : item)));
  };
  

  const updateOpenSize = (newSize) => {
    setOpen(new Array(newSize).fill(false));
  };
  

  const getEpisodes = async (result) => {
    try {
      const response = await Episodes(result);
      const isArray = Array.isArray(response);
      if (isArray) {
        setListEpisode(response);
      } else {
        setListEpisode([
          response
        ]);
      }
      updateOpenSize(response.length);
    } catch (error) {
      enqueueSnackbar(error + " - Codigo 404 !", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(urlEpisode)) {
      const updatedProcessedData = processArray(urlEpisode);
      setProcessedData(updatedProcessedData);
      getEpisodes(updatedProcessedData); // Llamar getEpisodes cuando procesado
  
    } else {
      console.error("urlEpisode no es un array válido");
    }
  }, [urlEpisode]);
  
  return (
    <List
      sx={{ width: "100%", maxWidth: "auto", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      {listEpisode.map((data, index) => (
        <Fragment key={index}>
          <ListItemButton onClick={() => handleClick(index)}>
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary={data.name} secondary={data.air_date} />
            {open[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[index]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </Fragment>
      ))}
    </List>
  );
  
}
