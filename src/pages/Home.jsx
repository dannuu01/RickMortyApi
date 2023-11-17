import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import fetchDataInfo from "../api/Information";
import { useSnackbar } from "notistack";
import Characters from "../components/Characters";
import PaginationItems from "../components/PaginationItems";
import InputSearch from "../components/InputSearch";
import fetchSearchData from "../api/SearchCharacter";
import { CharacterContext } from "../context/CharacterContext";
import { InfoContext } from "../context/InfoContext";
import { PagesContext } from "../context/PagesContext";

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const { myCharacters, updateCharacters } = useContext(CharacterContext);
  const { myInfo, updateInfo } = useContext(InfoContext);
  const { myPage } = useContext(PagesContext);
  // const [page, setPage] = useState(1);
  const [valueInput, setValueInput] = useState("");

  const getCharacters = async (pageNumber) => {
    try {
      const data = await fetchDataInfo(pageNumber);
      updateCharacters(data.results);
      updateInfo(data.info);

      enqueueSnackbar("Petición Aceptada - Codigo 200!.", {
        variant: "success",
      });
    } catch (error) {
      updateCharacters([]);
      enqueueSnackbar(error + " - Codigo 404 !", {
        variant: "error",
      });
    }
  };

  const getCharacterQuery = async () => {
    try {
      const data = await fetchSearchData(valueInput, myPage);
      updateCharacters(data.results);
      updateInfo(data.info);

      enqueueSnackbar("Petición Aceptada - Codigo 200!.", {
        variant: "success",
      });
    } catch (error) {
      updateCharacters([]);
      enqueueSnackbar(error + " - Codigo 404 !", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const getData = async (paramPage) => {
      const pageNumber = paramPage || myPage;
      if (valueInput.trim() !== "") {
        getCharacterQuery();
      } else {
        getCharacters(pageNumber);
      }
    };

    getData(myPage);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [myPage, valueInput]);

  return (
    <>
      <Container>
        <Box sx={{ pt: 4, pb: 2 }}>
          <Typography variant="h3" component="h1" className="title-rickmorty">
            Rick and Morty
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Box sx={{ pt: 2, pb: 4 }}>
                <Typography variant="body1">
                  Todos los personajes de la serie de Rick and Morty.
                </Typography>
                <Box sx={{ display: myInfo ? "flex" : "block" }}>
                  <Typography variant="body1" sx={{ pr: 1 }}>
                    Numero de personajes :{" "}
                  </Typography>
                  {myInfo ? (
                    // Renderizar contenido relacionado con data
                    <div>
                      {/* Ejemplo: Muestra el valor count si existe en data */}
                      {Object.keys(myCharacters).length && (
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "#00b1cf",
                            display: Object.keys(myCharacters).length
                              ? "block"
                              : "none",
                          }}
                        >
                          {myInfo.count}
                        </Typography>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <InputSearch
                setValueInput={setValueInput}
                valueInput={valueInput}
              ></InputSearch>
            </Grid>
          </Grid>
          <Characters></Characters>
          <Box sx={{ pt: 4, pb: 4 }}>
            <PaginationItems></PaginationItems>
          </Box>
        </Box>
      </Container>
    </>
  );
}
