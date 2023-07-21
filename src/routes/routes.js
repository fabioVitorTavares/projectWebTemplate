import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaNaoEncontrada from "../PaginaNaoEncontrada";
import Login from "../telas/login/Login";
import Inicio from "../telas/inicio/Inicio";
import DownloadArquivo from "../telas/downloadArquivo/DownloadArquivo";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Sidebar } from "../componentes/SideBar";
import Sobre from "../telas/sobre/Sobre";
import Contato from "../telas/contato/Contato";
import { AvisoPrivacidade } from "../telas/avisoDePrivacidade/AvisoPrivacidade";
import { TermoUso } from "../telas/termoUso/AvisoPrivacidade";
import Cadastro from "../telas/cadastro/Cadastro";
import Pdf from "../telas/pdf/Pdf";
import Referencias from "../telas/referencias/referencias";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#024634",
      darker: "#024634",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const RotasPrivadas = () => (
  <>
    <Routes>
      <Route
        path="/inicio"
        Component={() => <PrivateRoute component={Inicio} />}
      />
      <Route
        path="/sobre"
        Component={() => <PrivateRoute component={Sobre} />}
      />
      <Route
        path="/contato"
        Component={() => <PrivateRoute component={Contato} />}
      />
      <Route
        path="/avisoPrivacidade"
        Component={() => <PrivateRoute component={AvisoPrivacidade} />}
      />
      <Route
        path="/termoUso"
        Component={() => <PrivateRoute component={TermoUso} />}
      />
      <Route
        path="/referencias"
        Component={() => <PrivateRoute component={Referencias} />}
      />
      <Route
        path="/pdf/:id?"
        Component={() => <PrivateRoute component={Pdf} />}
      />
    </Routes>
  </>
);

const RotasPublicas = () => (
  <>
    <Routes>
      <Route
        path="/not-found"
        Component={() => <PublicRoute component={PaginaNaoEncontrada} />}
      />
      <Route path="/" Component={() => <PublicRoute component={Login} />} />
      <Route
        path="/login"
        Component={() => <PublicRoute component={Login} />}
      />
      <Route
        path="/cadastro"
        Component={() => <PublicRoute component={Cadastro} />}
      />
      <Route
        path="/download/:id/:tipo"
        Component={() => <PublicRoute component={DownloadArquivo} />}
      />
      <Route
        path="*"
        Component={() => <PublicRoute component={PaginaNaoEncontrada} />}
      />
    </Routes>
  </>
);

export const RoutesApp = ({ location }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Sidebar />
        <RotasPrivadas />
        <RotasPublicas />
      </BrowserRouter>
    </ThemeProvider>
  );
};
