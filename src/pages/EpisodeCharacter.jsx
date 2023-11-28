import { Fragment, useEffect, useState } from "react";
import Episodes from "../api/Episodes";
import { enqueueSnackbar } from "notistack";
import ListSubheader from "@mui/material/ListSubheader";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EpisodeAvatars from "../components/EpisodeAvatars";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import CharacterMultiple from "../api/CharacterMultiple";
import CircleLoading from "../components/CircleLoading";
import Box from '@mui/material/Box';

export default function EpisodeCharacter({ urlEpisode }) {
  const [listEpisode, setListEpisode] = useState([]);
  const [isOpenArray, setIsOpenArray] = useState([]);
  const [EpisodeforCharacterID] = useState([]);
  const [primerAperturaArray, setPrimerAperturaArray] = useState([]);
  const [arrayDeComponentes, setArrayDeComponentes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const updateOpenSize = (newSize) => {
    setIsOpenArray(new Array(newSize).fill(false));
    setPrimerAperturaArray(new Array(newSize).fill(true));
    setArrayDeComponentes(new Array(newSize).fill(null));
  };

  const toggleCollapse = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = !updatedIsOpenArray[index];

    const updatedPrimerAperturaArray = [...primerAperturaArray];
    if (updatedPrimerAperturaArray[index]) {
      const processData = listEpisode[index]["characters"];
      const result = processArray(processData);
      primerAperturaArray[index] = false;
      getCharactersForEpisode(result, index);
    }
    setIsOpenArray(updatedIsOpenArray);
  };

  const getCharactersForEpisode = async (result, index) => {
    try {
      const response = await CharacterMultiple(result);
      const updatedArrayDeComponentes = [...arrayDeComponentes];
      setTimeout(() => {
      updatedArrayDeComponentes[index] = response; // Almacenar los personajes para este episodio
      setArrayDeComponentes(updatedArrayDeComponentes);
    }, 1500); // Tiempo de espera simulado de 1 segundo
    } catch (error) {
      enqueueSnackbar(error + " - Codigo 404 !", {
        variant: "error",
      });
    }
  };

  const getEpisodes = async (result) => {
    try {
      const response = await Episodes(result);
      const isArray = Array.isArray(response);
      if (isArray) {
        setListEpisode(response);
      } else {
        setListEpisode([response]);
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
      getEpisodes(updatedProcessedData); // Llamar getEpisodes cuando procesado
    } else {
      console.error("urlEpisode no es un array válido");
    }
  }, [EpisodeforCharacterID, urlEpisode]);

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
          <ListItemButton onClick={() => toggleCollapse(index)}>
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary={data.name} secondary={data.air_date} />
            {isOpenArray[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={isOpenArray[index]} timeout="auto" unmountOnExit>
            {Array.isArray(arrayDeComponentes[index]) &&
            arrayDeComponentes[index].length > 0 ? (
              <EpisodeAvatars listCharacters={arrayDeComponentes[index]} />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <CircleLoading ></CircleLoading>
              </Box>
            )}
          </Collapse>
        </Fragment>
      ))}
    </List>
  );
}
