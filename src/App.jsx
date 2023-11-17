import { Container } from "@mui/material";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/Home";
import HomeIcon from "@mui/icons-material/Home";
import { Route, Routes } from "react-router-dom";
import CharacterShow from "./pages/CharacterShow";
import { NavbarProvider } from "./context/NavbarContext";
import { CharacterProvider } from "./context/CharacterContext";
import { InfoProvider } from "./context/InfoContext";
import { PagesProvider } from "./context/PagesContext";

const navArrayLinks = [
  {
    id: 1,
    title: "Home",
    path: "/",
    icon: <HomeIcon></HomeIcon>,
    componente: <Home />,
  },
  {
    id: 2,
    path: "/character/:id",
    componente: <CharacterShow />,
  }
];

export default function App() {
  return (
    <>
      <CharacterProvider>
        <InfoProvider>
          <PagesProvider>
            <NavbarProvider>
              <NavBar navArrayLinks={navArrayLinks}> </NavBar>
              <Container id="ContainerMain" maxWidth={false} disableGutters  sx={{ marginTop: "64px" }}>
                <Routes>
                  {navArrayLinks.map((ruta) => (
                    <Route
                      key={ruta.id}
                      path={ruta.path}
                      element={ruta.componente}
                      exact
                    />
                  ))}
                </Routes>
              </Container>
            </NavbarProvider>
          </PagesProvider>
        </InfoProvider>
      </CharacterProvider>
    </>
  );
}
