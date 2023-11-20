import { useEffect, useState } from "react";
import Episodes from "../api/Episodes";
import { enqueueSnackbar } from "notistack";


export default function EpisodeCharacter({episode})  {
    const [listIDEpisode, setlistIDEpisode] = useState([]);

    useEffect(() => {

        episode.forEach(element => {
            const url = element;
            const segments = url.split('/').filter(segment => segment !== ''); // Elimina segmentos vacíos
        
            if (segments.length > 0) {
              const lastSegment = segments[segments.length - 1];
              setlistIDEpisode(prevList => [...prevList, lastSegment]); 
            }

        });

        const uniqueNumbers = [... new Set(listIDEpisode)];
        getEpisodes(uniqueNumbers);
     
      
    }, []);

    const getEpisodes  = async(uniqueNumbers) => {
        try {
            const data = await Episodes(uniqueNumbers);
            console.log(data);
        } catch (error) {
            enqueueSnackbar(error + " - Codigo 404 !", {
              variant: "error",
            });
        }
    }
    

    return(
        <>
        
        </>
    )
}