import {
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import SwitchStatusLive from "./SwitchStatusLive";
import { CharacterContext } from "../context/CharacterContext";
import { Link } from 'react-router-dom';

const boxMinStyles = {
  minHeight: {
    md: "200px",
    xs: "175px",
  },
};

const CardStyles = {
  minHeight: {
    md: "250px",
    sm: "150px",
  },
  display: {
    md: "flex",
    sm: "block",
  },
};
const imgCardStyles = {
  maxWidth: {
    md: "45%",
    xs: "100%",
  },
  minHeight: {
    md: "240px",
    xs: "100px",
  },
};
export default function Characters() {
  const { myCharacters } = useContext(CharacterContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refreshHard();
  }, []);

  const CustomLinkButton = ({ to, children}) => {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <Button variant="outlined" size="small">
          {children}
        </Button>
      </Link>
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        {myCharacters.map((data) => (
          <Grid item xs={12} sm={4} md={6} key={data.id}>
            <Card data-aos="zoom-in">
              <Box sx={{ ...CardStyles }}>
                <CardMedia
                  component="img"
                  image={data.image}
                  sx={{ ...imgCardStyles }}
                  alt="desc"
                />
                <CardContent>
                  <Box sx={{ ...boxMinStyles }}>
                    <Typography variant="h5">{data.name}</Typography>
                    <SwitchStatusLive status={data.status}></SwitchStatusLive>
                    <Typography
                      sx={{
                        pt: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2, // Número de líneas que deseas mostrar
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laudantium quos quam doloribus, impedit incidunt molestiae
                      sapiente laboriosam error! Dolores cumque fuga in
                      perspiciatis maiores! Praesentium soluta commodi dicta
                      perspiciatis nulla.
                    </Typography>
                  </Box>
                  <CardActions
                    sx={{ height: "50px", padding: "0px", margin: "0px" }}
                  >
                  <CustomLinkButton to={`/character/${data.id}`}>
                    Learn More
                  </CustomLinkButton>
                  </CardActions>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
