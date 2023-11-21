import { Fragment, useContext, useEffect, useState } from "react";
import Episodes from "../api/Episodes";
import { enqueueSnackbar } from "notistack";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { NavbarContext } from "../context/NavbarContext";
import LiveTvIcon from '@mui/icons-material/LiveTv';

export default function EpisodeCharacter({ urlEpisode }) {
    const [processedData, setProcessedData] = useState([]);
  
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
  
    const getEpisodes = async (result) => {
      console.log(result);
      try {
        const data = await Episodes(result);
        console.log(data);
      } catch (error) {
        enqueueSnackbar(error + " - Codigo 404 !", {
          variant: "error",
        });
      }
    };
  
    useEffect(() => {
      if (Array.isArray(urlEpisode)) {
        const updatedProcessedData = processArray(urlEpisode);
        console.log(updatedProcessedData);
        setProcessedData(updatedProcessedData);
  
        getEpisodes(updatedProcessedData); // Llamar getEpisodes cuando procesado
      } else {
        console.error("urlEpisode no es un array válido");
      }
    }, [urlEpisode]);
  
    // ... restante de tu código
  }
  