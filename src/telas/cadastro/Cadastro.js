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
  TextoCadastro,
} from "./cadastro-estilo";

const Cadastro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  const [openError, setOpenError] = useState(false);
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
          <TextoCadastro>Cadastro</TextoCadastro>

          <TextField
            placeholder="Usuário"
            variant="outlined"
            type="text"
            color="info"
            id="username"
            value={usuario}
            InputProps={{
              style: {
                borderRadius: "50px",
                height: 40,
              },
            }}
            style={{ width: "70%" }}
            onChange={(event) => setUsuario(event.target.value)}
          />

          <TextField
            placeholder="E-mail"
            variant="outlined"
            type="text"
            color="info"
            id="username"
            value={email}
            InputProps={{
              style: {
                borderRadius: "50px",
                height: 40,
              },
            }}
            style={{ width: "70%" }}
            onChange={(event) => setEmail(event.target.value)}
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
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          <TextField
            placeholder="Confirmação de senha"
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
            value={confirmacaoSenha}
            onChange={(event) => setConfirmacaoSenha(event.target.value)}
          />

          <ButtonCadastrar>
            <SpanEntrar>Cadastrar</SpanEntrar>
          </ButtonCadastrar>
        </Formulario>

        <ImagemIbi src={LogoEmbrapa} alt="Minha Imagem" />
      </DivCard>
    </DivPagina>
  );
};

export default Cadastro;
