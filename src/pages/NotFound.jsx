import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const backgroundError = {
  position: "relative",
  height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: "url(../background4.webp)",
  backgroundSize: "cover",
};

const backgroundErrorBefore = {
  content: '""',
  position: "absolute",
  inset: "0px",
  backgroundColor: "#000000c9",
};

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

export default function NotFound() {
  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ ...backgroundError }}>
        <Box sx={{ ...backgroundErrorBefore }}>
          <Container sx={{ ...centerToCenter, position: "relative" }}>
            <Typography
              variant="h3"
              component="h1"
              className="title-rickmorty"
              sx={{ ...titleH1 }}
            >
              ERR0R 404 !
            </Typography>
            <Box sx={{ pt: 4 }}>
              <Button component="a" href="/" variant="contained" size="large">
                Back to Home
              </Button>
            </Box>
          </Container>
        </Box>
      </Container>
    </>
  );
}
