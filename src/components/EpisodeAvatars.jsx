import { Fragment, useEffect, useMemo, useState } from "react";
import StarBorder from "@mui/icons-material/StarBorder";
import { Avatar, AvatarGroup } from "@mui/material";
import CharacterMultiple from "../api/CharacterMultiple";
import { enqueueSnackbar } from "notistack";

export default function EpisodeAvatars({ avatars }) {
  const [processedData, setProcessedData] = useState([avatars[0]]);

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

  const getCharactersForEpisode = async (array) => {
    try {
      const response = await CharacterMultiple(array);
      setProcessedData(response);
    } catch (error) {
      enqueueSnackbar(error + " - Codigo 404 !", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(avatars)) {
        const updatedProcessedData = processArray(avatars);
        setProcessedData(updatedProcessedData);
        getCharactersForEpisode(updatedProcessedData); // Llamar getEpisodes cuando procesado
    } else {
      console.error("avatars no es un array válido o está vacío");
    }
  }, [avatars]);

  return (
    <>
      <AvatarGroup total={processedData.length}>
        {processedData.map((data, index) => (
          <Avatar key={index} alt={data.name} src={data.image} />
        ))}
      </AvatarGroup>
    </>
  );
}
