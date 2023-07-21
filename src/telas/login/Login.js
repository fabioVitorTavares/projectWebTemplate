import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoEmbrapa from "../../assets/logo-embrapa.jpg";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import {
  account,
  getTelasPermitidasByUserId,
  logar,
} from "../../services/api/auth";
import { useDispatch } from "react-redux";
import {
  incrementLoad,
  decrementLoad,
  setUser,
  setToken,
  setTelasPermitidas,
} from "../../redux/reducer";
import { BASE_URL } from "../../services/common";
import {
  ButtonEntrar,
  ButtonCadastrar,
  DivCard,
  AvisoTermo,
  DivPagina,
  Formulario,
  ImagemIbi,
  SpanEntrar,
  ImageContainer,
  Texto,
  LinkTermoAviso,
  TextoLogin,
} from "./login-estilo";

const Login = () => {
  function maskCpfCnpj(inputText) {
    if (inputText) {
      const size = inputText.length;
      const array = Array.from(inputText);
      const result = new Array();

      if (size > 11) {
        array.forEach((value, index) => {
          if (index === 2) result.push(".");
          if (index === 5) result.push(".");
          if (index === 8) result.push("/");
          if (index === 12) result.push("-");
          if (index < 14) result.push(value);
        });
        return result.join("");
      }

      array.forEach((value, index) => {
        if (index === 3) result.push(".");
        if (index === 6) result.push(".");
        if (index === 9) result.push("-");
        if (index < 11) result.push(value);
      });
      return result.join("");
    }
    return inputText;
  }
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({
    mensagem: "Erro interno",
    tipo: "error",
  });

  const showError = (e) => {
    switch (e?.response?.status) {
      case 400:
      case 401:
        setError({ mensagem: "Dados Inválidos", tipo: "warning" });
        setOpenError(true);
        break;
      case 403:
        setError({ mensagem: "Sem autorização", tipo: "warning" });
        setOpenError(true);
        break;
      default:
        setError({ mensagem: "Erro Interno", tipo: "error" });
        setOpenError(true);
    }
  };

  const isPerfilCorreto = (perfis) => {
    return !!perfis.find((p) => p === "ROLE_ADMIN");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(incrementLoad());
      // const { data } = await logar({
      //   username: username.replace(/\D/g, ""),
      //   password: password,
      //   rememberMe: true,
      // });

      dispatch(setUser({ nome: "Nome usuário" }));
      dispatch(setToken("addasdasdasdasdasdasd"));
      dispatch(decrementLoad());
      navigate("/inicio");
    } catch (e) {
      showError(e);
      console.log("erro ao logar :>> ", e);
      dispatch(decrementLoad());
    }
  };

  function handleClickEsqueciminhaSenha(event) {
    window.location.assign(`${BASE_URL}/account/reset/request`);
  }

  return (
    <DivPagina>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openError}
        autoHideDuration={5000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity={error.tipo}
          sx={{ width: "100%" }}
        >
          {error.mensagem}
        </Alert>
      </Snackbar>

      <ImageContainer>
        <Texto>Sistema de Apoio</Texto>
        <Texto>na Caracterização de</Texto>
        <Texto>Imóveis Rurais</Texto>
      </ImageContainer>
      <DivCard>
        <AvisoTermo>
          <LinkTermoAviso>Aviso de Privacidade</LinkTermoAviso>
          <LinkTermoAviso>Termo de uso</LinkTermoAviso>
        </AvisoTermo>

        <Formulario>
          <TextoLogin>Login</TextoLogin>

          <TextField
            placeholder="Usuário"
            variant="outlined"
            type="text"
            color="info"
            id="username"
            value={username}
            onChange={(event) =>
              setUsername(maskCpfCnpj(event.target.value.replace(/\D/g, "")))
            }
            InputProps={{
              style: {
                borderRadius: "50px",
                height: 40,
              },
            }}
            style={{ width: "70%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />

          <TextField
            placeholder="Senha"
            variant="outlined"
            color="info"
            type="password"
            InputProps={{
              style: {
                borderRadius: "50px",
                height: 40,
                alignItems: "center",
              },
            }}
            style={{ width: "70%" }}
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />

          <ButtonEntrar onClick={handleSubmit}>
            <SpanEntrar>Entrar</SpanEntrar>
          </ButtonEntrar>
          <ButtonCadastrar onClick={() => navigate("/cadastro")}>
            <SpanEntrar>Cadastrar</SpanEntrar>
          </ButtonCadastrar>
        </Formulario>

        <ImagemIbi src={LogoEmbrapa} alt="Minha Imagem" />
      </DivCard>
    </DivPagina>
  );
};

export default Login;
