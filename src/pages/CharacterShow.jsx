import { useParams } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import CharacterInfo from "../api/CharacterInfo";
import { useContext, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { NavbarContext } from "../context/NavbarContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AvatarImg from "../components/AvatarImg";

import CircleLoading from "../components/CircleLoading";
import Characteristics from "../components/navbar/Characteristics";

export default function CharacterShow() {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState(null);
  const { updateTitle } = useContext(NavbarContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const titleH1 = {
    fontSize: {
      xs: "3rem",
      sm: "4rem",
    },
    textAlign: "center",
    textTransform: "uppercase",
  };

  const centerToCenter = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const imageFull = {
    width: "100%",
    height: "auto",
  };

  useEffect(() => {
    getDataShow(id);
  }, []);

  const getDataShow = async (id) => {
    try {
      const data = await CharacterInfo(id);
      setData(data);
      document.title = `${data.name}`;
      updateTitle(`${data.name}`);
    } catch (error) {
      setError(error);
      enqueueSnackbar(" Ocurrio un error con la API - Codigo 500!.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToSectionTwo = () => {
    // Encuentra la segunda sección y desplázate a ella
    const sectionTwo = document.getElementById("intro");
    if (sectionTwo) {
      sectionTwo.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {loading ? (
        <CircleLoading></CircleLoading>
      ) : error ? (
        <div>Ocurrió un error al cargar los datos: {error.message}</div>
      ) : !data || !data["location"] || !data["location"].name ? (
        <div>No se encontró el nombre de la ubicación</div>
      ) : (
        <Container maxWidth={false} disableGutters className="background">
          <Container sx={{ ...centerToCenter, position: "relative" }}>
            <Grid container spacing={2} >
              <Grid item xs={12} >
                <Box >
                  <Box sx={{ pb: 2 }}>
                    <AvatarImg data={data}></AvatarImg>
                  </Box>
                  <Box>
                    <Typography className="title-rickmorty" sx={{ ...titleH1 }}>
                      {data.name}
                    </Typography>
                  </Box>
                  <Box sx={{ pt: 2 }}>
                    <Characteristics data={data}></Characteristics>
                  </Box>
                  {/* 
                  <Box>
                    <a onClick={scrollToSectionTwo}>
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: "72px",
                          marginTop: "1rem",
                          cursor: "pointer",
                          position: "relative",
                          color: "#00b1cf",
                        }}
                      />
                    </a>
                  </Box>
                  */}
                </Box>
              </Grid>
              <Grid item xs={12} id="intro"></Grid>
            </Grid>
          </Container>
        </Container>
      )}
    </>
  );
}
