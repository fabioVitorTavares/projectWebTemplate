import styled, { keyframes } from "styled-components";
import ImagemBackground from "../../assets/imagem_fundo.jpg";

export const DivEsqueciMinhaSenha = styled.div`
  cursor: pointer;
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;
export const SpanEntrar = styled.div`
  color: white;
`;

const fadeIn = keyframes`
  0% {
    outline-offset: 2px;
    outline: 4px solid #4682B4;
    background-color: #36658b;
  }
  100% {
    outline-offset: 0px;
    outline: 0px;
    background-color: #4682B4;
  }
`;

const fadeOut = keyframes`
  100% {
    outline-offset: 3px;
    background-color: #36658b;
  }
`;

export const ButtonEntrar = styled.button`
  background-color: #59781c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: none;
  width: 70%;
  height: 40px;
  cursor: pointer;
  font-size: 24px;
`;

export const ButtonCadastrar = styled.button`
  background-color: #02b6da;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 70%;
  height: 40px;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

export const Formulario = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const ImagemIbi = styled.img`
  width: 250px;
`;

export const DivCard = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: white;
`;

export const DivPagina = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ImageContainer = styled.div`
  width: 60%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${ImagemBackground});
  background-size: cover;
`;

export const Texto = styled.h1`
  color: #ffffff;
  font-size: 70px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
  margin: 0;
`;

export const AvisoTermo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LinkTermoAviso = styled.h3`
  color: #0d4b7b;
  margin-inline: 40px;
  cursor: pointer;
`;
export const TextoCadastro = styled.h3`
  width: 70%;
  color: #696969;
  font-size: 30px;
  margin: 0;
`;
